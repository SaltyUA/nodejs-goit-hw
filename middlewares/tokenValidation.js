const jwt = require("jsonwebtoken");
const HttpError = require("../models/HttpError");
const { JWT_SECRET } = require("../helpers/env");
const users = require("../models/users");

const tokenValidation = async (req, _, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new HttpError(401, "Not authorized"));
  }

  const token = authHeader.split(" ")[1];
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (e) {
    return next(new HttpError(401, "Not authorized"));
  }

  const user = await users.findById(payload.sub);
  if (!user) {
    return next(new HttpError(401, "Not authorized"));
  }
  if (token !== user.token) {
    return next(new HttpError(401, "Not authorized"));
  }
  req.user = user;
  next();
};

module.exports = tokenValidation;
