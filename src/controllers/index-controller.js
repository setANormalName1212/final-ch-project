async function index(req, res) {
    res.render("index")
}

async function main(req, res) {
    res.render("main")
}

async function edit(req, res) {
    res.render("edit")
}

async function config(req, res) {
    res.render("config")
}

async function dashboard(req, res) {
    res.render("dashboard")
}

async function product(req, res) {
    res.render("product")
}

module.exports = {
    index,
    main,
    edit,
    config,
    dashboard,
    product
}