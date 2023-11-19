const { Tuition } = require("../../Model");

const createTuition = async (req, res) => {
  try {
    if (!req.user || !req.body.salary || !req.body.gender || !req.body.area) {
      return res.redirect(`/add-tuition?error=${"All fields are required!"}`);
    }
    // Create new tuition
    await Tuition.create({
      ...req.body,
      avaliability: "Available",
      userId: req.user.id,
    });

    return res.redirect(`/dashboard?success=${"Tuition added!"}`);
  } catch (error) {
    return res.redirect(`/add-tuition?error=${error.message}`);
  }
};

module.exports = { createTuition };
