const { Request } = require("../../Model");

const getMyRequest = async (req, res) => {
  try {
    // Check Request exist or not
    const areaList = await Request.findAll({
      where: {
        userId: req.user.id,
      },
    });

    return res.status(200).json({
      message: "Request list for user",
      data: areaList,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      data: error.message,
    });
  }
};

module.exports = { getMyRequest };
