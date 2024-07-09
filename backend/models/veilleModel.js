import mongoose from 'mongoose'

const veilleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
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
    type: {
      type: String,
      enum: ['Vidéo', 'Site Web', 'Article', 'PDF'],
      required: true,
    },
    categories: {
      type: String,
      enum: ['Tutoriel', 'Actualités', 'Recherche', 'Innovation', 'Etude'],
      default: 'Tutoriel',
    },
    tags: {
      type: [String],
      required: false,
    },
    url: {
      type: String,
      required: false,
      validate: {
        validator: function (v) {
          return v
            ? /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-.,@?^=%&:\/~+#]*)?$/.test(
                v,
              )
            : true
        },
        message: (props) => `${props.value} n'est pas une URL valide!`,
      },
    },
    source: {
      type: String,
      required: false,
    },
    lang: {
      type: String,
      enum: ['français', 'anglais', 'espagnol', 'allemand', 'autre'],
      required: true,
    },
    photo: {
      type: String,
      default: 'no-photo.png',
    },
  },
  { timestamps: true },
)

const Veille = mongoose.model('Veille', veilleSchema)

export default Veille
