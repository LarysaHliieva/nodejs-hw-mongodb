import { Contacts } from '../models/contact.js';

export const getAllContacts = async ({ page, perPage }) => {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const contactsQuery = Contacts.find();
  const contactsCount = await Contacts.find()
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery.skip(skip).limit(perPage).exec();

  const totalPages = Math.ceil(contactsCount / perPage);

  return {
    data: contacts,
    page,
    perPage,
    totalItems: contactsCount,
    totalPages,
    hasPreviousPage: totalPages > page,
    hasNextPage: page !== 1,
  };
};

export const getContactById = async (id) => {
  const contact = await Contacts.findById(id);
  return contact;
};

export const createContact = async (payload) => {
  const contact = await Contacts.create(payload);
  return contact;
};

export const updateContact = async (id, payload) => {
  const contact = await Contacts.findByIdAndUpdate(id, payload, { new: true });
  return contact;
};

export const deleteContact = async (id) => {
  const contact = await Contacts.findByIdAndDelete(id);
  return contact;
};
