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
    phone: {
        required: true,
        type: Number
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
    },
    orderIDs: {
        type: Array
    }
})

module.exports = mongoose.model("users", userSchema)