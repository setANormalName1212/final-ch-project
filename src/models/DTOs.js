class userDTO {
    constructor(data, cartID) {
        this.name = data.name
        this.email =  data.email
        this.password = data.password
        this.isBlock = data.isBlock
        this.cartID = cartID
    }
}

class productDTO {
    constructor(data) {
        this.title = data.title
        this.price = data.price
        this.description = data.description
        this.thumbnail = data.thumbnail
        this.stock = data.stock
    }
}

class cartDTO {
    constructor(data) {
        this.products = data.products
    }
}

module.exports = {
    userDTO,
    productDTO,
    cartDTO
}