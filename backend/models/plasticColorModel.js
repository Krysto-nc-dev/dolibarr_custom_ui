import mongoose from 'mongoose'

const plasticColorSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
})

const PlasticColor = mongoose.model('PlasticColor', plasticColorSchema)

export default PlasticColor
