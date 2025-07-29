import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrappel.js';

import { registerController, loginController } from '../controllers/auth.js';

import { validateBody } from '../middlewares/validateBody.js';

import { registerUserSchema, loginUserSchema } from '../validation/auth.js';

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

export default router;
