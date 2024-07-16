import mongoose from 'mongoose'

const slideSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, 'Le titre ne peut pas dépasser 100 caractères'],
    },
    subtitle: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    paragraphs: {
      type: [String],
    },
  },
  { timestamps: true },
)

const presentationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, 'Le titre ne peut pas dépasser 100 caractères'],
    },
    cover: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    slides: [slideSchema], // Relation avec le sous-modèle slideSchema
  },
  { timestamps: true },
)

const Presentation = mongoose.model('Presentation', presentationSchema)

export default Presentation
