const Jimp = require('jimp');
const { User } = require('../schemas/user');
const HttpError = require('./HttpError');
const path = require('path');
const fs = require('fs/promises');

const avatarsDir = path.join(__dirname, '../', 'public', 'avatars');

const createUser = async payload => {
  const newUser = new User(payload);
  User.create(newUser);
  return newUser;
};

const findByEmail = async email => {
  const user = await User.findOne({ email });
  return user;
};

const addToken = async (id, token) => {
  await User.findByIdAndUpdate(id, { token });
};

const findById = async userId => {
  const user = await User.findById(userId);
  return user;
};

const deleteToken = async userId => {
  await User.findByIdAndUpdate(userId, { token: null });
};

const patchSubscription = async payload => {
  const { _id, subscription } = payload;
  const user = await User.findById(_id);
  if (user.subscription === subscription) {
    throw new HttpError(409, 'This subscription allready set');
  }
  const result = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { returnOriginal: false }
  );
  return result.subscription;
};

const patchAvatar = async payload => {
  const { _id, tempUpload, originalname } = payload;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  Jimp.read(tempUpload, (err, image) => {
    if (err) throw HttpError(404, err);
    image.resize(250, 250).write(resultUpload);
  });
  await fs.unlink(tempUpload);
  const avatarURL = path.join('avatars', filename);
  await User.findByIdAndUpdate(_id, { avatarURL });
  return avatarURL;
};

module.exports = {
  createUser,
  findByEmail,
  addToken,
  findById,
  deleteToken,
  patchSubscription,
  patchAvatar,
};
