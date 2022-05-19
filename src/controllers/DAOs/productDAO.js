const productDB = require("../../models/Product")
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

    async getOne(id) {
        try {
            const product = await productDB.findById(productDTO.id)
            const productDto = new productDTO(product)
            return productDto
        } catch(e) {
            throw e
        }
    }

    newProduct(product) {
        try {
            const newProduct = new productDB({
                title: product.title,
                price: product.price,
                description: product.description,
                thumbnail: product.thumbnail,
                stock: product.stock
            })

            newProduct.save()
        } catch (e) {
            throw e
        }
    }

    deleteOne(id) {
        return productDB.deleteOne(id)
    }

    deleteAll() {

    }

    updateOne(id, updateProduct) {
        
    }
}