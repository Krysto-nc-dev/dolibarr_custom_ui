import express from 'express'
const router = express.Router()
import {
  getPlasticTypes,
  createPlasticType,
  getPlasticTypeById,
  updatePlasticType,
  deletePlasticType,
} from '../controllers/plasticTypeController.js'

// Routes pour les types de plastique sans middleware d'authentification protect
router
  .route('/')
  .get(getPlasticTypes) // Récupérer tous les types de plastique
  .post(createPlasticType) // Créer un nouveau type de plastique

router
  .route('/:id')
  .get(getPlasticTypeById) // Récupérer un type de plastique par ID
  .put(updatePlasticType) // Mettre à jour un type de plastique par ID
  .delete(deletePlasticType) // Supprimer un type de plastique par ID

export default router
