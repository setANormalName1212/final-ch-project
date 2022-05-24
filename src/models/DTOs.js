class userDTO {
    constructor(data, cartID) {
        this.id = data.id
        this.name = data.name
        this.email =  data.email
        this.password = data.password
        this.isBlock = false
        this.cartID = cartID || data.cartID
    }
}

class productDTO {
    constructor(data) {
        this.id = data.id
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