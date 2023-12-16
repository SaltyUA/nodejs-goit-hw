const Joi = require("joi");
const { Schema, model } = require("mongoose");
const handleMongooseError = require("../helpers/handleMongooseError");

const ContactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

ContactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const putSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
}).or("name", "email", "phone");

const patchSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model("Contact", ContactSchema);

const schemas = {
  addSchema,
  putSchema,
  patchSchema,
};

module.exports = {
  schemas,
  Contact,
};
