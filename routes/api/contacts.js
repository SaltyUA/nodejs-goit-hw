const express = require("express");
const router = express.Router();
const { contactsCtrl } = require("../../controllers");
const {
  bodyValidate,
  isValidId,
  tokenValidation,
} = require("../../middlewares");
const { schemas } = require("../../schemas/contacts");

router.get("/", tokenValidation, contactsCtrl.getAll);

router.get("/:contactId", tokenValidation, isValidId, contactsCtrl.getById);

router.post(
  "/",
  tokenValidation,
  bodyValidate(schemas.addSchema),
  contactsCtrl.postContact
);

router.delete(
  "/:contactId",
  tokenValidation,
  isValidId,
  contactsCtrl.deleteContact
);

router.put(
  "/:contactId",
  tokenValidation,
  bodyValidate(schemas.putSchema),
  isValidId,
  contactsCtrl.putContact
);

router.patch(
  "/:contactId/favorite",
  tokenValidation,
  bodyValidate(schemas.patchSchema),
  isValidId,
  contactsCtrl.patchContact
);

module.exports = router;
