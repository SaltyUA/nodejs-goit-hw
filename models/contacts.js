const { Contact } = require("../schemas/contacts");

const getAll = async (config) => {
  const { limit, page, favorite } = config;
  const skip = (page - 1) * limit;
  const contactsQuery = Contact.find().limit(limit).skip(skip);
  const countQuery = Contact.countDocuments();
  if (favorite) {
    contactsQuery.where("favorite").equals(favorite);
    countQuery.where("favorite").equals(favorite);
  }
  const contactList = await contactsQuery.exec();
  const count = await countQuery.exec();
  return { contactList, count };
};

const getContactById = async (contactId) => {
  const contact = Contact.findById(contactId);
  return contact || null;
};

const addContact = async (body) => {
  const contact = new Contact(body);
  Contact.create(contact);
  return contact;
};

const removeContact = async (contactId) => {
  const contact = await getContactById(contactId);
  await Contact.findByIdAndDelete(contactId);
  return contact;
};

const updateContact = async (contactId, body) => {
  const contact = getContactById(contactId);
  if (!contact) return;
  const updatedContact = Contact.findByIdAndUpdate(contactId, body, {
    returnOriginal: false,
  });
  return updatedContact;
};

const updateStatusContact = async (contactId, body) => {
  const contact = getContactById(contactId);
  if (!contact) return;
  const updatedContact = Contact.findByIdAndUpdate(contactId, body, {
    returnOriginal: false,
  });
  return updatedContact;
};

module.exports = {
  getAll,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
