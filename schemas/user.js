const Joi = require("joi");
const { Schema, model } = require("mongoose");
const handleMongooseError = require("../helpers/handleMongooseError");

const UserSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    avatarURL: {
      type: String,
      required: [true, "missing avatar"],
    },
    token: String,
  },
  { versionKey: false }
);

UserSchema.post("save", handleMongooseError);

// Для видалення поля з паролем при відправці відповіді(Забезпечує безпеку)
// UserSchema.methods.toJSON = function () {
//   const obj = this.toObject();
//     delete obj.password;
//   return obj;
// };

const userSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

const patchSubscription = Joi.object({
  subscription: Joi.string().required().valid("starter", "pro", "busines"),
});

const User = model("users", UserSchema);
const schemas = { userSchema, patchSubscription };

module.exports = {
  schemas,
  User,
};
