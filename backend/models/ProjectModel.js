import mongoose from 'mongoose'

// Sous-schéma pour les étapes du projet
const projectStageSchema = new mongoose.Schema(
  {
    stageNumber: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: false,
    },
    status: {
      type: String,
      enum: ['Not Started', 'In Progress', 'Completed'],
      required: true,
      default: 'Not Started',
    },
  },
  { timestamps: true },
)

// Schéma principal pour les projets
const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        'Demande de subvention',
        'Recherche et Développement',
        'Projet Commercial',
        'Autres',
      ],
      required: true,
    },
    projectType: {
      type: String,
      enum: ['Court terme', 'Long terme', 'A venir'],
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: false,
    },
    status: {
      type: String,
      enum: ['Proposition', 'Approuvé', 'En cours', 'Terminé', 'Abandonné'],
      required: true,
      default: 'Proposed',
    },
    teamMembers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
      },
    ],
    documents: [
      {
        type: String,
        required: false,
      },
    ],
    stages: [projectStageSchema],
  },
  { timestamps: true },
)

const Project = mongoose.model('Project', projectSchema)

export default Project
