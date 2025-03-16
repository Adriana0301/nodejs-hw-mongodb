import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createContactController,
  deleteContactController,
  getContactByIdController,
  getContactsController,
  replaceStudentController,
  updateContactController,
} from '../controllers/contacts.js';
import { isValidID } from '../middlewares/isValidID.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contact.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/contacts', ctrlWrapper(getContactsController));

router.get('/contacts/:id', isValidID, ctrlWrapper(getContactByIdController));

router.post(
  '/contacts',
  jsonParser,
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.patch(
  '/contacts/:id',
  isValidID,
  jsonParser,
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactController),
);

router.delete('/contacts/:id', isValidID, ctrlWrapper(deleteContactController));

router.put(
  '/contacts/:id',
  isValidID,
  jsonParser,
  validateBody(createContactSchema),
  ctrlWrapper(replaceStudentController),
);

export default router;
