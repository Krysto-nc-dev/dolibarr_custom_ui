import express from 'express'
const router = express.Router()
import {
  getVeilles,
  createVeille,
  getVeilleById,
  updateVeille,
  deleteVeille,
} from '../controllers/veilleController.js'

// Routes pour les veilles sans middleware d'authentification protect
router
  .route('/')
  .get(getVeilles) // Récupérer toutes les veilles
  .post(createVeille) // Créer une nouvelle veille

router
  .route('/:id')
  .get(getVeilleById) // Récupérer une veille par ID
  .put(updateVeille) // Mettre à jour une veille par ID
  .delete(deleteVeille) // Supprimer une veille par ID

export default router
