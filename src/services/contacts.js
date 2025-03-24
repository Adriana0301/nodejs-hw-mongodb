import Contact from '../db/models/contacts.js';

export const getContacts = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter = {},
  userId,
}) => {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const contactQuery = Contact.find({ userId });

  if (filter.isFavourite) {
    contactQuery.where('isFavourite').equals(filter.isFavourite);
  }

  if (filter.contactType) {
    contactQuery.where('contactType').equals(filter.contactType);
  }

  const [totalItems, data] = await Promise.all([
    Contact.countDocuments({ userId, ...filter }),
    contactQuery
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage),
  ]);

  const totalPages = Math.ceil(totalItems / perPage);

  return {
    data,
    totalItems,
    page,
    perPage,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: totalPages > page,
  };
};

export const getContactsById = async (id, userId) => {
  return await Contact.findOne({ _id: id, userId });
};

export const createContact = async (contact, userId) => {
  return await Contact.create({ ...contact, userId });
};

export const updateContact = async (id, contact, userId) => {
  return await Contact.findOneAndUpdate({ _id: id, userId }, contact, {
    new: true,
    runValidators: true,
  });
};

export const deleteContact = async (id, userId) => {
  return await Contact.findOneAndDelete({ _id: id, userId });
};

export const replaceContact = async (id, contact, userId) => {
  return await Contact.findOneAndUpdate({ _id: id, userId }, contact, {
    new: true,
    upsert: true,
  });
};
