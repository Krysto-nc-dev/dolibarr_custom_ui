import express from 'express'
import {
  getProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
  addStage,
} from '../controllers/projectController.js'

const router = express.Router()

router.route('/').get(getProjects).post(createProject)
router
  .route('/:id')
  .get(getProjectById)
  .put(updateProject)
  .delete(deleteProject)
router.route('/:id/stages').post(addStage)

export default router
