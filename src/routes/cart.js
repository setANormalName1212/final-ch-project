const express = require("express")
const router = express.Router()

// controller
const { addProduct, pullProduct } = require("../controllers/cart-controller")

// cookies
const { cookies } = require("../controllers/cookies/cookies")

router.post("/cart/add", cookies, addProduct)

router.get("/cart/delete", cookies, pullProduct)

module.exports = router