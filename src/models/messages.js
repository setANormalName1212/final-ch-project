const mongoose = require("mongoose")
const Schema = mongoose.Schema

const messagesSchema = new Schema({
    name: String,
    msg: String
})

module.exports = mongoose.model("messages", messagesSchema)