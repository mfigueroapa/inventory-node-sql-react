const { Sequelize } = require("sequelize")
const sequelize = require("./")

const User = sequelize.define(
  "user",
  {
    email: Sequelize.STRING,
    password: Sequelize.STRING,
  },
  {
    timestamps: true,
    versionKey: false,
  }
)


module.exports = User
