import mongoose from 'mongoose'
import geocoder from '../utils/geocoder.js'

const generateBarcode = () => {
  return Math.floor(1000000000000 + Math.random() * 9000000000000).toString()
}

const collecteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, 'Le titre ne peut pas dépasser 100 caractères'],
    },
    description: {
      type: String,
      required: true,
    },
    dollibarTierId: {
      type: String,
      required: true,
    },
    collectionType: {
      type: String,
      enum: ['Particulier', 'Professionnel'],
      required: true,
    },
    contract: {
      type: String,
      required: false,
    },
    recurring: {
      type: Boolean,
      required: true,
      default: false,
    },
    frequency: {
      type: String,
      enum: ['Hebdomadaire', 'Mensuelle'],
      required: function () {
        return this.recurring
      },
    },
    barcode: {
      type: String,
      required: function () {
        return this.recurring
      },
      unique: true,
      default: function () {
        return this.recurring ? generateBarcode() : undefined
      },
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: function () {
        return this.recurring
      },
    },
    status: {
      type: String,
      enum: ['En attente', 'En cours', 'Terminée', 'Annulée'],
      required: true,
      default: 'En attente',
    },
    address: {
      type: String,
      required: true,
    },

    location: {
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
        index: '2dsphere',
      },
      formattedAddress: String,
      street: String,
      city: String,
      zipcode: String,
      country: String,
    },
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Geocode & create location
collecteSchema.pre('save', async function (next) {
  const loc = await geocoder.geocode(this.address)
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode,
  }

  // Do not save address
  this.address = undefined
  next()
})

const Collecte = mongoose.model('Collecte', collecteSchema)

export default Collecte
