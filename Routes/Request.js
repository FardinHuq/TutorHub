const express = require("express");
const { createRequest } = require("../Controller/Request/createRequest");
const { deleteRequest } = require("../Controller/Request/deleteRequest");

const { isAuth } = require("../Utils/isAuth");

const router = express.Router();

router.get("/:id/delete", isAuth, deleteRequest);
router.post("/:id", isAuth, createRequest);

module.exports = router;
