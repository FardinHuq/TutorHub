const express = require("express");
const {
  createNotification,
} = require("../Controller/Notification/createNotification");
const {
  createNotificationTutor,
} = require("../Controller/Notification/createNotificationTutor");
const {
  deleteNotification,
} = require("../Controller/Notification/deleteNotification");

const { isAuth, isAdmin } = require("../Utils/isAuth");

const router = express.Router();

router.get("/delete", isAuth, deleteNotification);
router.post("/tutor/:id", isAdmin, createNotificationTutor);
router.post("/:id", isAdmin, createNotification);

module.exports = router;
