import Contact from '../db/models/contacts.js';

export const getContacts = async () => {
  return await Contact.find();
};

export const getContactsById = async (id) => {
  return await Contact.findById(id);
};
