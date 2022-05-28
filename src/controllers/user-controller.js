const { userDTO } = require("../models/DTOs")
const userDAO = require("./DAOs/userDAO")
const loggers = require("../models/Logs").getLogger('console')
const bcrypt = require("bcrypt")

// cookies

// jwt
const jwt = require("jsonwebtoken")

async function register(req, res) {
    const { name, email, password } = req.body
    const errors = []

    // empty input
    if(!name || !email || !password) {
        errors.push({ msg: "please fill all fields"})
    }

    if(password < 6) {
        errors.push({ msg: "Password should be at least 6 characters"})
    }

    if(errors.length > 0) {
        res.render("index", {
            errors,
            name,
            email,
            password
        })
    } else {
        // validate email
        if(!userDAO.getByEmail(email)) {
            errors.push({ msg: "Email is already exist" })
            res.render("index", {
                errors,
                name,
                email,
                password
            })
        } else {
            const userDto = new userDTO(req.body)
            const accessToken = jwt.sign(userDto.id, process.env.ACCESS_TOKEN_SECRET)
            res.cookie("user", accessToken)
            userDAO.newUser(userDto)
            res.redirect("/main")
        }
    }
}

async function login(req, res) {
    const { email, password } = req.body
    const errors = []

    if(!email || !password) {
        errors.push('Fill all fields')
        res.render("index", {
            errors,
            email,
            password
        })
    } else {
        await userDAO.getByEmail(email)
            .then(user => {
                if(user.email) {
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(isMatch) {
                            res.cookie("user", user.id)
                            res.redirect("/main")
                        }
                    })
                } else {
                    errors.push({ msg: 'User dont exist' })
                    res.render("index", {
                         errors,
                         email,
                         password
                    })
                }
            })
    }
}

async function editUser(req, res) {
    await userDAO.editUser(req.body)
}

async function deleteUser(req, res) {
    await userDAO.deleteOne(res.cookies.user)
}

async function logOut(req, res) {
    res.clearCookie("user")
    res.redirect("/")
}


module.exports = {
    register,
    login,
    editUser,
    deleteUser,
    logOut
}