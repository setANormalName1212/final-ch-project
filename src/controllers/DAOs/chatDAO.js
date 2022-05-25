const chatDB = require("../../models/chat.js")

class chatDAO {
    async msg(msg) {
        chatDB.updateOne(msg.id, { $push: { messagess: { name: msg.name, txt: msg.txt } }})
    }
}

const chat = new chatDAO()

module.exports = chat