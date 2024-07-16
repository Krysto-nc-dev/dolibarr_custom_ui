import express from 'express'
import {
  getMessages,
  createMessage,
  getMessageById,
  updateMessage,
  deleteMessage,
} from '../controllers/messageController.js'

const router = express.Router()

router.route('/').get(getMessages).post(createMessage)
router
  .route('/:id')
  .get(getMessageById)
  .put(updateMessage)
  .delete(deleteMessage)

export default router
