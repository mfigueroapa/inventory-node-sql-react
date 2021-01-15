const router = require("express").Router()
const {
  findAll,
  create,
  deleteProduct,
  update,
} = require("../controllers/product")

router.get("/", findAll)
router.post("/create", create)
router.post("/delete/:id", deleteProduct)
router.put("/update/:id", update)

module.exports = router
