const chatDAO = require("../controllers/DAOs/chatDAO")

function socket(io) {
    io.on('connection', (socket) => {
        console.log('User is connected')
        socket.on('message', (data) => {
            chatDAO.addMsg(data)
        })
    })
}

module.exports = socket