const chatDAO = require("../controllers/DAOs/chatDAO")

// date
const date = new Date()

function socket(io) {
    io.on('connection', (socket) => {
        console.log('User is connected')

        chatDAO.getChat()
                .then(res => {
                    io.sockets.emit('server:messages', res)
                })

        socket.on('client:message', (data) => {
            chatDAO.addMsg(data)
            chatDAO.sendMsg(data)
                .then(res => {
                    const isAdmin = (res.email === "federicofigueroa011@gmail.com") ? "isAdmin": res.email
                    const user = {
                        email: isAdmin,
                        txt: data.txt,
                        time: date.getHours() + ":" + date.getMinutes()
                    }
                    socket.emit('server:newmessage', user)
                })
        })
    })
}

module.exports = socket