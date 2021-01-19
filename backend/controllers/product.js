const router = require("express").Router()
const Product = require("../models/Product")

exports.findAll = (req, res) => {
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
}

exports.create = (req, res) => {
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
}

exports.deleteProduct = (req, res) => {
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
}

exports.update = (req, res) => {
  const { id, name, description } = req.body
  Product.update(
    {
      name,
      description,
    },
    {
      where: { id: id },
    }
  )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Product was updated successfully.",
          product: { id, name, description },
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
}
