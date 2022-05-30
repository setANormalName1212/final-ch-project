const cartDB = require("../../models/Cart")
const productDB = require("../../models/Product")
const userDB = require("../../models/User")

// cartDTO
const cartDTO = require("../../models/DTOs")

class cartDAO {
    async getOne(id) {
        return await cartDB.findById(id)
            .then(cart => {
                return cart.productIDs
            })
    }

    async deleteOne(cartID, id) {
        await cartDB.updateOne({ _id: cartID }, { $pull: {
            productIDs: { id: id }
        }})
    }

    async add(cart, productID, quantity) {
        return await productDB.findById(productID)
            .then(res => {
                if(!quantity) {
                    return cartDB.updateOne({ _id: cart}, { $push: { productIDs: {
                        id: res.id,
                        title: res.title,
                        price: res.price,
                        quantity: 1
                    }}})
                }
            })
    }
}

// cartDAO
const cart = new cartDAO()

module.exports = cart