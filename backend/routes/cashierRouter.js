import express from 'express'
import {
  createCashier,
  getCashiers,
  getCashierById,
  updateCashier,
  deleteCashier,
  addSale,
} from '../controllers/cashierControlleur.js'

const router = express.Router()

// Routes for cashiers
router.route('/').get(getCashiers).post(createCashier)
router
  .route('/:id')
  .get(getCashierById)
  .put(updateCashier)
  .delete(deleteCashier)

// Route for adding sale to a specific cashier
router.route('/:cashierId/sales').post(addSale)

export default router
