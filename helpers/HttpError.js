const HtppError = (status, mesage) => {
  const error = new Error();
  error.status = status;
  return error;
};

module.exports = HtppError;
