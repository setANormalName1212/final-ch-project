// DAOs
const productDAO = require("../controllers/DAOs/productDAO")
const cartDAO = require("../controllers/DAOs/cartDAO")
const userDAO = require("../controllers/DAOs/userDAO")

async function index(req, res) {
    res.render("index")
}

async function main(req, res) {
    const products = await productDAO.getAll()
    userDAO.getOneById(req.user)
        .then(user => {
            cartDAO.getOne(user.cartID)
                .then(cart => {
                    res.render("main", {
                        products,
                        cart
                    })
                })
        })
    
    
}

async function edit(req, res) {
    const { id } = req.params
    productDAO.getOne(id)
        .then(product => {
            res.render("edit", {
                product
            })
        })
}

async function config(req, res) {
    const user = await userDAO.getOneById(req.user)
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

async function chat(req, res) {
    res.render("chat")
}

async function buy(req, res) {
    res.render("buy")
}

module.exports = {
    index,
    main,
    edit,
    config,
    dashboard,
    product,
    chat,
    buy
}