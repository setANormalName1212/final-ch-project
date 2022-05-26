const cartDB = require("../../models/Cart")
const productDB = require("../../models/Product")
const userDB = require("../../models/User")

// cartDTO
const cartDTO = require("../../models/DTOs")

class cartDAO {
    async getOne(id) {
        return await userDB.findById(id)
            .then(res => {
                return cartDB.findById(res.cartID)
                    .then(cart => {
                        return productDB.find({ id: cart.productIDs })
                            .then(product => {
                                return product
                            })
                    })
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