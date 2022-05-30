require("dotenv").config()
const express = require("express")
const path = require("path")
const app = express()
const cookiesParser = require("cookie-parser")
const http = require("http")
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)

// settings
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// cookies
app.use(cookiesParser())

// EJS
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

// Mongo Atlas
const mongoose = require("mongoose")
mongoose.connect(String(process.env.MONGO_URI), {
    useUnifiedTopology: true
}, () => {
    console.log('MongoDB connected...')
})

// routes
const index = require("./routes/index")
const user = require("./routes/user")
const product = require("./routes/product")
const cart = require("./routes/cart")
const order = require("./routes/order")

app.use("/", index)
app.use("/", user)
app.use("/", product)
app.use("/", cart)
app.use("/", order)


// socket
const socket = require("./socket/socket")

socket(io)

// Server listening
const cluster = require("cluster")
const numCPUs = require('os').cpus().length
const PORT = process.env.PORT || 8080

/*if(cluster.isMaster) {
    console.log(`Master ${process.pid} is running`)

    // workers
    for(let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`)
    })
} else {
        app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}*/

server.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})