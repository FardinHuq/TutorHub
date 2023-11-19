const express = require("express");
const moment = require("moment/moment");
const {
  User,
  Tuition,
  Requirement,
  Request,
  Notification,
} = require("../Model");
const { isAuth } = require("../Utils/isAuth");

const router = express.Router();

router.get("/", async (req, res) => {
  const areas = await Tuition.findAll({
    attributes: ["area"],
    distinct: true,
    group: ["area"],
    raw: true,
  });
  if (req.user) {
    res.render("main", {
      layout: "index",
      user: req.user,
      areas: areas.map((item) => item.area),
    });
  } else res.render("main", { layout: "index" });
});
router.get("/filter", async (req, res) => {
  const areas = await Tuition.findAll({
    attributes: ["area"],
    distinct: true,
    group: ["area"],
    raw: true,
  });
  if (req.user) {
    res.render("filter", {
      layout: "index",
      user: req.user,
      areas: areas.map((item) => item.area),
    });
  } else res.render("filter", { layout: "index" });
});

router.get("/result", async (req, res) => {
  let config = {};
  if (req.query.area && req.query.area !== "all") {
    config = { ...config, area: req.query.area };
  }
  if (req.query.medium && req.query.medium !== "all") {
    config = { ...config, medium: req.query.medium };
  }
  const tuitions = await Tuition.findAll({
    raw: true,
    where: config,
  });
  if (req.user) {
    res.render("result", {
      layout: "index",
      user: req.user,
      tuitions: tuitions
        .map((item) => ({
          ...item,
          createdAt: moment(item.createdAt).fromNow(),
        }))
        .reverse(),
    });
  } else res.render("filter", { layout: "index" });
});

router.get("/admin", async (req, res) => {
  const tutors = await User.findAll({
    raw: true,
    where: {
      role: "tutor",
      approved: false,
    },
  });

  if (req.user && req.user.role === "admin") {
    res.render("dashboardAdmin", {
      layout: "index",
      user: req.user,
      tutors: tutors
        .map((item) => ({
          ...item,
          createdAt: moment(item.createdAt).fromNow(),
        }))
        .reverse(),
    });
  } else res.render("filter", { layout: "index" });
});

router.get("/dashboard", isAuth, async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    include: [
      {
        model: Tuition,
      },
      {
        model: Request,
        include: [Tuition],
      },
      {
        model: Notification,
      },
    ],
  });
  if (req.user.role === "user") {
    return res.render("dashboard", {
      layout: "index",
      user: req.user,
      tuitions: user.tuitions
        .map((item) => ({
          ...item.dataValues,
          createdAt: moment(item.createdAt).fromNow(),
        }))
        .reverse(),
      notifications: user.notifications
        .map((item) => ({
          ...item.dataValues,
          createdAt: moment(item.createdAt).fromNow(),
        }))
        .reverse(),
    });
  } else if (req.user.role === "tutor") {
    return res.render("dashboardTutor", {
      layout: "index",
      user: req.user,
      tuitions: user.Requests.map((item) => ({
        ...item.dataValues.tuition.dataValues,
        createdAt: moment(item.createdAt).fromNow(),
        id: item.id,
        text: item.text,
      })).reverse(),
      notifications: user.notifications
        .map((item) => ({
          ...item.dataValues,
          createdAt: moment(item.createdAt).fromNow(),
        }))
        .reverse(),
    });
  } else if (req.user.role === "admin") {
    return res.redirect("/admin");
  } else {
    return res.redirect("/");
  }
});

router.get("/edit-profile", isAuth, (req, res) => {
  if (req.user.role === "tutor") {
    res.render("editProfileTutor", { layout: "index", user: req.user });
  } else {
    res.render("editProfile", { layout: "index", user: req.user });
  }
});
router.get("/edit-password", isAuth, (req, res) => {
  res.render("passwordChange", { layout: "index", user: req.user });
});

router.get("/tutor/:id", isAuth, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, { raw: true });
    if (user) {
      res.render("viewTutor", { layout: "index", user: req.user, tutor: user });
    } else {
      res.redirect("/dashboard");
    }
  } catch (error) {
    res.redirect("/dashboard");
  }
});
router.get("/tuition/:id", isAuth, async (req, res) => {
  try {
    const tuition = await Tuition.findByPk(req.params.id, {
      raw: true,
      nest: true,
      include: [User],
    });
    const requirements = await Requirement.findAll({
      raw: true,
      where: { tuitionId: req.params.id },
      attributes: ["text", "id"],
    });
    const requests = await Request.findAll({
      raw: true,
      nest: true,
      where: { tuitionId: req.params.id },
      include: [User],
    });
    if (!tuition) {
      return res.redirect("/");
    }
    return res.render("tuitionDetails", {
      layout: "index",
      user: req.user,
      tuition: { ...tuition, createdAt: moment(tuition.createdAt).fromNow() },
      owner: { ...tuition.user },
      requirements,
      tutor: req.user.role === "tutor",
      admin: req.user.role === "admin",
      requests,
      approved: req.user.role === "tutor" && req.user.approved === 1,
      own: tuition.userId === req.user.id || req.user.role === "admin",
      available: tuition.avaliability === "Available",
    });
  } catch (error) {
    return res.redirect(`/dashboard?error=${error.message}`);
  }
});

router.get("/edit-tuition/:id", isAuth, async (req, res) => {
  try {
    const tuition = await Tuition.findByPk(req.params.id, { raw: true });
    const requirements = await Requirement.findAll({
      raw: true,
      where: { tuitionId: req.params.id },
      attributes: ["text", "id"],
    });
    if (!tuition) {
      return res.redirect("/");
    }
    if (req.user.role === "user") {
      return res.render("editTuition", {
        layout: "index",
        user: req.user,
        tuition,
        requirements,
      });
    } else {
      return res.redirect("/");
    }
  } catch (error) {
    return res.redirect(`/dashboard?error=${error.message}`);
  }
});

// Auth Pages
router.get("/login", (req, res) => {
  res.render(`login`, { param: req.params });
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

// TUITION ROUTES
router.get("/add-tuition", isAuth, (req, res) => {
  if (req.user.role === "user") {
    res.render("addTuition", { layout: "index", user: req.user });
  } else {
    res.redirect("/dashboard");
  }
});

module.exports = router;
