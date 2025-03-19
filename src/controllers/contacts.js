import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getContacts,
  getContactsById,
  replaceContact,
  updateContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilerParams } from '../utils/parseFilterParams.js';

export async function getContactsController(req, res) {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilerParams(req.query);

  const data = await getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: data,
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

export async function updateContactController(req, res, next) {
  try {
    const { id } = req.params;
    const updatedContact = await updateContact(id, req.body);

    if (!updatedContact) {
      return next(createHttpError(404, 'Contact not found'));
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: updatedContact,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteContactController(req, res) {
  const { id } = req.params;
  const result = await deleteContact(id);
  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
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
