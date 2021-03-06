const express = require("express")
const router = express.Router()

// controllers
const { index, main, edit, config, dashboard, product, chat, buy, recovery, recoveryPassword } = require("../controllers/index-controller")

// cookies
const { cookies } = require("../controllers/cookies/cookies")

// Index
router.get("/", index)

// Main
router.get("/main", cookies, main)

// Config
router.get("/config", cookies, config)
    
// Edit
router.get("/product/edit/:id", cookies, edit)

// Dashboard
router.get("/dashboard", cookies, dashboard)

// Product
router.get("/product/view/:id", cookies, product)

// Chat
router.get("/chat", chat)

// Buy
router.get("/cart/buy", buy)

// Recovery account
router.get("/user/recovery", recovery)

// Re write password
router.get("/user/password/:id", recoveryPassword)

module.exports = router