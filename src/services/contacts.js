import Contact from '../db/models/contacts.js';

export const getContacts = async () => {
  return await Contact.find();
};

export const getContactsById = async (id) => {
  return await Contact.findById(id);
};

export const createContact = async (contact) => {
  return await Contact.create(contact);
};

export const updateContact = async (id, contact) => {
  return await Contact.findByIdAndUpdate(id, contact, {
    new: true,
    runValidators: true,
  });
};

export const deleteContact = async (id) => {
  return await Contact.findByIdAndDelete(id);
};

export const replaceContact = async (id, contact) => {
  const result = await Contact.findByIdAndUpdate(id, contact, {
    new: true,
    upsert: true,
    includeResultMetadata: true,
  });

  return {
    value: result.value,
    updatedExisting: result.lastErrorObject.updatedExisting,
  };
};
