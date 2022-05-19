const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    res.render("index")
})

// Register
router.post("/register", (req, res) => {
    
})

// Log In
router.post("/login", (req, res) => {

})


module.exports = router