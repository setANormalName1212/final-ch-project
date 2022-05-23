const cartDB = require("../../models/Cart")
const productDB = require("../../models/Product")
const userDB = require("../../models/User")

// cartDTO
const cartDTO = require("../../models/DTOs")

class cartDAO {
    async getOne(id) {
        userDB.findById(id)
            .then(res => {
                cartDB.findById(res.cartID)
                    .then(cart => {
                        return productDB.find({ _id: { $in: cart.productIDs } })
                    })
            })
    }

    async deleteOne(cartID, idProd) {
        await cartDB.updateOne({ _id: cartID }, { $pull: { productIDs: idProd } })
    }

    async add(cartID, productID, quantity) {
        await cartDB.updateOne({ _id: cartID }, { $push: { productIDs: productID } })
    }
}

// cartDAO
const cart = new cartDAO()

module.exports = cart