import express from 'express'
const router = express.Router()
import {
  getEmails,
  createEmail,
  getEmailById,
  updateEmail,
  deleteEmail,
} from '../controllers/emailController.js'

// Routes pour les emails sans middleware d'authentification protect

router
  .route('/')
  .get(getEmails) // Récupérer tous les emails
  .post(createEmail) // Créer un nouvel email

router
  .route('/:id')
  .get(getEmailById) // Récupérer un email par ID
  .put(updateEmail) // Mettre à jour un email par ID
  .delete(deleteEmail) // Supprimer un email par ID

export default router
