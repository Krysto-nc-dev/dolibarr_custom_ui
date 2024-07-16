import asyncHandler from '../middleware/asyncHandler.js'
import Message from '../models/MessageModel.js'

// @desc    Get all messages
// @route   GET /api/messages
// @access  Public
const getMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find()
  res.status(200).json(messages)
})

// @desc    Create a new message
// @route   POST /api/messages
// @access  Public
const createMessage = asyncHandler(async (req, res) => {
  const { email, name, message, status } = req.body

  const newMessage = new Message({
    email,
    name,
    message,
    status,
  })

  const createdMessage = await newMessage.save()
  res.status(201).json(createdMessage)
})

// @desc    Get message by ID
// @route   GET /api/messages/:id
// @access  Public
const getMessageById = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id)

  if (message) {
    res.status(200).json(message)
  } else {
    res.status(404)
    throw new Error('Message not found')
  }
})

// @desc    Update message
// @route   PUT /api/messages/:id
// @access  Public
const updateMessage = asyncHandler(async (req, res) => {
  const { email, name, message, status } = req.body

  const existingMessage = await Message.findById(req.params.id)

  if (existingMessage) {
    existingMessage.email = email || existingMessage.email
    existingMessage.name = name || existingMessage.name
    existingMessage.message = message || existingMessage.message
    existingMessage.status = req.body.status || existingMessage.status

    const updatedMessage = await existingMessage.save()
    res.status(200).json(updatedMessage)
  } else {
    res.status(404)
    throw new Error('Message not found')
  }
})

// @desc    Delete message
// @route   DELETE /api/messages/:id
// @access  Public
const deleteMessage = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id)

  if (message) {
    await message.deleteOne()
    res.status(200).json({ message: 'Message removed' })
  } else {
    res.status(404)
    throw new Error('Message not found')
  }
})

export {
  getMessages,
  createMessage,
  getMessageById,
  updateMessage,
  deleteMessage,
}
