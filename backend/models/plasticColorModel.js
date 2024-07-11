import mongoose from 'mongoose'

const plasticColorSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  photo: {
    type: String,
    required: true,
    default: 'no-photo.png',
  },
})

const PlasticColor = mongoose.model('PlasticColor', plasticColorSchema)

export default PlasticColor
