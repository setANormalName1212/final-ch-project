const cartDB = require("../../models/Cart")

// cartDTO
const cartDTO = require("../../models/DTOs")

class cartDAO {
    async getOne(id) {
        return await cartDB.findById(id)
            .then(cart => {
                return productDB.find({ _id: { $in: cart.productIDs } })
            })
    }

    async deleteOne(cartID, idProd) {
        await cartDB.updateOne({ _id: cartID }, { $pull: { productIDs: idProd } })
    }

    async add(cartID, productID, quantity) {
        await cartDB.updateOne({ _id: cartID }, { $push: { productIDs: productID } })
    }

    async deleteAll() {

    }

    async updateOne() {
        
    }

}

// cartDAO
const cart = new cartDAO()

module.exports = cart