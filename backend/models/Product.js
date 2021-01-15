const { Sequelize } = require("sequelize")
const sequelize = require("./")

const Product = sequelize.define(
  "product",
  {
    name: Sequelize.STRING,
    description: Sequelize.STRING,
  },
  {
    timestamps: true,
    versionKey: false,
  }
)


module.exports = Product
