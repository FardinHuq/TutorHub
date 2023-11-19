const { genPassword } = require("../../Utils/hashPassword");
const { User } = require("../../Model");

const registerController = async (req, res) => {
  try {
    // Form data
    const { name, password, role, username, phone, password2 } = req.body;
    console.log(req.body);
    if (password !== password2) {
      return res.redirect(`/signup?error=${"Password mismatched!"}`);
    }
    if (!name || !username || !phone || !password || !password2) {
      return res.redirect(`/signup?error=${"All fields are required!"}`);
    }

    // Check User exist or not
    const newUser = await User.findAll({ where: { username } });

    if (newUser.length > 0) {
      return res.redirect(`/signup?error=${"User already exists"}`);
    } else {
      // Create new user
      const passHash = genPassword(password);
      const newUser = await User.create({
        name,
        username,
        role,
        phone,
        password: passHash.hash,
        salt: passHash.salt,
      });
      return res.redirect(`/dashboard?success=${"User Registered!"}`);
    }
  } catch (error) {
    return res.redirect(`/signup?error=${error.message}`);
  }
};

module.exports = { registerController };
