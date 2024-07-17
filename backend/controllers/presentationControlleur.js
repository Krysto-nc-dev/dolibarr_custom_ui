import asyncHandler from '../middleware/asyncHandler.js'
import Presentation from '../models/PresentationModel.js'

// @desc    Get all presentations
// @route   GET /api/presentations
// @access  Public
const getPresentations = asyncHandler(async (req, res) => {
  const presentations = await Presentation.find()
  res.status(200).json(presentations)
})

// @desc    Get presentation by ID
// @route   GET /api/presentations/:id
// @access  Public
const getPresentationById = asyncHandler(async (req, res) => {
  const presentation = await Presentation.findById(req.params.id)

  if (presentation) {
    res.status(200).json(presentation)
  } else {
    res.status(404)
    throw new Error('Présentation non trouvée')
  }
})

// @desc    Create a new presentation
// @route   POST /api/presentations
// @access  Public
const createPresentation = asyncHandler(async (req, res) => {
  const presentation = new Presentation({
    title: 'Sample title',
    description: 'Sample description',
    cover: '/images/no-photo.png',
    slides: [],
  })

  // const { title, description, slides } = req.body

  // const presentation = new Presentation({
  //   title,
  //   description,
  //   slides,
  // })

  const createdPresentation = await presentation.save()
  res.status(201).json(createdPresentation)
})

// @desc    Update presentation
// @route   PUT /api/presentations/:id
// @access  Public
const updatePresentation = asyncHandler(async (req, res) => {
  const { title, description, slides, cover } = req.body

  const presentation = await Presentation.findById(req.params.id)

  if (presentation) {
    presentation.title = title || presentation.title
    presentation.description = description || presentation.description
    presentation.slides = slides || presentation.slides
    presentation.cover = cover || presentation.cover

    const updatedPresentation = await presentation.save()
    res.status(200).json(updatedPresentation)
  } else {
    res.status(404)
    throw new Error('Présentation non trouvée')
  }
})

// @desc    Delete presentation
// @route   DELETE /api/presentations/:id
// @access  Public
const deletePresentation = asyncHandler(async (req, res) => {
  const presentation = await Presentation.findById(req.params.id)

  if (presentation) {
    await presentation.deleteOne()
    res.status(200).json({ message: 'Présentation supprimée' })
  } else {
    res.status(404)
    throw new Error('Présentation non trouvée')
  }
})

// @desc    Add slide to presentation
// @route   POST /api/presentations/:presentationId/slides
// @access  Public
const addSlideToPresentation = asyncHandler(async (req, res) => {
  const { presentationId } = req.params
  const slideData = req.body

  const presentation = await Presentation.findById(presentationId)

  if (presentation) {
    presentation.slides.push(slideData)
    const updatedPresentation = await presentation.save()
    res.status(201).json(updatedPresentation)
  } else {
    res.status(404)
    throw new Error('Présentation non trouvée')
  }
})

// @desc    Update slide of presentation
// @route   PUT /api/presentations/:presentationId/slides/:slideId
// @access  Public
const updateSlideOfPresentation = asyncHandler(async (req, res) => {
  const { presentationId, slideId } = req.params
  const { title, subtitle, image, paragraphs, template, questions } = req.body

  const presentation = await Presentation.findById(presentationId)

  if (presentation) {
    const slideToUpdate = presentation.slides.id(slideId)

    if (slideToUpdate) {
      slideToUpdate.title = title || slideToUpdate.title
      slideToUpdate.subtitle = subtitle || slideToUpdate.subtitle
      slideToUpdate.image = image || slideToUpdate.image
      slideToUpdate.paragraphs = paragraphs || slideToUpdate.paragraphs
      slideToUpdate.template = template || slideToUpdate.template
      slideToUpdate.questions = questions || slideToUpdate.questions

      const updatedPresentation = await presentation.save()
      res.status(200).json(updatedPresentation)
    } else {
      res.status(404)
      throw new Error('Slide non trouvée')
    }
  } else {
    res.status(404)
    throw new Error('Présentation non trouvée')
  }
})

// @desc    Delete slide from presentation
// @route   DELETE /api/presentations/:presentationId/slides/:slideId
// @access  Public
const deleteSlideFromPresentation = asyncHandler(async (req, res) => {
  const { presentationId, slideId } = req.params

  const presentation = await Presentation.findById(presentationId)

  if (presentation) {
    presentation.slides.pull(slideId)
    await presentation.save()
    res.status(200).json({ message: 'Slide supprimée de la présentation' })
  } else {
    res.status(404)
    throw new Error('Présentation non trouvée')
  }
})

export {
  getPresentations,
  getPresentationById,
  createPresentation,
  updatePresentation,
  deletePresentation,
  addSlideToPresentation,
  updateSlideOfPresentation,
  deleteSlideFromPresentation,
}
