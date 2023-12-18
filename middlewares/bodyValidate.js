const HttpError = require("../models/HttpError");

const bodyValidate = (schema) => {
  const func = (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const [details] = error.details;
      if (details.type === "any.required") {
        return next(new HttpError(400, `missing field ${details.context.key}`));
      }
      return next(new HttpError(400, details.message));
    }
    next();
  };
  return func;
};

module.exports = bodyValidate;
