import express from 'express'
import {
  getMachines,
  createMachine,
  getMachineById,
  updateMachine,
  deleteMachine,
  addMaintenance,
  addUsageProcedure,
} from '../controllers/machineController.js'

const router = express.Router()

router.route('/').get(getMachines).post(createMachine)
router
  .route('/:id')
  .get(getMachineById)
  .put(updateMachine)
  .delete(deleteMachine)
router.route('/:id/maintenances').post(addMaintenance)
router.route('/:id/usage-procedures').post(addUsageProcedure)

export default router
