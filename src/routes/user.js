const express = require("express")
const router = express.Router()

// user controller
const { register, login } = require("../controllers/user-controller")

// cookies


router.get("/user/delete", (req, res) => {

})

router.put("/user/edit", (req, res) => {
    
})

router.post("/user/login", login)

router.post("/user/register", register)

module.exports = router