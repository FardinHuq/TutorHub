const { Notification, Tuition } = require("../../Model");

const createNotification = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.user || !req.body.text || !id) {
      return res.redirect(`/tuition/${id}?error=${"All fields are required!"}`);
    }
    if (req.user.role !== "admin") {
      return res.redirect(`/tuition/${id}?error=${"You are not authorized!"}`);
    }
    const tuition = await Tuition.findByPk(id);
    // Create new request
    await Notification.create({
      ...req.body,
      userId: tuition.userId,
    });

    return res.redirect(`/admin?success=${"Nitification added!"}`);
  } catch (error) {
    return res.redirect(`/tuition/${id}?error=${error.message}`);
  }
};

module.exports = { createNotification };
