import asyncHandler from '../middleware/asyncHandler.js'
import Veille from '../models/veilleModel.js'

// @desc    Get all veilles
// @route   GET /api/veilles
// @access  Public
const getVeilles = asyncHandler(async (req, res) => {
  const veilles = await Veille.find()
  res.status(200).json(veilles)
})

// @desc    Create a new veille
// @route   POST /api/veilles
// @access  Public
const createVeille = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    user,
    type,
    categories,
    tags,
    url,
    source,
    lang,
    photo,
  } = req.body

  const veille = new Veille({
    title,
    description,
    user,
    type,
    categories,
    tags,
    url,
    source,
    lang,
    photo,
  })

  const createdVeille = await veille.save()
  res.status(201).json(createdVeille)
})

// @desc    Get veille by ID
// @route   GET /api/veilles/:id
// @access  Public
const getVeilleById = asyncHandler(async (req, res) => {
  const veille = await Veille.findById(req.params.id)

  if (veille) {
    res.status(200).json(veille)
  } else {
    res.status(404)
    throw new Error('Veille not found')
  }
})

// @desc    Update veille
// @route   PUT /api/veilles/:id
// @access  Public
const updateVeille = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    user,
    type,
    categories,
    tags,
    url,
    source,
    lang,
    photo,
  } = req.body

  const veille = await Veille.findById(req.params.id)

  if (veille) {
    veille.title = title || veille.title
    veille.description = description || veille.description
    veille.user = user || veille.user
    veille.type = type || veille.type
    veille.categories = categories || veille.categories
    veille.tags = tags || veille.tags
    veille.url = url || veille.url
    veille.source = source || veille.source
    veille.lang = lang || veille.lang
    veille.photo = photo || veille.photo

    const updatedVeille = await veille.save()
    res.status(200).json(updatedVeille)
  } else {
    res.status(404)
    throw new Error('Veille not found')
  }
})

// @desc    Delete veille
// @route   DELETE /api/veilles/:id
// @access  Public
const deleteVeille = asyncHandler(async (req, res) => {
  const veille = await Veille.findById(req.params.id)

  if (veille) {
    await veille.deleteOne()
    res.status(200).json({ message: 'Veille removed' })
  } else {
    res.status(404)
    throw new Error('Veille not found')
  }
})

export { getVeilles, createVeille, getVeilleById, updateVeille, deleteVeille }
