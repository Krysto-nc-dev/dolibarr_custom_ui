import asyncHandler from '../middleware/asyncHandler.js'
import CampagneCollect from '../models/CampagneCollecteModel.js'

// @desc    Get all campagnes de collecte
// @route   GET /api/campagnes-collecte
// @access  Public
const getCampagnesCollecte = asyncHandler(async (req, res) => {
  const campagnes = await CampagneCollect.find()
  res.status(200).json(campagnes)
})

// @desc    Create a new campagne de collecte
// @route   POST /api/campagnes-collecte
// @access  Public
const createCampagneCollecte = asyncHandler(async (req, res) => {
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
    collectes,
  } = req.body

  const campagne = new CampagneCollect({
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
    collectes,
  })

  const createdCampagne = await campagne.save()
  res.status(201).json(createdCampagne)
})

// @desc    Get campagne de collecte by ID
// @route   GET /api/campagnes-collecte/:id
// @access  Public
const getCampagneCollecteById = asyncHandler(async (req, res) => {
  const campagne = await CampagneCollect.findById(req.params.id)

  if (campagne) {
    res.status(200).json(campagne)
  } else {
    res.status(404)
    throw new Error('Campagne de collecte not found')
  }
})

// @desc    Update campagne de collecte
// @route   PUT /api/campagnes-collecte/:id
// @access  Public
const updateCampagneCollecte = asyncHandler(async (req, res) => {
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
    collectes,
  } = req.body

  const campagne = await CampagneCollect.findById(req.params.id)

  if (campagne) {
    campagne.title = title || campagne.title
    campagne.description = description || campagne.description
    campagne.dollibarTierId = dollibarTierId || campagne.dollibarTierId
    campagne.collectionType = collectionType || campagne.collectionType
    campagne.contract = contract || campagne.contract
    campagne.recurring = recurring || campagne.recurring
    campagne.frequency = frequency || campagne.frequency
    campagne.startDate = startDate || campagne.startDate
    campagne.endDate = endDate || campagne.endDate
    campagne.status = status || campagne.status
    campagne.address = address || campagne.address
    campagne.collectes = collectes || campagne.collectes

    const updatedCampagne = await campagne.save()
    res.status(200).json(updatedCampagne)
  } else {
    res.status(404)
    throw new Error('Campagne de collecte not found')
  }
})

// @desc    Delete campagne de collecte
// @route   DELETE /api/campagnes-collecte/:id
// @access  Public
const deleteCampagneCollecte = asyncHandler(async (req, res) => {
  const campagne = await CampagneCollect.findById(req.params.id)

  if (campagne) {
    await campagne.deleteOne()
    res.status(200).json({ message: 'Campagne de collecte removed' })
  } else {
    res.status(404)
    throw new Error('Campagne de collecte not found')
  }
})

// @desc    Add collecte to campagne de collecte
// @route   POST /api/campagnes-collecte/:id/collectes
// @access  Public
const addCollecte = asyncHandler(async (req, res) => {
  const { id } = req.params
  const collecte = req.body

  const campagne = await CampagneCollect.findById(id)

  if (campagne) {
    campagne.collectes.push(collecte)
    await campagne.save()
    res.status(201).json(campagne)
  } else {
    res.status(404)
    throw new Error('Campagne de collecte not found')
  }
})

export {
  getCampagnesCollecte,
  createCampagneCollecte,
  getCampagneCollecteById,
  updateCampagneCollecte,
  deleteCampagneCollecte,
  addCollecte,
}
