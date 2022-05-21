const express = require("express")
const router = express.Router()

// controllers
const { index, main, edit, config, dashboard, product } = require("../controllers/index-controller")

// Index
router.get("/", index)

// Main
router.get("/main", main)

// Config
router.get("/config", edit)
    
// Edit
router.get("/edit", config)

// Dashboard
router.get("/dashboard", dashboard)

// Product
router.get("/product", product)

module.exports = router