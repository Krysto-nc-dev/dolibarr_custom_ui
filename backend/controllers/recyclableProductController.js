import asyncHandler from '../middleware/asyncHandler.js'
import RecyclableProduct from '../models/recyclableProductModel.js'
import ErrorResponse from '../utils/errorResponse.js'

// @desc Get all recyclable products
// @route GET /api/recyclable-products
// @access Public
const getRecyclableProducts = asyncHandler(async (req, res) => {
  const products = await RecyclableProduct.find()
  res.status(200).json(products)
})

// @desc Get recyclable product by ID
// @route GET /api/recyclable-products/:id
// @access Public
const getRecyclableProductById = asyncHandler(async (req, res) => {
  const product = await RecyclableProduct.findById(req.params.id)

  if (!product) {
    res.status(404)
    throw new Error('Produit introuvable')
  }

  res.status(200).json(product)
})

// @desc Create new recyclable product
// @route POST /api/recyclable-products
// @access Private/Admin
const createRecyclableProduct = asyncHandler(async (req, res) => {
  const {
    name,
    brand,
    plastic_types,
    colors,
    weightGr,
    description,
    recyclingNote,
    photo,
    barCode,
  } = req.body

  const productExists = await RecyclableProduct.findOne({ name })

  if (productExists) {
    res.status(400)
    throw new Error('Ce produit existe déjà')
  }

  const product = await RecyclableProduct.create({
    name,
    brand,
    plastic_types,
    colors,
    weightGr,
    description,
    recyclingNote,
    photo,
    barCode,
  })

  res.status(201).json(product)
})

// @desc Update recyclable product
// @route PUT /api/recyclable-products/:id
// @access Private/Admin
const updateRecyclableProduct = asyncHandler(async (req, res) => {
  const product = await RecyclableProduct.findById(req.params.id)

  if (!product) {
    res.status(404)
    throw new Error('Produit introuvable')
  }

  product.name = req.body.name || product.name
  product.brand = req.body.brand || product.brand
  product.plastic_types = req.body.plastic_types || product.plastic_types
  product.colors = req.body.colors || product.colors
  product.weightGr = req.body.weightGr || product.weightGr
  product.description = req.body.description || product.description
  product.recyclingNote = req.body.recyclingNote || product.recyclingNote
  product.photo = req.body.photo || product.photo
  product.barCode = req.body.barCode || product.barCode

  const updatedProduct = await product.save()
  res.status(200).json(updatedProduct)
})

// @desc Delete recyclable product
// @route DELETE /api/recyclable-products/:id
// @access Private/Admin
const deleteRecyclableProduct = asyncHandler(async (req, res) => {
  const product = await RecyclableProduct.findById(req.params.id)

  if (!product) {
    res.status(404)
    throw new Error('Produit introuvable')
  }

  await product.remove()
  res.status(200).json({ message: 'Produit supprimé' })
})

export {
  getRecyclableProducts,
  getRecyclableProductById,
  createRecyclableProduct,
  updateRecyclableProduct,
  deleteRecyclableProduct,
}
