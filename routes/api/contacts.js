const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { bodyValidate, isValidId } = require("../../middlewares");
const { schemas } = require("../../schemas/contacts");

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", bodyValidate(schemas.addSchema), ctrl.postContact);

router.delete("/:contactId", isValidId, ctrl.deleteContact);

router.put(
  "/:contactId",
  bodyValidate(schemas.putSchema),
  isValidId,
  ctrl.putContact
);

router.patch(
  "/:contactId/favorite",
  bodyValidate(schemas.patchSchema),
  isValidId,
  ctrl.patchContact
);

module.exports = router;
