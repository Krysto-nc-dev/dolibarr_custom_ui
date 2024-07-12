import express from 'express'
import {
  getCampagnesCollecte,
  createCampagneCollecte,
  getCampagneCollecteById,
  updateCampagneCollecte,
  deleteCampagneCollecte,
  addCollecte,
} from '../controllers/campgneCollectController.js'

const router = express.Router()

router.route('/').get(getCampagnesCollecte).post(createCampagneCollecte)
router
  .route('/:id')
  .get(getCampagneCollecteById)
  .put(updateCampagneCollecte)
  .delete(deleteCampagneCollecte)

router.route('/:id/collectes').post(addCollecte)

export default router
