const { Notification } = require("../../Model");

const deleteNotification = async (req, res) => {
  try {
    if (!req.user) {
      return res.redirect(`/dashboard?error=${"You are not authorized!"}`);
    }
    if (req.user.role !== "tutor") {
      return res.redirect(`/dashboard?error=${"You are not authorized!"}`);
    }
    // Create new request
    await Notification.destroy({
      where: { userId: req.user.id },
    });

    return res.redirect(`/dashboard?success=${"Nitifications deleted!"}`);
  } catch (error) {
    return res.redirect(`/dashboard?error=${error.message}`);
  }
};

module.exports = { deleteNotification };
