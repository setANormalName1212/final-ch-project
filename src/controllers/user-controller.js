const { userDTO } = require("../models/DTOs")
const userDAO = require("./DAOs/userDAO")
const loggers = require("../models/Logs").getLogger('console')

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
            userDAO.newUser(userDto)
                .then(res => {
                    if(res) {
                        res.redirect("/main")
                        loggers.info('New registered user')
                    }
                })
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
            .then(res => {
                if(res.email) {
                    res.cookie("user", res.id)
                    res.redirect('/main')
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

}

async function deleteUser(req, res) {
    await userDAO.deleteOne(res.cookies.user)
}


module.exports = {
    register,
    login,
    editUser,
    deleteUser
}