const jwt = require("jsonwebtoken")
const PRIVATE_KEY = "myprivatekey"

function generateToken(user) {
    const token = jwt.sign({ data: user }, PRIVATE_KEY, { expiresIn: "1h" })

    return token
}

module.exports = generateToken