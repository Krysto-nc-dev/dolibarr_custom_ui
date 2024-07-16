import mongoose from 'mongoose'

const questionSchema = new mongoose.Schema(
  {
    questionText: {
      type: String,
      required: [true, 'Le texte de la question est requis'],
    },
    type: {
      type: String,
      enum: ['qcm', 'open'],
      required: [true, 'Le type de question est requis'],
    },
    options: {
      type: [String],
      required: function () {
        return this.type === 'qcm'
      },
    },
    correctAnswer: {
      type: String,
      required: [true, 'La réponse correcte est requise'],
    },
  },
  { timestamps: true },
)

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
    template: {
      type: String,
      enum: ['template1', 'template2', 'template3', 'quiz'],
      default: 'template1',
    },
    questions: {
      type: [questionSchema],
      required: function () {
        return this.template === 'quiz'
      },
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
      default: 'no-photo.png',
    },
    description: {
      type: String,
      required: true,
    },
    slides: [slideSchema],
  },
  { timestamps: true },
)

const Presentation = mongoose.model('Presentation', presentationSchema)

export default Presentation
