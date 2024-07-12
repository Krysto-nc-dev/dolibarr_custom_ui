import express from 'express'
const router = express.Router()
import {
  getAllCollecteDetails,
  getCollecteDetailsById,
  getCollecteDetailsByCollecteId,
  createCollecteDetail,
  addCollecteDetails,
  updateCollecteDetails,
  deleteCollecteDetails,
} from '../controllers/collecteDetails.js'

// Routes pour les détails de collecte

router.route('/details').get(getAllCollecteDetails)

router
  .route('/details/:id')
  .get(getCollecteDetailsById)
  .put(updateCollecteDetails)
  .delete(deleteCollecteDetails)

router
  .route('/:collecteId/details')
  .get(getCollecteDetailsByCollecteId)
  .post(addCollecteDetails)

router.route('/create').post(createCollecteDetail)

export default router
