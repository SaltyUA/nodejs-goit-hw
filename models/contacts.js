const { Contact } = require("../schemas/contacts");

const getAll = async () => {
  const data = await Contact.find();
  return data;
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
