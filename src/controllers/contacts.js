import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getContacts,
  getContactsById,
  replaceContact,
  updateContact,
} from '../services/contacts.js';

export async function getContactsController(req, res) {
  const contacts = await getContacts();
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
}

export async function getContactByIdController(req, res) {
  const { id } = req.params;
  const contactById = await getContactsById(id);

  if (!contactById) {
    throw createHttpError(404, 'Contact not found');
  }
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contactById,
  });
}

export async function createContactController(req, res) {
  const contact = req.body;
  const result = await createContact(contact);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: result,
  });
}

export async function updateContactController(req, res) {
  const { id } = req.params;
  const contact = req.body;
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  const result = await updateContact(id, contact);
  res.status(201).json({
    status: 201,
    message: 'Successfully patched a contact!',
    data: result,
  });
}

export async function deleteContactController(req, res) {
  const { id } = req.params;
  const result = await deleteContact(id);
  if (result === null) {
    throw new createHttpError.NotFound('Student not found');
  }

  res.json({
    status: 200,
    message: 'Student deleted successfully',
    data: result,
  });
}

export async function replaceStudentController(req, res) {
  const { id } = req.params;
  const contact = req.body;
  const result = await replaceContact(id, contact);
  if (result.updatedExisting === true) {
    return res.json({
      status: 200,
      message: 'Contact updated successfully',
      data: result.value,
    });
  }

  res.status(201).json({
    status: 201,
    message: 'Contact created successfully',
    data: result.value,
  });
}
