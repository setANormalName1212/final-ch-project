const jwt = require("jsonwebtoken")

async function cookies(req, res, next) {
    let errors = []
    if(!req.cookies.user) {
        errors.push({ msg: 'You need to register first' })
        res.render("index", {
            errors
        })
    } else {
        jwt.verify(req.cookies.user, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err) {
                errors.push({ msg: 'Your token dont match' })
                res.render("index", {
                    errors
                })
            } else {
                req.user = user
                next()
            }
        })
    }
}

module.exports = {
    cookies
}