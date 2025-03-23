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
import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();
const jsonParser = express.json();

router.use(authenticate);

router.get('/', ctrlWrapper(getContactsController));

router.get('/:id', isValidID, ctrlWrapper(getContactByIdController));

router.post(
  '/',
  jsonParser,
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.patch(
  '/:id',
  isValidID,
  jsonParser,
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactController),
);

router.delete('/:id', isValidID, ctrlWrapper(deleteContactController));

router.put(
  '/:id',
  isValidID,
  jsonParser,
  validateBody(createContactSchema),
  ctrlWrapper(replaceStudentController),
);

export default router;
