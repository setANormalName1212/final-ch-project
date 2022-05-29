const chatDB = require("../../models/Chat")
const userDB = require("../../models/User")

const date = new Date()

// JWT
const jwt = require("jsonwebtoken")

class chatDAO {
    async addMsg(data) {
        jwt.verify(data.userID, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            userDB.findById(user)
                .then(User => {
                    chatDB.find()
                        .then(chat => {
                            return chatDB.updateOne({ _id: chat[0].id}, { $push: { messagess: {
                                email: (User.email === "federicofigueroa011@gmail.com") ? "Admin" : User.email,
                                txt: data.txt,
                                time: date.getHours() + ":" + date.getMinutes()
                            }}})
                        })
                })
        })
    }

    async getChat() {
        return await chatDB.find()
            .then(res => {
                return res[0].messagess
            })
    }

    async sendMsg(data) {
        return jwt.verify(data.userID, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            return userDB.findById(user)
                .then(res => {
                    return res
                })
        })
    }
}

const chat = new chatDAO()

module.exports = chat