import { Contacts } from '../models/contact.js';

export const getAllContacts = async () => {
  const contacts = await Contacts.find();
  return contacts;
};

export const getContactById = async (id) => {
  const contact = await Contacts.findById(id);
  return contact;
};
