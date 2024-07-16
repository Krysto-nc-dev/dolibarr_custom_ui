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
    throw new Error('Presentation not found')
  }
})

// @desc    Create a new presentation
// @route   POST /api/presentations
// @access  Public
const createPresentation = asyncHandler(async (req, res) => {
  const { title, description, slides } = req.body

  const presentation = new Presentation({
    title,
    description,
    slides,
    cover,
  })

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
    throw new Error('Presentation not found')
  }
})

// @desc    Delete presentation
// @route   DELETE /api/presentations/:id
// @access  Public
const deletePresentation = asyncHandler(async (req, res) => {
  const presentation = await Presentation.findById(req.params.id)

  if (presentation) {
    await presentation.deleteOne()
    res.status(200).json({ message: 'Presentation removed' })
  } else {
    res.status(404)
    throw new Error('Presentation not found')
  }
})

// @desc    Add slide to presentation
// @route   POST /api/presentations/:presentationId/slides
// @access  Public
const addSlideToPresentation = asyncHandler(async (req, res) => {
  const { presentationId } = req.params
  const slide = req.body

  const presentation = await Presentation.findById(presentationId)

  if (presentation) {
    presentation.slides.push(slide)
    const updatedPresentation = await presentation.save()
    res.status(201).json(updatedPresentation)
  } else {
    res.status(404)
    throw new Error('Presentation not found')
  }
})

// @desc    Update slide of presentation
// @route   PUT /api/presentations/:presentationId/slides/:slideId
// @access  Public
const updateSlideOfPresentation = asyncHandler(async (req, res) => {
  const { presentationId, slideId } = req.params
  const { title, subtitle, image, paragraphs } = req.body

  const presentation = await Presentation.findById(presentationId)

  if (presentation) {
    const slideToUpdate = presentation.slides.find(
      (slide) => slide._id == slideId,
    )

    if (slideToUpdate) {
      slideToUpdate.title = title || slideToUpdate.title
      slideToUpdate.subtitle = subtitle || slideToUpdate.subtitle
      slideToUpdate.image = image || slideToUpdate.image
      slideToUpdate.paragraphs = paragraphs || slideToUpdate.paragraphs

      const updatedPresentation = await presentation.save()
      res.status(200).json(updatedPresentation)
    } else {
      res.status(404)
      throw new Error('Slide not found')
    }
  } else {
    res.status(404)
    throw new Error('Presentation not found')
  }
})

// @desc    Delete slide from presentation
// @route   DELETE /api/presentations/:presentationId/slides/:slideId
// @access  Public
const deleteSlideFromPresentation = asyncHandler(async (req, res) => {
  const { presentationId, slideId } = req.params

  const presentation = await Presentation.findById(presentationId)

  if (presentation) {
    presentation.slides = presentation.slides.filter(
      (slide) => slide._id != slideId,
    )
    await presentation.save()
    res.status(200).json({ message: 'Slide removed from presentation' })
  } else {
    res.status(404)
    throw new Error('Presentation not found')
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
