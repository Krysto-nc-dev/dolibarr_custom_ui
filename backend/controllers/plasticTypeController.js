import asyncHandler from '../middleware/asyncHandler.js'
import PlasticType from '../models/plasticTypeModel.js'

// @desc    Get all plastic types
// @route   GET /api/plasticTypes
// @access  Public
const getPlasticTypes = asyncHandler(async (req, res) => {
  const plasticTypes = await PlasticType.find()
  res.status(200).json(plasticTypes)
})

// @desc    Create a new plastic type
// @route   POST /api/plasticTypes
// @access  Public
const createPlasticType = asyncHandler(async (req, res) => {
  const {
    sigleFr,
    sigleEn,
    scientificNameFr,
    scientificNameEn,
    description,
    icone,
    flotability,
    injectionTemperature,
    density,
    meltingPoint,
    heatResistance,
    chemicalResistance,
    rigidity,
    toxicity,
    environmentalImpact,
  } = req.body

  const plasticType = new PlasticType({
    sigleFr,
    sigleEn,
    scientificNameFr,
    scientificNameEn,
    description,
    icone,
    flotability,
    injectionTemperature,
    density,
    meltingPoint,
    heatResistance,
    chemicalResistance,
    rigidity,
    toxicity,
    environmentalImpact,
  })

  const createdPlasticType = await plasticType.save()
  res.status(201).json(createdPlasticType)
})

// @desc    Get plastic type by ID
// @route   GET /api/plasticTypes/:id
// @access  Public
const getPlasticTypeById = asyncHandler(async (req, res) => {
  const plasticType = await PlasticType.findById(req.params.id)

  if (plasticType) {
    res.status(200).json(plasticType)
  } else {
    res.status(404)
    throw new Error('Plastic type not found')
  }
})

// @desc    Update plastic type
// @route   PUT /api/plasticTypes/:id
// @access  Public
const updatePlasticType = asyncHandler(async (req, res) => {
  const {
    sigleFr,
    sigleEn,
    scientificNameFr,
    scientificNameEn,
    description,
    icone,
    flotability,
    injectionTemperature,
    density,
    meltingPoint,
    heatResistance,
    chemicalResistance,
    rigidity,
    toxicity,
    environmentalImpact,
  } = req.body

  const plasticType = await PlasticType.findById(req.params.id)

  if (plasticType) {
    plasticType.sigleFr = sigleFr || plasticType.sigleFr
    plasticType.sigleEn = sigleEn || plasticType.sigleEn
    plasticType.scientificNameFr =
      scientificNameFr || plasticType.scientificNameFr
    plasticType.scientificNameEn =
      scientificNameEn || plasticType.scientificNameEn
    plasticType.description = description || plasticType.description
    plasticType.icone = icone || plasticType.icone
    plasticType.flotability = flotability || plasticType.flotability
    plasticType.injectionTemperature =
      injectionTemperature || plasticType.injectionTemperature
    plasticType.density = density || plasticType.density
    plasticType.meltingPoint = meltingPoint || plasticType.meltingPoint
    plasticType.heatResistance = heatResistance || plasticType.heatResistance
    plasticType.chemicalResistance =
      chemicalResistance || plasticType.chemicalResistance
    plasticType.rigidity = rigidity || plasticType.rigidity
    plasticType.toxicity = toxicity || plasticType.toxicity
    plasticType.environmentalImpact =
      environmentalImpact || plasticType.environmentalImpact

    const updatedPlasticType = await plasticType.save()
    res.status(200).json(updatedPlasticType)
  } else {
    res.status(404)
    throw new Error('Plastic type not found')
  }
})

// @desc    Delete plastic type
// @route   DELETE /api/plasticTypes/:id
// @access  Public
const deletePlasticType = asyncHandler(async (req, res) => {
  const plasticType = await PlasticType.findById(req.params.id)

  if (plasticType) {
    await plasticType.deleteOne()
    res.status(200).json({ message: 'Plastic type removed' })
  } else {
    res.status(404)
    throw new Error('Plastic type not found')
  }
})

export {
  getPlasticTypes,
  createPlasticType,
  getPlasticTypeById,
  updatePlasticType,
  deletePlasticType,
}
