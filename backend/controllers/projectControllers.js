import asyncHandler from '../middleware/asyncHandler.js'
import Project from '../models/ProjectModel.js'

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find()
  res.status(200).json(projects)
})

// @desc    Create a new project
// @route   POST /api/projects
// @access  Public
const createProject = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    category,
    projectType,
    budget,
    startDate,
    endDate,
    status,
    teamMembers,
    documents,
    stages,
  } = req.body

  const project = new Project({
    title,
    description,
    category,
    projectType,
    budget,
    startDate,
    endDate,
    status,
    teamMembers,
    documents,
    stages,
  })

  const createdProject = await project.save()
  res.status(201).json(createdProject)
})

// @desc    Get project by ID
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id).populate(
    'teamMembers',
    'name email',
  )

  if (project) {
    res.status(200).json(project)
  } else {
    res.status(404)
    throw new Error('Project not found')
  }
})

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Public
const updateProject = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    category,
    projectType,
    budget,
    startDate,
    endDate,
    status,
    teamMembers,
    documents,
    stages,
  } = req.body

  const project = await Project.findById(req.params.id)

  if (project) {
    project.title = title || project.title
    project.description = description || project.description
    project.category = category || project.category
    project.projectType = projectType || project.projectType
    project.budget = budget || project.budget
    project.startDate = startDate || project.startDate
    project.endDate = endDate || project.endDate
    project.status = status || project.status
    project.teamMembers = teamMembers || project.teamMembers
    project.documents = documents || project.documents
    project.stages = stages || project.stages

    const updatedProject = await project.save()
    res.status(200).json(updatedProject)
  } else {
    res.status(404)
    throw new Error('Project not found')
  }
})

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Public
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id)

  if (project) {
    await project.deleteOne()
    res.status(200).json({ message: 'Project removed' })
  } else {
    res.status(404)
    throw new Error('Project not found')
  }
})

// @desc    Add stage to project
// @route   POST /api/projects/:id/stages
// @access  Public
const addStage = asyncHandler(async (req, res) => {
  const { id } = req.params
  const stage = req.body

  const project = await Project.findById(id)

  if (project) {
    project.stages.push(stage)
    await project.save()
    res.status(201).json(project)
  } else {
    res.status(404)
    throw new Error('Project not found')
  }
})

export {
  getProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
  addStage,
}
