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

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params

    const product = await service.findOne(id)

    res.status(200).json(product)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res) => {
  const body = req.body

  const newProduct = await service.create(body)

  res.status(201).json({
    message: 'created',
    data: newProduct
  })
})

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const body = req.body

    const newProduct = await service.update(id, body)

    res.json({
      message: 'Product updated',
      data: newProduct
    })
  } catch (error) {
    next(error)
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
