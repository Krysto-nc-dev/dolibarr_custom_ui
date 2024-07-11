import { populate } from 'dotenv'
import asyncHandler from '../middleware/asyncHandler.js'
import PlasticColor from '../models/plasticColorModel.js'

// @desc    Get all plastic colors
// @route   GET /api/plasticColors
// @access  Public
const getPlasticColors = asyncHandler(async (req, res) => {
  const plasticColors = await PlasticColor.find()
  res.status(200).json(plasticColors)
})

// @desc    Create a new plastic color
// @route   POST /api/plasticColors
// @access  Public
const createPlasticColor = asyncHandler(async (req, res) => {
  const { name, photo } = req.body

  const plasticColor = new PlasticColor({
    name,
    photo,
  })

  const createdPlasticColor = await plasticColor.save()
  res.status(201).json(createdPlasticColor)
})

// @desc    Get plastic color by ID
// @route   GET /api/plasticColors/:id
// @access  Public
const getPlasticColorById = asyncHandler(async (req, res) => {
  const plasticColor = await PlasticColor.findById(req.params.id)

  if (plasticColor) {
    res.status(200).json(plasticColor)
  } else {
    res.status(404)
    throw new Error('Plastic color not found')
  }
})

// @desc    Update plastic color
// @route   PUT /api/plasticColors/:id
// @access  Public
const updatePlasticColor = asyncHandler(async (req, res) => {
  const { name, photo } = req.body

  const plasticColor = await PlasticColor.findById(req.params.id)

  if (plasticColor) {
    plasticColor.name = name || plasticColor.name
    plasticColor.photo = photo || plasticColor.photo

    const updatedPlasticColor = await plasticColor.save()
    res.status(200).json(updatedPlasticColor)
  } else {
    res.status(404)
    throw new Error('Plastic color not found')
  }
})

// @desc    Delete plastic color
// @route   DELETE /api/plasticColors/:id
// @access  Public
const deletePlasticColor = asyncHandler(async (req, res) => {
  const plasticColor = await PlasticColor.findById(req.params.id)

  if (plasticColor) {
    await plasticColor.deleteOne()
    res.status(200).json({ message: 'Plastic color removed' })
  } else {
    res.status(404)
    throw new Error('Plastic color not found')
  }
})

export {
  getPlasticColors,
  createPlasticColor,
  getPlasticColorById,
  updatePlasticColor,
  deletePlasticColor,
}
