const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../Model/User.model");
const { validPassword } = require("./hashPassword");

// TODO: passport.use();
const customFields = {
  usernameField: "username",
};

const verifyCallback = async (username, password, done) => {
  try {
    const user = await User.findAll({ where: { username } });
    if (user.length > 0) {
      let isValid = validPassword(password, user[0].password, user[0].salt);
      console.log(password);
      if (isValid) {
        return done(null, user[0].dataValues);
      } else {
        return done(null, false, {
          message: "Incorrect password.",
        });
      }
    } else {
      return done(null, false, {
        message: "Incorrect username.",
      });
    }
  } catch (error) {
    done(error);
  }
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use("loginpassport", strategy);

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user
passport.deserializeUser(async (obj, done) => {
  try {
    const { id } = obj;
    const user = await User.findByPk(id, { raw: true });

    if (!user) done(null, false);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
