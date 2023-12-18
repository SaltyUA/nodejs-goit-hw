const { ctrlWrapper } = require("../helpers");
const auth = require("../models/auth");
const users = require("../models/users");

const login = async (req, res) => {
  const user = await auth.login(req.body);
  res.status(200).json(user);
};

const register = async (req, res) => {
  const result = await auth.register(req.body);
  const user = { email: result.email, subscription: result.subscription };
  res.status(201).json({ user });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await users.deleteToken(_id);
  res.status(204).json({ status: 204 });
};

const currentUser = async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({ email, subscription });
};

const patchSubscription = async (req, res) => {
  const { subscription } = req.body;
  const { _id } = req.user;
  const result = await users.patchSubscription({ _id, subscription });
  res
    .status(200)
    .json({ message: "Subscription succesfully updated", data: result });
};

module.exports = {
  login: ctrlWrapper(login),
  register: ctrlWrapper(register),
  logout: ctrlWrapper(logout),
  currentUser: ctrlWrapper(currentUser),
  patchSubscription: ctrlWrapper(patchSubscription),
};
