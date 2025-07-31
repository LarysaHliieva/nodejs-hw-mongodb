import createHttpError from 'http-errors';

import { Sessions } from '../models/session.js';
import { Users } from '../models/user.js';

export const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw createHttpError(401, 'Please provide Authorization header');
  }

  const [bearer, accessToken] = authorization.split(' ', 2);

  if (bearer !== 'Bearer' || !accessToken) {
    throw createHttpError(401, 'Auth header should be of type Bearer');
  }

  const session = await Sessions.findOne({ accessToken });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  if (new Date() > session.accessTokenValidUntil) {
    throw createHttpError(401, 'Access token expired');
  }

  const user = await Users.findById(session.userId);

  if (!user) {
    throw createHttpError(401, 'User not found');
  }

  req.user = user;

  next();
};
