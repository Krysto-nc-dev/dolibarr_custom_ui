import mongoose from 'mongoose'

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    colors: [
      {
        color: {
          type: String,
          required: true,
        },
        percentage: {
          type: Number,
          required: true,
        },
      },
    ],
    productionType: {
      type: String,
      enum: ['injection', 'extrusion', 'compression'],
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    images: [
      {
        type: String,
        required: false,
      },
    ],
  },
  { timestamps: true },
)

const Recipe = mongoose.model('Recipe', recipeSchema)

export default Recipe
