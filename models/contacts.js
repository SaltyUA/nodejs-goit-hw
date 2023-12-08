const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find(({ id }) => id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const removeIndex = contacts.findIndex((item) => item.id === contactId);
  if (removeIndex === -1) {
    return null;
  }
  const [removeContact] = contacts.splice(removeIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return [removeContact];
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };
  contacts.push(newContact);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const updateIndex = contacts.findIndex((item) => item.id === contactId);
  if (updateIndex === -1) return null;
  contacts[updateIndex] = { contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[updateIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
