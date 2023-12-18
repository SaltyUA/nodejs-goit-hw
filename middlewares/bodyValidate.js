const HttpError = require("../models/HttpError");

const bodyValidate = (schema) => {
  const func = (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const [details] = error.details;
      if (details.type === "any.required") {
        throw new HttpError(400, `missing field ${details.context.key}`);
      }
      next(new HttpError(400, details.message));
    }
    next();
  };
  return func;
};

module.exports = bodyValidate;
