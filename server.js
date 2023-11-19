const express = require("express");
require("dotenv").config();
const cors = require("cors");
var morgan = require("morgan");

const sequelize = require("./Utils/database");
const path = require("path");

//Models
const {
  User,
  Request,
  Tuition,
  Requirement,
  Notification,
} = require("./Model");

// AAuth releted packages
const passport = require("passport");
const expressSession = require("express-session");
const SessionStore = require("express-session-sequelize")(expressSession.Store);
const cookieParser = require("cookie-parser");
require("./Utils/passport");

//Loads the handlebars module
const { engine } = require("express-handlebars");

// INITIALIZE APP
const app = express();
const port = process.env.PORT || 5000;

//Initializing the middlewares
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));

// Cors;
app.use(
  cors({
    origin: "*",
  })
);

app.use(morgan("tiny"));
// Session
const sequelizeSessionStore = new SessionStore({
  db: sequelize,
});

app.use(cookieParser());
app.use(
  expressSession({
    secret: process.env.SESSION_SECREAT,
    store: sequelizeSessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

// Auth
app.use(passport.initialize());
app.use(passport.session());
app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.static("public"));

// ROUTES
app.use("/api", require("./Routes/Auth"));
app.use("/api/request", require("./Routes/Request"));
app.use("/api/tuition", require("./Routes/Tuition"));
app.use("/api/requirement", require("./Routes/Requirement"));
app.use("/api/notification", require("./Routes/Notification"));

app.use("/", require("./Routes/Views"));

//Sets our app to use the handlebars engine
app.set("view engine", "handlebars");
//Sets handlebars configurations (we will go through them later on)
app.engine(
  "handlebars",
  engine({
    layoutsDir: __dirname + "/views/layouts",
    helpers: {
      inc: function (value, options) {
        return parseInt(value) + 1;
      },
      if_eq: function (a, b, options) {
        if (a == b) {
          return options.fn(this);
        }
        return options.inverse(this);
      },
    },
  })
);

// Sequelize Relations
Tuition.hasMany(Requirement);
Tuition.hasMany(Request);
Requirement.belongsTo(Tuition);
Tuition.belongsTo(User);
User.hasMany(Tuition);
Request.belongsTo(User);
Request.belongsTo(Tuition);
User.hasMany(Request);
User.hasMany(Notification);
Request.belongsTo(User);
Notification.belongsTo(User);

// Sequelize Sync
sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Error creating database: ", err);
  });
