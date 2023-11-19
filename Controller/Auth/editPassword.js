const { genPassword, validPassword } = require("../../Utils/hashPassword");
const { validationResult } = require("express-validator");
const { User } = require("../../Model");

const editPassword = async (req, res) => {
  try {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    // Form data
    const { passwordOld, password, password2 } = req.body;
    if (!password || !passwordOld) {
      return res.redirect(`/edit-password?error=${"All fields are required!"}`);
    }
    if (password !== password2) {
      return res.redirect(`/edit-password?error=${"Password mismatched!"}`);
    }

    // Check User exist or not
    const newUser = await User.findByPk(req.user.id);

    if (!newUser) {
      return res.redirect(`/edit-password?error=${"User does not exists"}`);
    } else {
      let isValid = validPassword(
        passwordOld,
        newUser.password,
        newUser.salt.toString()
      );
      if (!isValid) {
        return res.redirect(
          `/edit-password?error=${"Your current password is wrong!"}`
        );
      }
      // Create new user
      const passHash = genPassword(password);
      await newUser.update({
        password: passHash.hash,
        salt: passHash.salt,
      });
      return res.redirect(`/dashboard?success=${"User password changed!"}`);
    }
  } catch (error) {
    return res.redirect(`/edit-password?error=${error.message}`);
  }
};

module.exports = { editPassword };
