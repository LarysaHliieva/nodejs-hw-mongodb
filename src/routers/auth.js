import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrappel.js';

import {
  registerController,
  loginController,
  logoutController,
  refreshController,
  sendResetEmailController,
} from '../controllers/auth.js';

import { validateBody } from '../middlewares/validateBody.js';

import {
  registerUserSchema,
  loginUserSchema,
  sendResetEmailShema,
} from '../validation/auth.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerController),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginController),
);

router.post('/refresh', ctrlWrapper(refreshController));

router.post('/logout', ctrlWrapper(logoutController));

router.post(
  '/send-reset-email',
  validateBody(sendResetEmailShema),
  ctrlWrapper(sendResetEmailController),
);

export default router;
