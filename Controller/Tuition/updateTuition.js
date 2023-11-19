const { Tuition } = require("../../Model");

const updateTuition = async (req, res) => {
  try {
    // Param
    const { id } = req.params;
    if (
      !req.user ||
      req.user.role !== "user" ||
      !req.body.salary ||
      !req.body.gender
    ) {
      return res.redirect(
        `/edit-tuition/${id}?error=${"All fields are required!"}`
      );
    }

    // find tuition by id
    const tuition = await Tuition.findByPk(id);
    if (tuition.userId !== req.user.id) {
      return res.redirect(
        `/edit-tuition/${id}?error=${"You are not authorized!"}`
      );
    }
    // update new grade
    await tuition.update({
      ...req.body,
    });

    return res.redirect(`/dashboard?success=${"Tuition edited!"}`);
  } catch (error) {
    console.log(error);
    return res.redirect(`/edit-tuition/${id}?error=${error.message}`);
  }
};

module.exports = { updateTuition };
