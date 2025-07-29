import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrappel.js';

import { registerController } from '../controllers/auth.js';

import { validateBody } from '../middlewares/validateBody.js';

import { registerUserSchema } from '../validation/auth.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerController),
);

export default router;
