const express = require("express");
const ctrl = require("../../controllers/contacts");
const router = express.Router();
const { validateBody } = require("../../middlewares");
const schemas = require("../../schemas/contacts");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.postContact);

router.delete("/:contactId", ctrl.deleteContact);

router.put("/:contactId", validateBody(schemas.putSchema), ctrl.putContact);

module.exports = router;
