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
            return await userDB.findOne({ email: email})
                .then(user => {
                    return user
                })
        } catch(e) {
            throw e
        }
    }

    async newUser(user) {
        try {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(user.password, salt, (err, hash) => {
                    if(err) throw err

                    // hash
                    user.password = hash

                    const cart = new cartDB()

                    cart.save((err, res) => {
                        const newUser = new userDB({
                            name: user.name,
                            email: user.email,
                            password: user.password,
                            cartID: cart.id,
                            phone: user.phone
                        })
                        newUser.save()
                        })
                    })
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

    async updateOne(id, data) {
        try {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(data.password, salt, (err, hash) => {
                    if(err) throw err

                    // hash
                    data.password = hash
                    userDB.updateOne({ _id: id}, data)
                })
            })
        } catch(e) {
            throw e
        }
    }

    async newPassword(id, password) {
        try{
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, async (err, hash) => {
                    if(err) throw err

                    // hash
                    password = hash
                    await userDB.updateOne({ _id: id }, { password: password})
                })
            })
        } catch(e) {
            throw e
        }
    }
}

const user = new userDAO()

module.exports = user