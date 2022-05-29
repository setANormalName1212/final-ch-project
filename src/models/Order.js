const mongoose = require("mongoose")
const Schema = mongoose.Schema

const orderSchema = new Schema({
    items: {
        required: true,
        type: Array
    },
    orderN: {
        required: true,
        type: Number
    },
    date: String,
    state: {
        default: "done",
        type: String
    },
    email: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model("orders", orderSchema)