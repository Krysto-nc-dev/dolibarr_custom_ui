import express from 'express'
const router = express.Router()
import {
  getRecyclableProducts,
  getRecyclableProductById,
  createRecyclableProduct,
  updateRecyclableProduct,
  deleteRecyclableProduct,
} from '../controllers/recyclableProductController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router
  .route('/')
  .get(getRecyclableProducts) // Récupérer tous les produits recyclables
  .post(protect, admin, createRecyclableProduct) // Créer un nouveau produit recyclable (réservé aux admins)

router
  .route('/:id')
  .get(getRecyclableProductById) // Récupérer un produit recyclable par ID
  .put(protect, admin, updateRecyclableProduct) // Mettre à jour un produit recyclable par ID (réservé aux admins)
  .delete(protect, admin, deleteRecyclableProduct) // Supprimer un produit recyclable par ID (réservé aux admins)

export default router
