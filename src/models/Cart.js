const mongoose = require("mongoose")
const Schema = mongoose.Schema

const cartSchema = new Schema({
    productIDs: Array
})

const cartDB = mongoose.model("carts", cartSchema)

class cartDAO {

    getAll() {

    }

    getOne() {

    }

    newUser() {

    }

    deleteOne() {

    }

    deleteAll() {

    }

    updateOne() {
        
    }

}