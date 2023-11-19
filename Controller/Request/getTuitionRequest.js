const { Request } = require("../../Model");

const getTuitionRequest = async (req, res) => {
  try {
    // Check Request exist or not
    const reqList = await Request.findAll({
      where: {
        tuitionId: req.params.id,
      },
    });

    return res.status(200).json({
      message: "Request list for tuition",
      data: reqList,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      data: error.message,
    });
  }
};

module.exports = { getTuitionRequest };
