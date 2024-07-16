import express from 'express'
import {
  getPresentations,
  createPresentation,
  getPresentationById,
  updatePresentation,
  deletePresentation,
  addSlideToPresentation,
  updateSlideOfPresentation,
  deleteSlideFromPresentation,
} from '../controllers/presentationControlleur.js'

const router = express.Router()

router.route('/').get(getPresentations).post(createPresentation)

router
  .route('/:id')
  .get(getPresentationById)
  .put(updatePresentation)
  .delete(deletePresentation)

router.route('/:presentationId/slides').post(addSlideToPresentation)

router
  .route('/:presentationId/slides/:slideId')
  .put(updateSlideOfPresentation)
  .delete(deleteSlideFromPresentation)

export default router
