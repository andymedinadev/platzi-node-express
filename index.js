const express = require('express')
const { faker } = require('@faker-js/faker')

const app = express()
const port = 3000

app.get('/products', (req, res) => {
  const products = []

  const { size } = req.query
  const limit = size || 5

  for (let i = 0; i < limit; i++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price()),
      image: faker.image.urlPicsumPhotos()
    })
  }
  res.json(products)
})

app.get('/products/filter', (req, res) => {
  res.send('Test')
})

app.get('/products/:id', (req, res) => {
  const { id } = req.params
  res.json({
    id,
    name: 'Product2',
    price: 200
  })
})

app.get('/products/test', (req, res) => {
  res.send('No funciona')
})

app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params
  res.json({
    category: categoryId,
    product: productId
  })
})

app.get('/users', (req, res) => {
  const { limit, offset } = req.query

  if (limit && offset) {
    res.json({
      limit, offset
    })
  } else {
    res.send('No hay parametros')
  }
})

app.get('/', (req, res) => {
  res.send('Server en express')
})

app.listen(port, () => {
  console.log('Puerto abierto en ' + port)
})
