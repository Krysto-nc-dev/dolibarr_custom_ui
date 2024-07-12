import express from 'express'
import {
  getCollectes,
  createCollecte,
  getCollecteById,
  updateCollecte,
  deleteCollecte,
} from '../controllers/collecteController.js'

const router = express.Router()

router.route('/').get(getCollectes).post(createCollecte)

router
  .route('/:id')
  .get(getCollecteById)
  .put(updateCollecte)
  .delete(deleteCollecte)

export default router
