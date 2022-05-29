const express = require("express")
const router = express.Router()

// controller
const { newProduct, editProduct, deleteProduct, getProduct, getProductByCategory } = require("../controllers/products-controller")

router.get("/product/view/:id", getProduct)

router.post("/product/new", newProduct)

router.get("/product/:category", getProductByCategory)

router.post("/product/edit/:id", editProduct)

router.get("/product/delete/:id", deleteProduct)

module.exports = router