import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrappel.js';

import {
  getContactsController,
  getContactByIdController,
} from '../controllers/contacts.js';

const router = Router();

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', ctrlWrapper(getContactByIdController));

export default router;
