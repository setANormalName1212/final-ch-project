const orderDB = require("../../models/Order")
const cartDB = require("../../models/Cart")
const userDB = require("../../models/User")

class orderDAO {
    async createOrder(id, items, email) {
        return await userDB.findById(id)
            .then(user => {
                orderDB.find()
                    .then(orders => {
                        const orderLength = orders.length + 1
                        const newOrder = new orderDB({
                            items,
                            orderN: orderLength,
                            date: new Date(),
                            email: email
                        })

                        newOrder.save()
                        userDB.updateOne({ _id: user.id}, { $push: { orderIDs: newOrder.id }})
                    })
            })
    }
}

const order = new orderDAO()

module.exports = order