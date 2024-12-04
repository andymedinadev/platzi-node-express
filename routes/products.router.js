const express = require('express')
const ProductsService = require('../services/products.service')

const router = express.Router()
const service = new ProductsService()

router.get('/', async (req, res) => {
  const products = await service.find()

  res.json(products)
})

router.get('/filter', async (req, res) => {
  res.send('Test')
})

router.get('/:id', async (req, res) => {
  const { id } = req.params

  const product = await service.findOne(id)

  if (!product) return

  res.status(200).json(product)
})

router.post('/', async (req, res) => {
  const body = req.body

  const newProduct = await service.create(body)

  res.status(201).json({
    message: 'created',
    data: newProduct
  })
})

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const body = req.body

    const newProduct = await service.update(id, body)

    res.json({
      message: 'Product updated',
      data: newProduct
    })
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const result = await service.delete(id)

    res.status(200).json(result)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
})

module.exports = router
