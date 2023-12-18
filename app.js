const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const { handleError } = require("./helpers");
const { contactsRouter, authRouter } = require("./routes/api");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/users", authRouter);

app.use((_, res, __) => {
  res.status(404).json({
    status: "error",
    message: "Use api on routes: /api/contacts",
    data: "Not found",
  });
});

app.use(handleError);

module.exports = app;
