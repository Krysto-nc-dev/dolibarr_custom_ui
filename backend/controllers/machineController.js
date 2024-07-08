import asyncHandler from '../middleware/asyncHandler.js'
import Machine from '../models/machineModel.js'

// @desc    Get all machines
// @route   GET /api/machines
// @access  Public
const getMachines = asyncHandler(async (req, res) => {
  const machines = await Machine.find()
  res.status(200).json(machines)
})

// @desc    Create a new machine
// @route   POST /api/machines
// @access  Public
const createMachine = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    category,
    type,
    provenanceCountry,
    totalCoast,
    tierId,
    user,
    images,
    status,
    operatingHours,
    buyDate,
    orderDate,
    receptionDate,
    serviceDate,
    maintenances,
    usageProcedures,
  } = req.body

  const machine = new Machine({
    name,
    description,
    category,
    type,
    provenanceCountry,
    totalCoast,
    tierId,
    user,
    images,
    status,
    operatingHours,
    buyDate,
    orderDate,
    receptionDate,
    serviceDate,
    maintenances,
    usageProcedures,
  })

  const createdMachine = await machine.save()
  res.status(201).json(createdMachine)
})

// @desc    Get machine by ID
// @route   GET /api/machines/:id
// @access  Public
const getMachineById = asyncHandler(async (req, res) => {
  const machine = await Machine.findById(req.params.id)

  if (machine) {
    res.status(200).json(machine)
  } else {
    res.status(404)
    throw new Error('Machine not found')
  }
})

// @desc    Update machine
// @route   PUT /api/machines/:id
// @access  Public
const updateMachine = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    category,
    type,
    provenanceCountry,
    totalCoast,
    tierId,
    user,
    images,
    status,
    operatingHours,
    buyDate,
    orderDate,
    receptionDate,
    serviceDate,
    maintenances,
    usageProcedures,
  } = req.body

  const machine = await Machine.findById(req.params.id)

  if (machine) {
    machine.name = name || machine.name
    machine.description = description || machine.description
    machine.category = category || machine.category
    machine.type = type || machine.type
    machine.provenanceCountry = provenanceCountry || machine.provenanceCountry
    machine.totalCoast = totalCoast || machine.totalCoast
    machine.tierId = tierId || machine.tierId
    machine.user = user || machine.user
    machine.images = images || machine.images
    machine.status = status || machine.status
    machine.operatingHours = operatingHours || machine.operatingHours
    machine.buyDate = buyDate || machine.buyDate
    machine.orderDate = orderDate || machine.orderDate
    machine.receptionDate = receptionDate || machine.receptionDate
    machine.serviceDate = serviceDate || machine.serviceDate
    machine.maintenances = maintenances || machine.maintenances
    machine.usageProcedures = usageProcedures || machine.usageProcedures

    const updatedMachine = await machine.save()
    res.status(200).json(updatedMachine)
  } else {
    res.status(404)
    throw new Error('Machine not found')
  }
})

// @desc    Delete machine
// @route   DELETE /api/machines/:id
// @access  Public
const deleteMachine = asyncHandler(async (req, res) => {
  const machine = await Machine.findById(req.params.id)

  if (machine) {
    await machine.deleteOne()
    res.status(200).json({ message: 'Machine removed' })
  } else {
    res.status(404)
    throw new Error('Machine not found')
  }
})

// @desc    Add maintenance to machine
// @route   POST /api/machines/:id/maintenances
// @access  Public
const addMaintenance = asyncHandler(async (req, res) => {
  const { id } = req.params
  const maintenance = req.body

  const machine = await Machine.findById(id)

  if (machine) {
    machine.maintenances.push(maintenance)
    await machine.save()
    res.status(201).json(machine)
  } else {
    res.status(404)
    throw new Error('Machine not found')
  }
})

// @desc    Add usage procedure to machine
// @route   POST /api/machines/:id/usage-procedures
// @access  Public
const addUsageProcedure = asyncHandler(async (req, res) => {
  const { id } = req.params
  const usageProcedure = req.body

  const machine = await Machine.findById(id)

  if (machine) {
    machine.usageProcedures.push(usageProcedure)
    await machine.save()
    res.status(201).json(machine)
  } else {
    res.status(404)
    throw new Error('Machine not found')
  }
})

export {
  getMachines,
  createMachine,
  getMachineById,
  updateMachine,
  deleteMachine,
  addMaintenance,
  addUsageProcedure,
}
