import crypto from 'node:crypto';

import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';

import { Users } from '../models/user.js';
import { Sessions } from '../models/session.js';

import { FIFTEEN_MINUTES, THIRTY_DAYS } from '../constans/index.js';

export const registerUser = async (payload) => {
  const user = await Users.findOne({ email: payload.email });

  if (user) {
    throw createHttpError(409, 'Email in use');
  }

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  return Users.create({
    ...payload,
    password: encryptedPassword,
  });
};

const createSession = () => {
  return {
    accessToken: crypto.randomBytes(30).toString('base64'),
    refreshToken: crypto.randomBytes(30).toString('base64'),
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  };
};

export const loginUser = async (payload) => {
  const user = await Users.findOne({ email: payload.email });

  if (!user) {
    throw createHttpError(401, 'Email or password is incorrect');
  }

  const isMatch = await bcrypt.compare(payload.password, user.password);
  if (!isMatch) {
    throw createHttpError(401, 'Email or password is incorrect');
  }

  await Sessions.deleteOne({ userId: user._id });

  // const accessToken = crypto.randomBytes(30).toString('base64');
  // const refreshToken = crypto.randomBytes(30).toString('base64');

  const newSession = createSession();

  return await Sessions.create({
    userId: user._id,
    ...newSession,
  });

  // return await Sessions.create({
  //   userId: user._id,
  //   accessToken,
  //   refreshToken,
  //   accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
  //   refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  // });
};

export const refreshUserSession = async ({ sessionId, refreshToken }) => {
  const session = await Sessions.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  if (new Date() > session.refreshTokenValidUntil) {
    throw createHttpError(401, 'Session token expired');
  }

  await Sessions.deleteOne({ _id: sessionId, refreshToken });

  const newSession = createSession();

  return await Sessions.create({
    userId: session.userId,
    ...newSession,
  });
};

export const logoutUser = async (sessionId) => {
  await Sessions.deleteOne({ _id: sessionId });
};
