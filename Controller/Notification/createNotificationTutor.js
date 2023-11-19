const { Notification, Tuition } = require("../../Model");

const createNotificationTutor = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.user || !req.body.text || !id) {
      return res.redirect(`/tutor/${id}?error=${"All fields are required!"}`);
    }
    if (req.user.role !== "admin") {
      return res.redirect(`/tutor/${id}?error=${"You are not authorized!"}`);
    }
    // Create new request
    await Notification.create({
      ...req.body,
      userId: id,
    });

    return res.redirect(`/admin?success=${"Nitification sent to tutor!"}`);
  } catch (error) {
    return res.redirect(`/tutor/${id}?error=${error.message}`);
  }
};

module.exports = { createNotificationTutor };
