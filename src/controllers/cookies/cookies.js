async function cookies(req, res, next) {
    if(!req.cookies.user) {
        let errors = []
        errors.push({ msg: 'You need to register first' })
        res.render("index", {
            errors
        })
    } else {
        next()
    }
}

module.exports = {
    cookies
}