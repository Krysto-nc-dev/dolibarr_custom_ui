import mongoose from 'mongoose'

const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  civility: {
    type: String,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
  },
  acceptMailing: {
    type: Boolean,
    required: true,
    default: true,
  },
})

const Email = mongoose.model('Email', emailSchema)

export default Email
