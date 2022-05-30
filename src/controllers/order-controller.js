// DAO
const orderDAO = require("./DAOs/orderDAO")

async function createOrder(req, res) {
    const user = req.user
    orderDAO(user)
        .then(algo => res.send(algo))
}

module.exports = {
    createOrder
}