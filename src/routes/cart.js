const express = require("express")
const router = express.Router()

// controller
const { addProduct, pullProduct } = require("../controllers/cart-controller")

// cookies
const { cookies } = require("../controllers/cookies/cookies")

router.get("/cart/add/:id", cookies, addProduct)

router.get("/cart/delete/:id", cookies, pullProduct)

module.exports = router