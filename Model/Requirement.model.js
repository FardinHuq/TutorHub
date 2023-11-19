const Sequelize = require("sequelize");
const sequelize = require("../Utils/database");

const Requirement = sequelize.define("Requirement", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Requirement;
