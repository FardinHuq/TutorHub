const Sequelize = require("sequelize");
const sequelize = require("../Utils/database");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  bio: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  available: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  approved: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  edu_institution: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  edu_subject: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  edu_degree: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  edu_grad_year: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  salt: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = User;
