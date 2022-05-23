const userDB = require("../../models/User")
const cartDB = require("../../models/Cart")

//
const { userDTO } = require("../../models/DTOs")

// resources
const bcrypt = require("bcrypt")

// Data Access Object
class userDAO {

    async getAll() {
        try {
            const users = await userDB.find()
            const usersDTO = users.map(user => {
                const userDto = new userDTO(user)
                return userDto
            })
            return usersDTO
        } catch(e) {
            throw e
        }
    }

    async getOneById(id) {
        try {
            const user = await userDB.findById(id)
            const userDto = new userDTO(user)
            return userDto
        } catch(e) {
            throw e
        }
    }

    async getByEmail(email) {
        try {
            const user = await userDB.findOne({ email: email})
                .then(res => {
                    return res
                })
            const userDto = new userDTO(user)
            return userDto
        } catch(e) {
            throw e
        }
    }

    async newUser(user) {
        try {
            const cryptPassword = () => {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(user.password, salt, (err, hash) => {
                        if(err) throw err

                        // hash
                        user.password = hash
                    })
                })
            }
            const cart = new cartDB()

            cart.save((err, res) => {
                const newUser = new userDB({
                    name: user.name,
                    email: user.email,
                    password: cryptPassword,
                    cartID: res.id
                })
                
                newUser.save()
                return true
            })
        } catch(e) {
            throw e
        }
    }

    async deleteOne(id) {
        try {
            return await userDB.findById(id)
                .then(res => {
                    cartDB.deleteOne(res.cartID)
                    userDB.deleteOne(id)
                })
        } catch(e) {
            throw e
        }
    }

    async deleteAll() {
        try {
            return userDB.deleteMany()
        } catch(e) {
            throw e
        }
    }

    async updateOne(id, user) {
        try {
            await userDB.updateOne(id, user)
        } catch(e) {
            throw e
        }
    }
}

const user = new userDAO()

module.exports = user