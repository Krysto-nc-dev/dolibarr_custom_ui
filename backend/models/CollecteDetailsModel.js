// plasticDetailsModel.js

import mongoose from 'mongoose'

const collecteDetailsSchema = new mongoose.Schema({
  collecteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Collecte',
    required: true,
  },
  plasticWeightKg: {
    type: Number,
    required: true,
  },
  plasticType: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    default: '737a3694e5fc335f796a4949',
  },
  plasticColor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    default: '737a3694e5fc336f796a413b',
  },
})

const CollecteDetails = mongoose.model('CollecteDetails', collecteDetailsSchema)

export default CollecteDetails
