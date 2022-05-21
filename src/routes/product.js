const express = require("express")
const router = express.Router()

// controller
const { newProduct, editProduct, deleteProduct } = require("../controllers/products-controller")

router.post("/product/new", newProduct)

router.post("/product/edit", editProduct)

router.get("/product/delete/:id", deleteProduct)

module.exports = router