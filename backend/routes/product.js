const router = require("express").Router()
const Product = require("../models/Product")

router.post("/create", async (req, res, next) => {
  if (!req.body.name || !req.body.description) {
    res.status(400).send({
      message: "Content can not be empty!",
    })
    return
  }
  
  const product = {
      name: req.body.name,
      description: req.body.description,
    }
    console.log("name and desc: ",product)

    await Product.create(product)
    return res.status(200).json({ message: "product created" })

// With Promises
//   Product.create(product)
//     .then((data) => {
//       res.send(data)
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || "An error occurred while creating the Product!",
//       })
//     })
})


module.exports = router
