const orderDB = require("../../models/Order")
const cartDB = require("../../models/Cart")

class orderDAO {
    async createOrder(items, email) {
        await orderDB.find()
            .then(orders => {
                const orderLength = orders.length + 1
                const newOrder = new orderDB({
                    items,
                    orderN: orderLength,
                    date: new Date(),
                    email: email
                })

                newOrder.save()
            })
        
    }
}

const order = new orderDAO()

module.exports = order