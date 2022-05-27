const chatDB = require("../../models/Chat")
const userDB = require("../../models/User")

const date = new Date()

class chatDAO {

    async addMsg(data) {
        const user = await userDB.findById(data.userID)
        await chatDB.find()
            .then(res => {
                chatDB.updateOne({ _id: res[0].id}, { $push: { messagess: {

                    email: user.email,
                    txt: data.txt,
                    time: date.getHours() + ":" + date.getMinutes()
                }}})
                    .then(res)
            })
    }
}

const chat = new chatDAO()

module.exports = chat