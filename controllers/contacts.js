const contacts = require("../models/contacts");
const { ctrlWrapper } = require("../helpers");
const HttpError = require("../models/HttpError");

const getAll = async (_, res) => {
  const result = await contacts.getAll();
  res.status(200).json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw new HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const postContact = async (req, res) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw new HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

const putContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw new HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const patchContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.updateStatusContact(contactId, req.body);
  if (!result) {
    throw new HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  postContact: ctrlWrapper(postContact),
  deleteContact: ctrlWrapper(deleteContact),
  putContact: ctrlWrapper(putContact),
  patchContact: ctrlWrapper(patchContact),
};
