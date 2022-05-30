// DAO
const orderDAO = require("./DAOs/orderDAO")

async function createOrder(req, res) {
    const user = req.user
    orderDAO.createOrder(user)
        .then(res.redirect("/main"))
}

module.exports = {
    createOrder
}