const { Requirement } = require("../../Model");

const deleteRequirement = async (req, res) => {
  try {
    const { id } = req.params;
    // Check tuition is belongs to the user
    const tuition = await Requirement.findByPk(id);
    if (!tuition) {
      return res.status(404).json({ message: "Requirement not found" });
    }

    // Delete dvice
    await tuition.destroy();

    return res.redirect(
      `/edit-tuition/${id}?success=${"Requirement deleted!"}`
    );
  } catch (error) {
    return res.redirect(`/edit-tuition/${id}?error=${error.message}`);
  }
};

module.exports = { deleteRequirement };
