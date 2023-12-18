const HttpError = require("../models/HttpError");

const handleError = (err, _, res, __) => {
  if (err instanceof HttpError) {
    res.status(err.status);
    res.json({
      status: err.status,
      message: err.message,
      error: err.error,
    });
  } else {
    res.status(500);
    res.json({
      status: 500,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

module.exports = handleError;
