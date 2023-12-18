const { User } = require("../schemas/user");
const HttpError = require("./HttpError");

const createUser = async (payload) => {
  const newUser = new User(payload);
  User.create(newUser);
  return newUser;
};

const findByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

const addToken = async (id, token) => {
  await User.findByIdAndUpdate(id, { token });
};

const findById = async (userId) => {
  const user = await User.findById(userId);
  return user;
};

const deleteToken = async (userId) => {
  await User.findByIdAndUpdate(userId, { token: null });
};

const patchSubscription = async (payload) => {
  const { _id, subscription } = payload;
  const user = await User.findById(_id);
  if (user.subscription === subscription) {
    throw new HttpError(409, "This subscription allready set");
  }
  const result = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { returnOriginal: false }
  );
  return result.subscription;
};

module.exports = {
  createUser,
  findByEmail,
  addToken,
  findById,
  deleteToken,
  patchSubscription,
};
