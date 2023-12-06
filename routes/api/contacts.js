const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { bodyValidate } = require("../../middlewares");
const schemas = require("../../schemas/contacts");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", bodyValidate(schemas.addSchema), ctrl.postContact);

router.delete("/:contactId", ctrl.deleteContact);

router.put("/:contactId", bodyValidate(schemas.putSchema), ctrl.putContact);

module.exports = router;
