// DAO
const productDAO = require("./DAOs/productDAO")

async function newProduct(req, res) {
    const product = req.body
    productDAO.newProduct(product)
    res.redirect("/dashboard")
}

async function editProduct(req, res) {

}

async function deleteProduct(req, res) {
    const id = req.params.id
    productDAO.deleteOne(id)
}

module.exports = {
    newProduct,
    editProduct,
    deleteProduct
}