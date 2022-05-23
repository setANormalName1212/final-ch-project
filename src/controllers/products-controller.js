// DAO
const productDAO = require("./DAOs/productDAO")

async function getProduct(req, res) {
    const product = productDAO.getOne(req.params.id)
    res.render("product", {
        product
    })
}

async function newProduct(req, res) {
    const product = req.body
    productDAO.newProduct(product)
    res.redirect("/dashboard")
}

async function editProduct(req, res) {
    const product = req.body
    productDAO.updateOne(id, product)
    res.redirect("/dashboard")
}

async function deleteProduct(req, res) {
    const id = req.params.id
    productDAO.deleteOne(id)
}

module.exports = {
    newProduct,
    editProduct,
    deleteProduct,
    getProduct
}