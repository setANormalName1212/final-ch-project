const express = require("express")
const router = express.Router()

// controllers
const { register, login } = require("../controllers/user-controller")

router.get("/", (req, res) => {
    res.render("index")
})

// Register
router.post("/register", register)

// Log In
router.post("/login", login)


module.exports = router