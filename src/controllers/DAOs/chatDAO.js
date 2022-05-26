const chatDB = require("../../models/Chat")

class chatDAO {
    async addMsg(msg) {
        const FyH = new Date()
        await chatDB.updateOne(msg.chatID, { $push: { 
            messagess: {
                name: msg.name,
                txt: msg.txt,
                time: FyH.getHours() + ":" + (FyH.getMinutes() + 1) + ":" + FyH.getSeconds()
            }
         }})
    }

    async getMsg(chatID) {
        return await chatDB.findById(chatID)
            .then(chat => {
                return chat
            })
    }
}

const chat = new chatDAO()

module.exports = chat