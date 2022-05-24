const express = require("express")
const router = express.Router()

// controllers
const { index, main, edit, config, dashboard, product } = require("../controllers/index-controller")

// Index
router.get("/", index)

// Main
router.get("/main", main)

// Config
router.get("/config", config)
    
// Edit
router.get("/edit/:id", edit)

// Dashboard
router.get("/dashboard", dashboard)

// Product
router.get("/product/view/:id", product)

module.exports = router