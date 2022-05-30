const express = require("express")
const router = express.Router()

// controller
const { createOrder } = require("../controllers/order-controller")

// cookies
const {cookies} = require("../controllers/cookies/cookies")

router.get("/order/create", cookies, createOrder)

module.exports = router