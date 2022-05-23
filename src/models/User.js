const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    isBlock: {
        type: Boolean,
        default: false
    },
    cartID: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model("users", userSchema)