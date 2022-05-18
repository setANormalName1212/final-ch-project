const express = require("express")
const path = require("path")
const app = express()

// EJS
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

// routes
const index = require("./routes/index")

app.use("/", index)

// Server listening
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})