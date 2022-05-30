const express = require("express")
const router = express.Router()

// user controller
const { register, login, deleteUser, editUser, logOut } = require("../controllers/user-controller")

// cookies
const { cookies } = require("../controllers/cookies/cookies")

router.get("/user/delete", cookies, deleteUser)

router.post("/user/edit/:id", cookies, editUser)

router.post("/user/login", login)

router.post("/user/register", register)

router.get("/user/logOut", logOut)

module.exports = router