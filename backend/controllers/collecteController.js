import asyncHandler from '../middleware/asyncHandler.js'
import Collecte from '../models/CollecteModel.js'

// @desc    Get all collectes
// @route   GET /api/collectes
// @access  Public
const getCollectes = asyncHandler(async (req, res) => {
  const collectes = await Collecte.find()
  res.status(200).json(collectes)
})

// @desc    Create a new collecte
// @route   POST /api/collectes
// @access  Public
const createCollecte = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    dollibarTierId,
    collectionType,
    contract,
    recurring,
    frequency,
    startDate,
    endDate,
    status,
    address,
    createdBy,
  } = req.body

  const collecte = new Collecte({
    title,
    description,
    dollibarTierId,
    collectionType,
    contract,
    recurring,
    frequency,
    startDate,
    endDate,
    status,
    address,
    createdBy,
  })

  const createdCollecte = await collecte.save()
  res.status(201).json(createdCollecte)
})

// @desc    Get collecte by ID
// @route   GET /api/collectes/:id
// @access  Public
const getCollecteById = asyncHandler(async (req, res) => {
  const collecte = await Collecte.findById(req.params.id)

  if (collecte) {
    res.status(200).json(collecte)
  } else {
    res.status(404)
    throw new Error('Collecte not found')
  }
})

// @desc    Update collecte
// @route   PUT /api/collectes/:id
// @access  Public
const updateCollecte = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    dollibarTierId,
    collectionType,
    contract,
    recurring,
    frequency,
    startDate,
    endDate,
    status,
    address,
    createdBy,
  } = req.body

  const collecte = await Collecte.findById(req.params.id)

  if (collecte) {
    collecte.title = title || collecte.title
    collecte.description = description || collecte.description
    collecte.dollibarTierId = dollibarTierId || collecte.dollibarTierId
    collecte.collectionType = collectionType || collecte.collectionType
    collecte.contract = contract || collecte.contract
    collecte.recurring =
      recurring !== undefined ? recurring : collecte.recurring
    collecte.frequency = frequency || collecte.frequency
    collecte.startDate = startDate || collecte.startDate
    collecte.endDate = endDate || collecte.endDate
    collecte.status = status || collecte.status
    collecte.address = address || collecte.address
    collecte.createdBy = createdBy || collecte.createdBy

    const updatedCollecte = await collecte.save()
    res.status(200).json(updatedCollecte)
  } else {
    res.status(404)
    throw new Error('Collecte not found')
  }
})

// @desc    Delete collecte
// @route   DELETE /api/collectes/:id
// @access  Public
const deleteCollecte = asyncHandler(async (req, res) => {
  const collecte = await Collecte.findById(req.params.id)

  if (collecte) {
    await collecte.deleteOne()
    res.status(200).json({ message: 'Collecte removed' })
  } else {
    res.status(404)
    throw new Error('Collecte not found')
  }
})

export {
  getCollectes,
  createCollecte,
  getCollecteById,
  updateCollecte,
  deleteCollecte,
}
