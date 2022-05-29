const mongoose = require("mongoose")
const Schema = mongoose.Schema

const productSchema = new Schema({
    title: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number
    },
    description: String,
    thumbnail: String,
    stock: {
        default: 1,
        type: Number
    },
    category: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model("products", productSchema)