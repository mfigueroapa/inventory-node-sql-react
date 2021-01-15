const router = require("express").Router()
const Product = require("../models/Product")

router.get("/", async (req, res) => {
  Product.findAll()
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      })
    })
})

router.post("/create", (req, res, next) => {
  if (!req.body.name || !req.body.description) {
    res.status(400).send({
      message: "Content can not be empty!",
    })
    return
  }
  Product.create({
    name: req.body.name,
    description: req.body.description,
  })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while creating the Product!",
      })
    })
})

router.post("/delete/:id", (req, res) => {
  const { id } = req.params
  Product.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Product was deleted successfully!",
        })
      } else {
        res.send({
          message: `Cannot delete Product with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Product with id=" + id,
      })
    })
})

router.put("/update/:id", (req, res) => {
  const { id } = req.params
  Product.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Product was updated successfully.",
        })
      } else {
        res.send({
          message: `Cannot update Product with id=${id}!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Product with id=" + id,
      })
    })
})

module.exports = router
