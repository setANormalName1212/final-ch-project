const express = require("express")
const path = require("path")
const app = express()
require("dotenv").config()

// EJS
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

// Mongo Atlas
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true
}, () => {
    console.log('MongoDB connected...')
})

// routes
const index = require("./routes/index")

app.use("/", index)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Server listening
const cluster = require("cluster")
const numCPUs = require('os').cpus().length
const PORT = process.env.PORT || 8080

if(cluster.isMaster) {
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
}

