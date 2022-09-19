const { userDTO } = require("../models/DTOs")
const userDAO = require("./DAOs/userDAO")
const loggers = require("../models/Logs").getLogger('console')
const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")

// Nodemailer
const transporter = require("../config/mailer")

async function register(req, res) {
    const { name, email, phone, password, password2 } = req.body
    const errors = []

    // empty input
    if(!name || !email || !phone || !password || !password2) {
        errors.push({ msg: "please fill all fields"})
    }

    if(password < 6) {
        errors.push({ msg: "Password should be at least 6 characters"})
    }
    if(password !== password2) {
        errors.push({ msg: "Password should be equal to Password 2"})
    }

    if(errors.length > 0) {
        res.render("index", {
            errors,
            name,
            email,
            phone,
            password,
            password2
        })
    } else {
        // validate email
        if(!userDAO.getByEmail(email)) {
            errors.push({ msg: "Email is already exist" })
            res.render("index", {
                errors,
                name,
                email,
                phone,
                password,
                password2
            })
        } else {
            userDAO.newUser(req.body)
            res.redirect("/")
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
                if(!user) {
                    errors.push({ msg: 'User dont exist' })
                    res.render("index", {
                        errors,
                        email,
                        password
                    })
                } else {
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(isMatch) {
                            const accessToken = jwt.sign(user.id, process.env.ACCESS_TOKEN_SECRET)
                            res.cookie("user", accessToken)
                            res.redirect("/main")
                        } else {
                            res.redirect("/")
                        }
                    })
                }
            })
    }
}

async function editUser(req, res) {
    const { name, email, password } = req.body
    const errors = []
        
    userDAO.getOneById(req.user)
        .then(user => {
            // Fill input
            if( !name || !email || !password) {
                errors.push({ msg: "Fill all fileds"})
            }

            // password length
            if(password.length > 6) {
                errors.push({ msg: "Password should be 6 characters"})
            }
            
            // errors length
            if(errors.length > 0){
                res.render("config", {
                    errors,
                    user
                })
            } else {
                userDAO.updateOne(user.id, req.body)
                    .then(res.redirect("/main"))
            }
        })
}

async function recoveryUser(req, res) {
    const { email } = req.body
    await userDAO.getByEmail(email)
        .then(user => {
            transporter.sendMail({
                from: '"Forgot password 👻" coderHouse-final-project', // sender address
                to: user.email, // list of receivers
                subject: "Forgot password", // Subject line
                html: `
                    <h3>You dumb! dont forget your password</h3>
                    <a href="http://localhost:8080/user/password/${user.id}">Recover my account</a>
                `, // html body
            }).then(() => {
                res.redirect("/")
            })
        })
}

async function newPassword(req, res) {
    const { password, password2 } = req.body
    const errors = []

    userDAO.getOneById(req.params.id)
            .then(user => {
                // password length
                if(password > 6) {
                errors.push({ msg: "Password should be at least 6 characters" })
                }

                // isEqual
                if(password !== password2) {
                errors.push({ msg: "passwords needs to be equal" })
                }

                if(errors > 0) {
                    res.render("password", {
                        errors,
                        user
                    })
                } else {
                    userDAO.newPassword(user.id, password)
                        .then(res.redirect("/"))
                }
            })
}

async function deleteUser(req, res) {
    await userDAO.deleteOne(res.cookies.user)
        .then(result => {
            res.clearCookie("user")
            res.redirect("/")
        })
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
    logOut,
    newPassword,
    recoveryUser
}