// backend/routes/products.js
const express = require('express')
const router = express.Router()
const Product = require('../models/Product')

// GET all products by category
router.get('/:category', async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category })
    res.json({ name: req.params.category, products })
  } catch (e) {
    res.status(500).json({ error: 'Server error' })
  }
})

// GET single product by category and id
router.get('/:category/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, category: req.params.category })
    if (!product) return res.status(404).json({ error: 'Not found' })
    res.json(product)
  } catch (e) {
    res.status(500).json({ error: 'Server error' })
  }
})

// GET single product by ID (regardless of category)
router.get('/id/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ error: 'Not found' })
    res.json({ product })
  } catch (e) {
    res.status(500).json({ error: 'Server error' })
  }
})

module.exports = router
