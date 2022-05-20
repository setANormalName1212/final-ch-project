const express = require("express")
const router = express.Router()

// controllers
const { cookies } = require("../controllers/cookies/cookies")


router.get("/", cookies, (req, res) => {
    res.render("main", {
        user,
        products,
        cart
    })
})

router.post("/cart/add", cookies)

module.exports = router