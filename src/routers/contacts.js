import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrappel.js';

import {
  getContactsController,
  getContactByIdController,
  createContactsController,
  updateContactsController,
  deleteContactsController,
} from '../controllers/contacts.js';

import { authenticate } from '../middlewares/authenticate.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { upload } from '../middlewares/upload.js';

import {
  createContactsSchema,
  updateContactsSchema,
} from '../validation/contact.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));

router.post(
  '/',
  upload.single('photo'),
  validateBody(createContactsSchema),
  ctrlWrapper(createContactsController),
);

router.patch(
  '/:contactId',
  upload.single('photo'),
  isValidId,
  validateBody(updateContactsSchema),
  ctrlWrapper(updateContactsController),
);

router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactsController));

export default router;
