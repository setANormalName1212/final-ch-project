const userDB = require("../../models/User")
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

    async getOne(id) {
        try {
            const user = await userDB.findById(id)
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

            const newUser = new userDB({
                name: user.name,
                email: user.email,
                password: cryptPassword
            })
            
            newUser.save()
        } catch(e) {
            throw e
        }
    }

    async deleteOne(id) {
        try {
            await userDB.deleteOne(id)
                .then(console.log("Product deleted"))
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

const user = new userDAO

module.exports = user