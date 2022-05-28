const chatDAO = require("../controllers/DAOs/chatDAO")

function socket(io) {
    io.on('connection', (socket) => {
        console.log('User is connected')

        chatDAO.getChat()
                .then(res => {
                    io.sockets.emit('chat:message', res)
                })

        socket.on('message', (data) => {
            chatDAO.addMsg(data)
        })
    })
}

module.exports = socket