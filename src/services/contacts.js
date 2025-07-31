import { Contacts } from '../models/contact.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
  userId,
}) => {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const contactsQuery = Contacts.find({ userId });

  if (filter.type) {
    contactsQuery.where('contactType').equals(filter.type);
  }

  if (filter.isFavourite !== undefined) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const [contactsCount, contacts] = await Promise.all([
    Contacts.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(perPage)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  // const contactsCount = await Contacts.find()
  //   .merge(contactsQuery)
  //   .countDocuments();

  // const contacts = await contactsQuery
  //   .skip(skip)
  //   .limit(perPage)
  //   .sort({ [sortBy]: sortOrder })
  //   .exec();

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

export const getContactById = async (id, userId) => {
  const contact = await Contacts.findOne({ _id: id, userId });
  return contact;
};

export const createContact = async (payload) => {
  const contact = await Contacts.create(payload);
  return contact;
};

export const updateContact = async (id, payload, userId) => {
  const contact = await Contacts.findOneAndUpdate(
    { _id: id, userId },
    payload,
    { new: true },
  );
  return contact;
};

export const deleteContact = async (id, userId) => {
  const contact = await Contacts.findOneAndDelete({ _id: id, userId });
  return contact;
};
