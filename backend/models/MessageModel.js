import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'Non lu',
    enum: ['Non lu', 'Lu'],
  },
})

const Message = mongoose.model('Message', messageSchema)

export default Message
