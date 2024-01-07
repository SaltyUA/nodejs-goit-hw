const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users = require('./users');
const gravatar = require('gravatar');
const HttpError = require('./HttpError');
const { JWT_SECRET } = require('../helpers/env');

const login = async payload => {
  const { email, password } = payload;
  const user = await users.findByEmail(email);
  if (!user) {
    throw new HttpError(401, 'Email or password is wrong');
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
  const newUser = await users.createUser({
    email,
    password: paswordHash,
    avatarURL,
  });
  return newUser;
};

module.exports = {
  register,
  login,
};
