import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUserSession,
} from '../services/auth.js';

export const registerController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    maeesage: 'Successfully registered a user!',
    data: user,
  });
};

const setupCookieSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
};

export const loginController = async (req, res) => {
  const session = await loginUser(req.body);

  setupCookieSession(res, session);

  res.status(200).json({
    status: 200,
    maeesage: 'Successfully logged in an user!',
    data: { accessToken: session.accessToken },
  });
};

export const refreshController = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;

  const session = await refreshUserSession({ sessionId, refreshToken });

  setupCookieSession(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: { accessToken: session.accessToken },
  });
};

export const logoutController = async (req, res) => {
  const { sessionId } = req.cookies;

  if (sessionId) {
    await logoutUser(sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};
