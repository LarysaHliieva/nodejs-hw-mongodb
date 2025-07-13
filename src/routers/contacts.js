import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrappel.js';

import {
  getContactsController,
  getContactByIdController,
  createContactsController,
  deleteContactsController,
} from '../controllers/contacts.js';

const router = Router();

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', ctrlWrapper(getContactByIdController));

router.post('/', ctrlWrapper(createContactsController));

router.delete('/:contactId', ctrlWrapper(deleteContactsController));

export default router;
