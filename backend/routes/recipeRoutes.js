import express from 'express'
const router = express.Router()
import {
  getRecipes,
  createRecipe,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} from '../controllers/recipeController.js'

// Routes pour les recettes sans middleware d'authentification protect
router
  .route('/')
  .get(getRecipes) // Récupérer toutes les recettes
  .post(createRecipe) // Créer une nouvelle recette

router
  .route('/:id')
  .get(getRecipeById) // Récupérer une recette par ID
  .put(updateRecipe) // Mettre à jour une recette par ID
  .delete(deleteRecipe) // Supprimer une recette par ID

export default router
