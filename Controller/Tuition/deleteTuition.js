const { Tuition } = require("../../Model");

const deleteTuition = async (req, res) => {
  try {
    const { id } = req.params;
    // Check tuition is belongs to the user
    const tuition = await Tuition.findByPk(id);
    if (!tuition) {
      return res.status(404).json({ message: "Tuition not found" });
    }

    // Delete dvice
    await tuition.destroy();

    return res.redirect(`/dashboard?success=${"Tuition deleted!"}`);
  } catch (error) {
    return res.redirect(`/dashboard?success=${error.message}`);
  }
};

module.exports = { deleteTuition };
