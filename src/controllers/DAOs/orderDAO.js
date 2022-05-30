const orderDB = require("../../models/Order")
const cartDB = require("../../models/Cart")
const userDB = require("../../models/User")
const productDB = require("../../models/Product")

class orderDAO {
    async createOrder(id) {
        return await userDB.findById(id)
            .then(user => {
                return cartDB.findById(user.cartID)
                    .then(cart => {
                        return productDB.find({ id: cart.productIDs})
                            .then(products => {
                                const order = []
                                const total = []
                                let totalNum = 0
                                for(let i = 0; i < cart.productIDs.length; i++) {
                                    order.push({
                                        title: products[i].title,
                                        price: products[i].price,
                                        quantity: cart.productIDs[i].quantity
                                    })
                                    total.push(products[i].price * cart.productIDs[i].quantity)
                                }

                                for(let i = 0; i < total.length; i++) {
                                    totalNum = totalNum + total[i] 
                                }
                                order.push({total: totalNum})
                                orderDB.find()
                                    .then(orders => {
                                        const orderLength = orders.length + 1
                                        const newOrder = new orderDB({
                                            items: order,
                                            orderN: orderLength,
                                            date: new Date(),
                                            email: user.email
                                        })
                                        
                                        userDB.updateOne(id, { $push: { orderIDs: newOrder.id } })

                                        newOrder.save()
                                    })
                            })
                    })
                    .then(cart => {
                        for(let i = 0; cart.productIDs.length; i++) {
                            cartDB.updateOne(user.cartID, { $pop: { productIDs: 1 } })
                        }
                    })
            })
    }

    async getOrders(id) {
        userDB.findById(id)
            .then(user => {
                return user.orderIDs
            })
    }
}

const order = new orderDAO()

module.exports = order