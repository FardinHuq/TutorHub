const Sequelize = require("sequelize");
const sequelize = require("../Utils/database");

const Tuition = sequelize.define("tuition", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  avaliability: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  subject: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  class: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  salary: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  area: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  medium: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Tuition;
