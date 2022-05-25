const mongoose = require("mongoose")
const Schema = mongoose.Schema

const chatSchema = new Schema({
    messagess: Array
})

module.exports = mongoose.model("chat", chatSchema)