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

const router = express.Router();
const jsonParser = express.json();

router.get('/contacts', ctrlWrapper(getContactsController));

router.get('/contacts/:id', ctrlWrapper(getContactByIdController));

router.post('/contacts', jsonParser, ctrlWrapper(createContactController));

router.patch('/contacts/:id', jsonParser, ctrlWrapper(updateContactController));

router.delete('/contacts/:id', ctrlWrapper(deleteContactController));

router.put('/contacts/:id', jsonParser, ctrlWrapper(replaceStudentController));

export default router;
