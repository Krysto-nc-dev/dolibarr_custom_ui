import asyncHandler from '../middleware/asyncHandler.js'

import Collecte from '../models/CollecteModel.js'

// @desc    Get all collecte details
// @route   GET /api/collectes/details
// @access  Public
const getAllCollecteDetails = asyncHandler(async (req, res) => {
  const collecteDetails = await CollecteDetails.find()
  res.status(200).json(collecteDetails)
})

// @desc    Get collecte details by ID
// @route   GET /api/collectes/details/:id
// @access  Public
const getCollecteDetailsById = asyncHandler(async (req, res) => {
  const collecteDetail = await CollecteDetails.findById(req.params.id)

  if (collecteDetail) {
    res.status(200).json(collecteDetail)
  } else {
    res.status(404)
    throw new Error('Collecte detail not found')
  }
})

// @desc    Get collecte details by collecteId
// @route   GET /api/collectes/:collecteId/details
// @access  Public
const getCollecteDetailsByCollecteId = asyncHandler(async (req, res) => {
  const { collecteId } = req.params

  // Check if collecte exists first
  const collecte = await Collecte.findById(collecteId)
  if (!collecte) {
    res.status(404)
    throw new Error('Collecte not found')
  }

  // Find collecte details for the specific collecte
  const collecteDetails = await CollecteDetails.find({ collecteId })
  res.status(200).json(collecteDetails)
})

// @desc    Create a new collecte detail
// @route   POST /api/collectes/details
// @access  Public
const createCollecteDetail = asyncHandler(async (req, res) => {
  const { collecteId, plasticWeightKg, plasticType, plasticColor } = req.body

  // Create a new collecte detail
  const newCollecteDetail = new CollecteDetails({
    collecteId,
    plasticWeightKg,
    plasticType,
    plasticColor,
  })

  // Save the new collecte detail to the database
  const createdCollecteDetail = await newCollecteDetail.save()
  res.status(201).json(createdCollecteDetail)
})

// @desc    Add collecte details
// @route   POST /api/collectes/:collecteId/details
// @access  Public
const addCollecteDetails = asyncHandler(async (req, res) => {
  const { collecteId } = req.params
  const { plasticWeightKg, plasticType, plasticColor, dateTime } = req.body

  // Check if collecte exists first
  const collecte = await Collecte.findById(collecteId)
  if (!collecte) {
    res.status(404)
    throw new Error('Collecte not found')
  }

  // Create a new collecte detail
  const newCollecteDetails = new CollecteDetails({
    collecteId,
    plasticWeightKg,
    plasticType,
    plasticColor,
    dateTime,
  })

  // Save the new collecte detail to the database
  const createdCollecteDetails = await newCollecteDetails.save()
  res.status(201).json(createdCollecteDetails)
})

// @desc    Update collecte details
// @route   PUT /api/collectes/details/:id
// @access  Public
const updateCollecteDetails = asyncHandler(async (req, res) => {
  const collecteDetailId = req.params.id
  const { plasticWeightKg, plasticType, plasticColor, dateTime } = req.body

  // Check if the collecte detail exists first
  let collecteDetail = await CollecteDetails.findById(collecteDetailId)
  if (!collecteDetail) {
    res.status(404)
    throw new Error('Collecte detail not found')
  }

  // Update the fields of the collecte detail
  collecteDetail.plasticWeightKg = plasticWeightKg
  collecteDetail.plasticType = plasticType
  collecteDetail.plasticColor = plasticColor
  collecteDetail.dateTime = dateTime

  // Save the modifications to the database
  collecteDetail = await collecteDetail.save()
  res.status(200).json(collecteDetail)
})

// @desc    Delete collecte details
// @route   DELETE /api/collectes/details/:id
// @access  Public
const deleteCollecteDetails = asyncHandler(async (req, res) => {
  const collecteDetailId = req.params.id

  // Check if the collecte detail exists first
  const collecteDetail = await CollecteDetails.findById(collecteDetailId)
  if (!collecteDetail) {
    res.status(404)
    throw new Error('Collecte detail not found')
  }

  // Remove the collecte detail from the database
  await collecteDetail.remove()
  res.status(200).json({ message: 'Collecte detail removed' })
})

export {
  getAllCollecteDetails,
  getCollecteDetailsById,
  getCollecteDetailsByCollecteId,
  createCollecteDetail,
  addCollecteDetails,
  updateCollecteDetails,
  deleteCollecteDetails,
}
