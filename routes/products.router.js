const express = require('express')
const { faker } = require('@faker-js/faker')

const router = express.Router()

router.get('/', (req, res) => {
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

router.get('/filter', (req, res) => {
  res.send('Test')
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  res.json({
    id,
    name: 'Product2',
    price: 200
  })
})

router.get('/test', (req, res) => {
  res.send('No funciona')
})

module.exports = router
