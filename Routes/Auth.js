const express = require("express");
const passport = require("passport");

const { registerController } = require("../Controller/Auth/Register");
const { getDashboard } = require("../Controller/Auth/getDashboard");
const { isAuth } = require("../Utils/isAuth");
const { updateProfile } = require("../Controller/Auth/updateProfile");
const { approveTutor } = require("../Controller/Auth/approveTutor");
const { editPassword } = require("../Controller/Auth/editPassword");

const router = express.Router();

// Auth Routes
router.post("/register", registerController);
router.post(
  "/login",
  passport.authenticate("loginpassport", {
    successRedirect: "/dashboard",
    failureRedirect: "/login?error=wrong",
  })
);

router.post("/editProfile", isAuth, updateProfile);
router.post("/password", isAuth, editPassword);
router.get("/dashboard", isAuth, getDashboard);
router.get("/tutor/:id/approve", approveTutor);

router.get("/logout", isAuth, (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).clearCookie("connect.sid");
    res.redirect("/");
  });
});

module.exports = router;
