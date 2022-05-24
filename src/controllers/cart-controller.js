// DAO
const cartDAO = require("../controllers/DAOs/cartDAO")
const userDAO = require("../controllers/DAOs/userDAO")

async function addProduct(req, res) {
    const user = req.cookies.user
    await userDAO.getOneById(user)
        .then(User => {
            cartDAO.add(User.cartID, req.params.id)
                .then(res.redirect("/main"))
        })
}

async function pullProduct(req, res) {
    const user = req.cookies.id
    const product = {
        id: req.params.id,
        quantity: req.body.quantity
    }
    await userDAO.getOneById(user)
        .then(User => {
            cartDAO.deleteOne(User.cartID, product.id)
            res.redirect("/main")
        })
}

module.exports = {
    addProduct,
    pullProduct
}