// DAO
const cartDAO = require("../controllers/DAOs/cartDAO")
const userDAO = require("../controllers/DAOs/userDAO")

async function addProduct(req, res) {
    const user = req.user
    await userDAO.getOneById(user)
        .then(User => {
            cartDAO.add(User.cartID, req.params.id)
                .then(res.redirect("/main"))
        })
}

async function pullProduct(req, res) {
    await userDAO.getOneById(req.user)
        .then(user => {
            cartDAO.deleteOne(user.cartID, req.params.id)
                .then(res.redirect("/main"))
        })
}

module.exports = {
    addProduct,
    pullProduct
}