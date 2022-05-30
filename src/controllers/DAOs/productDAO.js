const productDB = require("../../models/Product")
const chatDB = require("../../models/Chat")
const { productDTO } = require("../../models/DTOs")

class productDAO {
    async getAll() {
        const products = await productDB.find()
        const productsDTO = products.map(product => {
            const productDto = new productDTO(product)
            return productDto
        })
        return productsDTO
    }

    async getByCategory(category) {
        return await productDB.find()
            .then(products => {
                const sendProducts = []
                products.forEach((item) => {
                    if(item.stock < 50) {
                        sendProducts.push(item)
                    }
                })
                return sendProducts
            })
    }

    async getOne(id) {
        try {
            const product = await productDB.findById(id)
            const productDto = new productDTO(product)
            return productDto
        } catch(e) {
            throw e
        }
    }

    newProduct(product) {
        try {
            const chat = new chatDB()
            chat.save((err, res) => {
                const newProduct = new productDB({
                    title: product.title,
                    price: product.price,
                    description: product.description,
                    thumbnail: product.thumbnail,
                    stock: product.stock,
                    category: product.category,
                    chatID: res.id
                })
    
                newProduct.save()
            })
        } catch (e) {
            throw e
        }
    }

    deleteOne(id) {
        return productDB.deleteOne({ _id: id })
    }

    async deleteAll() {
        return await productDB.deleteMany()
    }

    async updateOne(id, updateProduct) {
        await productDB.updateOne({ _id: id }, updateProduct)
    }
}

const product = new productDAO()

module.exports = product