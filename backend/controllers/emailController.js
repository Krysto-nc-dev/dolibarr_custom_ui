import asyncHandler from '../middleware/asyncHandler.js'
import Email from '../models/EmailModel.js'

// @desc    Get all emails
// @route   GET /api/emails
// @access  Public
const getEmails = asyncHandler(async (req, res) => {
  const emails = await Email.find()
  res.status(200).json(emails)
})

// @desc    Create a new email
// @route   POST /api/emails
// @access  Public
const createEmail = asyncHandler(async (req, res) => {
  const { email, civility, firstname, lastname, city, birthdate } = req.body

  const newEmail = new Email({
    email,
    civility,
    firstname,
    lastname,
    city,
    birthdate,
  })

  const createdEmail = await newEmail.save()
  res.status(201).json(createdEmail)
})

// @desc    Get email by ID
// @route   GET /api/emails/:id
// @access  Public
const getEmailById = asyncHandler(async (req, res) => {
  const email = await Email.findById(req.params.id)

  if (email) {
    res.status(200).json(email)
  } else {
    res.status(404)
    throw new Error('Email not found')
  }
})

// @desc    Update email
// @route   PUT /api/emails/:id
// @access  Public
const updateEmail = asyncHandler(async (req, res) => {
  const { email, civility, firstname, lastname, city, birthdate } = req.body

  const updatedEmail = await Email.findByIdAndUpdate(
    req.params.id,
    { email, civility, firstname, lastname, city, birthdate },
    { new: true, runValidators: true },
  )

  if (updatedEmail) {
    res.status(200).json(updatedEmail)
  } else {
    res.status(404)
    throw new Error('Email not found')
  }
})

// @desc    Delete email
// @route   DELETE /api/emails/:id
// @access  Public
const deleteEmail = asyncHandler(async (req, res) => {
  const email = await Email.findById(req.params.id)

  if (email) {
    await email.deleteOne()
    res.status(200).json({ message: 'Email removed' })
  } else {
    res.status(404)
    throw new Error('Email not found')
  }
})

export { getEmails, createEmail, getEmailById, updateEmail, deleteEmail }
