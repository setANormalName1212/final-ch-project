const mongoose = require("mongoose")
const Schema = mongoose.Schema

const cartSchema = new Schema({
    productIDs: Array
})

module.exports = mongoose.model("carts", cartSchema)