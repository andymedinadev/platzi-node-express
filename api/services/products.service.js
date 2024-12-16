const { faker } = require('@faker-js/faker')
const boom = require('@hapi/boom')

class ProductsService {
  constructor () {
    this.products = []
    this.generate()
  }

  generate () {
    const limit = 50

    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()),
        image: faker.image.urlPicsumPhotos(),
        isBlocked: faker.datatype.boolean()
      })
    }
  }

  async create (data) {
    const newProduct = { id: faker.string.uuid(), ...data }

    this.products.push(newProduct)

    return newProduct
  }

  find () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products)
      }, 3000)
    })
  }

  async findOne (id) {
    const product = this.products.find(item => item.id === id)
    if (!product) {
      throw boom.notFound('Product not found')
    }
    if (product.isBlocked) {
      throw boom.conflict('Product is blocked')
    }
    return product
  }

  async update (id, changes) {
    const index = this.products.findIndex(item => item.id === id)

    if (index === -1) {
      throw boom.notFound('Product not found')
    }

    const originalProduct = this.products[index]

    const newProduct = { ...originalProduct, ...changes }

    this.products[index] = newProduct

    return newProduct
  }

  async delete (id) {
    const index = this.products.findIndex(item => item.id === id)

    if (index === -1) {
      throw boom.notFound('Product not found')
    }

    const [deletedProduct] = this.products.splice(index, 1)

    return { message: 'Product deleted', deletedProduct }
  }
}

module.exports = ProductsService
