import asyncHandler from '../middleware/asyncHandler.js'
import Event from '../models/eventModel.js'

// @desc    Get all events
// @route   GET /api/events
// @access  Public
const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find()
  res.status(200).json(events)
})

// @desc    Create a new event
// @route   POST /api/events
// @access  Public
const createEvent = asyncHandler(async (req, res) => {
  const {
    title,
    date,
    duration,
    description,
    user,
    location,
    status,
    priority,
    reminder,
    attachments,
    meetingUrl,
  } = req.body

  const event = new Event({
    title,
    date,
    duration,
    description,
    user,
    location,
    status,
    priority,
    reminder,
    attachments,
    meetingUrl,
  })

  const createdEvent = await event.save()
  res.status(201).json(createdEvent)
})

// @desc    Get event by ID
// @route   GET /api/events/:id
// @access  Public
const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id)

  if (event) {
    res.status(200).json(event)
  } else {
    res.status(404)
    throw new Error('Event not found')
  }
})

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Public
const updateEvent = asyncHandler(async (req, res) => {
  const {
    title,
    date,
    duration,
    description,
    user,
    location,
    status,
    priority,
    reminder,
    attachments,
    meetingUrl,
  } = req.body

  const event = await Event.findById(req.params.id)

  if (event) {
    event.title = title || event.title
    event.date = date || event.date
    event.duration = duration || event.duration
    event.description = description || event.description
    event.user = user || event.user
    event.location = location || event.location
    event.status = status || event.status
    event.priority = priority || event.priority
    event.reminder = reminder || event.reminder
    event.attachments = attachments || event.attachments
    event.meetingUrl = meetingUrl || event.meetingUrl

    const updatedEvent = await event.save()
    res.status(200).json(updatedEvent)
  } else {
    res.status(404)
    throw new Error('Event not found')
  }
})

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Public
const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id)

  if (event) {
    await event.deleteOne()
    res.status(200).json({ message: 'Event removed' })
  } else {
    res.status(404)
    throw new Error('Event not found')
  }
})

export { getEvents, createEvent, getEventById, updateEvent, deleteEvent }
