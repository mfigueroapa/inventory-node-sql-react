require("dotenv").config()

const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const express = require("express")
const logger = require("morgan")
const path = require("path")
const cors = require("cors")
const session = require("express-session")
const passport = require("./config/passport")
const SequelizeStore = require("connect-session-sequelize")(session.Store)

//Database config
const sequelize = require("./models")

//Uncomment to not drop table
// sequelize.sync()

// Uncomment to drop the table if it already exists
sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

const app_name = require("./package.json").name
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
)

const app = express()

app.use(
  cors({
    credentials: true,
    origin: [process.env.FRONTENDPOINT],
  })
)

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET,
    cookie: { maxAge: 1000 * 60 * 60 },
    store: new SequelizeStore({
      db: sequelize,
    })
  })
)

app.use(passport.initialize())
app.use(passport.session())


app.use(express.static(path.join(__dirname, "public")))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(logger("dev"))

app.use("/", require("./routes"))
app.use("/auth", require("./routes/auth"))
app.use("/product", require("./routes/product"))

// Uncomment this line for production
// app.get('/*', (req, res) => res.sendFile(__dirname + '/public/index.html'));

module.exports = app
