import express from 'express'
const router = express.Router()
import {
  getEvents,
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
} from '../controllers/eventController.js'

// Routes pour les événements sans middleware d'authentification protect
router
  .route('/')
  .get(getEvents) // Récupérer tous les événements
  .post(createEvent) // Créer un nouvel événement

router
  .route('/:id')
  .get(getEventById) // Récupérer un événement par ID
  .put(updateEvent) // Mettre à jour un événement par ID
  .delete(deleteEvent) // Supprimer un événement par ID

export default router
