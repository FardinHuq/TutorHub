const User = require("../../Model/User.model");

const updateProfile = async (req, res) => {
  // get data from request
  try {
    // find user by id
    const user = await User.findByPk(req.user.id, {
      except: ["password", "salt"],
    });
    // if user not found
    if (!user) {
      return res.redirect(`/dashboard?error='User not found!'`);
    } else {
      // update user profile
      await user.update({
        ...req.body,
      });
      const updatedUser = await user.save();
      req.login(updatedUser, (loginError) => {
        return res.redirect(`/dashboard?success='User updated!'`);
      });
    }
  } catch (error) {
    // send error
    return res.redirect(`/dashboard?error=${error.message}`);
  }
};

module.exports = { updateProfile };
