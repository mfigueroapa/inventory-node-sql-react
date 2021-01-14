const { Sequelize } = require("sequelize")

//Connection to db
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
  }
)

//Verify connection
sequelize
  .authenticate()
  .then((x) => console.log(`Connected to Postgres!`))
  .catch((err) => console.error("Error connecting to postgres", err))

module.exports = sequelize
