import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number, // Durée en minutes
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    location: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ['Planifié', 'Terminé', 'Annulé'],
      default: 'Planifié',
    },

    priority: {
      type: String,
      enum: ['Basse', 'Moyenne', 'Haute'],
      default: 'Moyenne',
    },
    reminder: {
      type: Number, // Rappel en minutes avant l'événement
      required: false,
    },

    attachments: [
      {
        type: String, // URL des fichiers joints
        required: false,
      },
    ],
    meetingUrl: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
)

const Event = mongoose.model('Event', eventSchema)

export default Event
