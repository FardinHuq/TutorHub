const { Tuition } = require("../../Model");

const updateAvailability = async (req, res) => {
  try {
    // Param
    const { id } = req.params;
    if (!req.user || req.user.role !== "admin") {
      return res.redirect(`/tuition/${id}?error=${"All fields are required!"}`);
    }
    // find tuition by id
    const tuition = await Tuition.findByPk(id);

    // update new grade
    await tuition.update({
      ...req.body,
    });

    return res.redirect(
      `/tuition/${id}?success=${"Tuition availability changed!"}`
    );
  } catch (error) {
    console.log(error);
    return res.redirect(`/tuition/${id}?error=${error.message}`);
  }
};

module.exports = { updateAvailability };
