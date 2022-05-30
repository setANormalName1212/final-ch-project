const cartDB = require("../../models/Cart")
const productDB = require("../../models/Product")
const userDB = require("../../models/User")

// cartDTO
const cartDTO = require("../../models/DTOs")

class cartDAO {
    async getOne(id) {
        return await cartDB.findById(id)
            .then(cart => {
                return productDB.find({ _id: { $in: cart.productIDs } })
            })
    }

    async deleteOne(cartID, id) {
        await cartDB.updateOne({ _id: cartID }, { $pull: {
            productIDs: { product: id }
        }})
    }

    async add(cartID, productID, quantity) {
        if(!quantity) {
            await cartDB.updateOne({ _id: cartID }, { $push: { productIDs: { product: productID, quantity: 1 } } })
        }
    }
}

// cartDAO
const cart = new cartDAO()

module.exports = cart