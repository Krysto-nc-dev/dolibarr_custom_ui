import express from 'express'
const router = express.Router()
import {
  getPlasticColors,
  createPlasticColor,
  getPlasticColorById,
  updatePlasticColor,
  deletePlasticColor,
} from '../controllers/plasticColorController.js'

// Routes pour les couleurs de plastique sans middleware d'authentification protect
router
  .route('/')
  .get(getPlasticColors) // Récupérer toutes les couleurs de plastique
  .post(createPlasticColor) // Créer une nouvelle couleur de plastique

router
  .route('/:id')
  .get(getPlasticColorById) // Récupérer une couleur de plastique par ID
  .put(updatePlasticColor) // Mettre à jour une couleur de plastique par ID
  .delete(deletePlasticColor) // Supprimer une couleur de plastique par ID

export default router
