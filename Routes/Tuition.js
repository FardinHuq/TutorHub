const express = require("express");

const { createTuition } = require("../Controller/Tuition/createTuition");
const { deleteTuition } = require("../Controller/Tuition/deleteTuition");
const {
  updateAvailability,
} = require("../Controller/Tuition/updateAvailability");
const { updateTuition } = require("../Controller/Tuition/updateTuition");
const { isAuth } = require("../Utils/isAuth");

const router = express.Router();

router.post("/", isAuth, createTuition);
router.post("/:id/edit", isAuth, updateTuition);
router.post("/:id/availability", isAuth, updateAvailability);

router.get("/:id/delete", deleteTuition);

module.exports = router;
