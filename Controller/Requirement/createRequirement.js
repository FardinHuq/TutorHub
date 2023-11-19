const { Requirement } = require("../../Model");

const createRequirement = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.user || !req.body.text || !id) {
      return res.redirect(
        `/edit-tuition/${id}?error=${"All fields are required!"}`
      );
    }
    // Create new tuition
    await Requirement.create({
      ...req.body,
      tuitionId: id,
    });

    return res.redirect(`/edit-tuition/${id}?success=${"Requirement added!"}`);
  } catch (error) {
    return res.redirect(`/edit-tuition/${id}?error=${error.message}`);
  }
};

module.exports = { createRequirement };
