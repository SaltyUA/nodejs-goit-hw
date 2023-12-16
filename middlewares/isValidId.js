const { isValidObjectId } = require("mongoose");
const HttpError = require("../models/HttpError");

const isValidId = (req, _, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(new HttpError(400, `${contactId} is not valid id`));
  }
  next();
};

module.exports = isValidId;
