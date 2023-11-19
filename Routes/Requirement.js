const express = require("express");
const {
  createRequirement,
} = require("../Controller/Requirement/createRequirement");
const {
  deleteRequirement,
} = require("../Controller/Requirement/deleteRequirement");

const { isAuth } = require("../Utils/isAuth");

const router = express.Router();

router.post("/:id/delete", isAuth, deleteRequirement);
router.post("/:id", isAuth, createRequirement);

module.exports = router;
