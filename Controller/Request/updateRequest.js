const { validationResult } = require("express-validator");
const { Request } = require("../../Model");

const updateRequest = async (req, res) => {
  try {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    // Param
    const { id } = req.params;

    // find req by id
    const req = await Request.findByPk(id);

    // check if req exist
    if (!req) {
      return res.status(404).json({ message: "Request not found" });
    }

    // update new grade
    const newRequest = await req.update({
      ...req.body,
    });

    return res.status(200).json({
      message: "Request updated successfully",
      data: newRequest,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      data: error.message,
    });
  }
};

module.exports = { updateRequest };
