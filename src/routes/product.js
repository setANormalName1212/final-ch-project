const express = require("express")
const router = express.Router()

// controller
const { newProduct, editProduct, deleteProduct, getProduct } = require("../controllers/products-controller")

router.get("/product/view/:id", getProduct)

router.post("/product/new", newProduct)

router.post("/product/edit", editProduct)

router.get("/product/delete/:id", deleteProduct)

module.exports = router