const { Request } = require("../../Model");

const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;
    // Check area is belongs to the user
    const request = await Request.findByPk(id);
    if (!request) {
      return res.redirect(`/dashboard?error=${"request not found!"}`);
    }

    // Delete grade
    await request.destroy();

    return res.redirect(`/dashboard?success=${"Request deleted!"}`);
  } catch (error) {
    return res.redirect(`/dashboard?error=${error.message}`);
  }
};

module.exports = { deleteRequest };
