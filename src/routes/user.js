const express = require("express")
const router = express.Router()

// user controller
const { register, login, deleteUser, editUser } = require("../controllers/user-controller")

// cookies

router.get("/user/delete", deleteUser)

router.put("/user/edit", editUser)

router.post("/user/login", login)

router.post("/user/register", register)

module.exports = router