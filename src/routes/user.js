const express = require("express")
const router = express.Router()

// user controller
const { register, login, deleteUser, editUser, logOut, recoveryUser, newPassword } = require("../controllers/user-controller")

// cookies
const { cookies } = require("../controllers/cookies/cookies")

router.get("/user/delete", cookies, deleteUser)

router.post("/user/edit/:id", cookies, editUser)

router.post("/user/login", login)

router.post("/user/register", register)

router.post("/user/recovery", recoveryUser)

router.get("/user/logOut", logOut)

router.post("/user/recovery/password/:id", newPassword)

module.exports = router