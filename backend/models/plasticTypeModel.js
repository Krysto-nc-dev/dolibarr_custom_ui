import mongoose from 'mongoose'

const plasticTypeSchema = new mongoose.Schema(
  {
    sigleFr: {
      type: String,
      required: true,
    },
    sigleEn: {
      type: String,
      required: true,
    },
    scientificNameFr: {
      type: String,
      required: true,
    },
    scientificNameEn: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    icone: {
      type: String,
      required: true,
    },
    flotability: {
      alcohol: {
        type: Boolean,
        required: true,
      },
      vegetableOil: {
        type: Boolean,
        required: true,
      },
      water: {
        type: Boolean,
        required: true,
      },
      glycerine: {
        type: Boolean,
        required: true,
      },
    },
    injectionTemperature: {
      type: String,
      required: true,
    },
    density: {
      type: Number,
      required: true,
    },
    meltingPoint: {
      type: Number,
      required: true,
    },
    heatResistance: {
      type: String,
      required: true,
    },
    chemicalResistance: {
      type: String,
      required: true,
    },
    rigidity: {
      type: String,
      required: true,
    },
    toxicity: {
      type: String,
      required: true,
    },
    environmentalImpact: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

const PlasticType = mongoose.model('PlasticType', plasticTypeSchema)

export default PlasticType
