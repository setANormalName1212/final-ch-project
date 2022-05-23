// DAOs
const productDAO = require("../controllers/DAOs/productDAO")
const cartDAO = require("../controllers/DAOs/cartDAO")
const userDAO = require("../controllers/DAOs/userDAO")

async function index(req, res) {
    res.render("index")
}

async function main(req, res) {
    const products = await productDAO.getAll()
    const cart = await cartDAO.getOne(req.cookies.user)
    res.render("main", {
        products,
        cart
    })
}

async function edit(req, res) {
    const product = productDAO.getOne(req.params.id)
    res.render("edit", {
        product
    })
}

async function config(req, res) {
    const user = userDAO.getOneById(req.cookies.user)
    res.render("config", {
        user
    })
}

async function dashboard(req, res) {
    const products = await productDAO.getAll()
    res.render("dashboard", {
        products
    })
}

async function product(req, res) {
    const product = await productDAO.getOne(req.params.id)
    res.render("product", {
        product
    })
}

module.exports = {
    index,
    main,
    edit,
    config,
    dashboard,
    product
}