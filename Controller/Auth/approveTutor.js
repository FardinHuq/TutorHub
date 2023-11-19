const { Notification, User } = require("../../Model");

const approveTutor = async (req, res) => {
  // get data from request
  try {
    // find user by id
    const user = await User.findByPk(req.params.id);
    // if user not found
    if (!user) {
      return res.redirect(`/admin?error='User not found!'`);
    } else {
      // update user profile
      await user.update({
        approved: true,
      });
      await user.save();
      // Create notification for user
      await Notification.create({
        text: "Your profile has been approved!",
        userId: req.params.id,
      });
      return res.redirect(`/admin?success='Tutor approved!'`);
    }
  } catch (error) {
    // send error
    return res.redirect(`/admin?error=${error.message}`);
  }
};

module.exports = { approveTutor };
