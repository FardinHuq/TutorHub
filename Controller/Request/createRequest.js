const { Request, Notification } = require("../../Model");

const createRequest = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.user || !req.body.text || !id) {
      return res.redirect(`/tuition/${id}?error=${"All fields are required!"}`);
    }
    // Check Request exist or not
    const newRequest = await Request.findAll({
      where: { tuitionId: id, userId: req.user.id },
    });
    if (newRequest.length > 0) {
      return res.redirect(
        `/tuition/${id}?error=${"You have already requested!"}`
      );
    } else {
      // Create new request
      await Request.create({
        ...req.body,
        tuitionId: id,
        userId: req.user.id,
      });

      await Notification.create({
        text: "Your request has been recived!",
        userId: req.user.id,
      });

      return res.redirect(`/dashboard?success=${"Applied for tuition!"}`);
    }
  } catch (error) {
    return res.redirect(`/tuition/${id}?error=${error.message}`);
  }
};

module.exports = { createRequest };
