const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users = require('./users');
const gravatar = require('gravatar');
const HttpError = require('./HttpError');
const { JWT_SECRET } = require('../helpers/env');
const { User } = require('../schemas/user');
const { nanoid } = require('nanoid');
const { sendVerificationEmail } = require('../helpers');

const login = async payload => {
  const { email, password } = payload;
  const user = await users.findByEmail(email);
  if (!user) {
    throw new HttpError(401, 'Email or password is wrong');
  }
  if (!user.verify) {
    throw HttpError(401, 'Please verify your email');
  }
  const arePasswordsEqual = await bcrypt.compare(password, user.password);
  if (!arePasswordsEqual) {
    throw new HttpError(401, 'Email or password is wrong');
  }
  const token = jwt.sign(
    {
      sub: user._id,
    },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
  await users.addToken(user.id, token);
  return { token, user };
};

const register = async payload => {
  const { email, password } = payload;
  const user = await users.findByEmail(email);
  if (user) {
    throw new HttpError(409, 'Email in use');
  }
  const paswordHash = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const newUser = await users.createUser({
    email,
    password: paswordHash,
    avatarURL,
    verificationToken,
  });
  await sendVerificationEmail({ email, verificationToken });
  return newUser;
};

const verifyEmail = async verificationToken => {
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw new HttpError(404, 'User not found');
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: '',
  });
};

const resendVerifyEmail = async email => {
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(400, 'Email not found');
  }
  if (user.verify) {
    throw HttpError(400, 'Verification has already been passed');
  }
  await sendVerificationEmail({
    email,
    verificationToken: user.verificationToken,
  });
};

module.exports = {
  register,
  login,
  verifyEmail,
  resendVerifyEmail,
};
