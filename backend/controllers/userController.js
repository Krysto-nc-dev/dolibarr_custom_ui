import crypto from 'crypto'
import asyncHandler from '../middleware/asyncHandler.js'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
import ErrorResponse from '../utils/errorResponse.js'
import sendEmail from '../utils/sendEmail.js'

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id)
    res.status(200).json({
      _id: user._id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      isAdmin: user.isAdmin,
      role: user.role,
    })
  } else {
    res.status(401)
    throw new Error("Le mot de passe ou l'email est incorrect")
  }
})

// @desc Register a new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  const userExist = await User.findOne({ email })
  if (userExist) {
    res.status(400)
    throw new Error('Cet utilisateur existe déjà')
  }
  const user = await User.create({
    name,
    email,
    password,
    lastname,
  })
  if (user) {
    generateToken(res, user._id)
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      lastname: user.lastname,
      isAdmin: user.isAdmin,
      role: user.role,
    })
  } else {
    res.status(400)
    throw new Error('Données invalides')
  }
})

// @desc Logout user / clear cookie
// @route POST /api/users/logout
// @access Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
  })

  res.status(200).json({ message: 'Vous êtes déconnecté' })
})

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  // Vérifier si req.user existe et contient _id
  if (!req.user || !req.user._id) {
    res
      .status(400)
      .json({ message: 'Information utilisateur manquante dans la requête' })
    return
  }

  // Trouver l'utilisateur par son ID
  const user = await User.findById(req.user._id).populate('favoriteProducts')

  // Vérifier si l'utilisateur existe
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      isAdmin: user.isAdmin,
      role: user.role,
    })
  } else {
    res.status(404)
    throw new Error('Utilisateur introuvable')
  }
})

// @desc update profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      lastname: updatedUser.lastname,
      role: updatedUser.role,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('Utilisateur introuvable')
  }
})

// @desc Get users
// @route GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.status(200).json(users)
})

// @desc Get user by id
// @route GET /api/users/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    res.status(200).json(user)
  } else {
    res.status(404)
    throw new Error('Utilisateur introuvable')
  }
})

// @desc Get users
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    if (user.isAdmin) {
      res.status(400)
      throw new Error('Vous ne pouvez pas supprimer un administrateur')
    }
    await user.deleteOne({ _id: user._id })
    res.status(201).json({ message: 'Utilisateur supprimé' })
  } else {
    res.status(404)
    throw new Error('Utilisateur introuvable')
  }
})

// @desc Update user
// @route PUT /api/users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.role = req.body.role || user.role
    user.lastname = req.body.lastname || user.lastname
    user.isAdmin = Boolean(req.body.isAdmin)

    const updatedUser = await user.save()
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      lastname: updatedUser.lastname,
      isAdmin: updatedUser.isAdmin,
      role: updatedUser.role,
    })
  } else {
    res.status(404)
    throw new Error('Utilisateur introuvable')
  }
})

// @desc      Update password
// @route     PUT /api/users/updatepassword
// @access    Private
const updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password')

  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse('Password is incorrect', 401))
  }

  user.password = req.body.newPassword
  await user.save()

  sendTokenResponse(user, 200, res)
})

// @desc      Forgot password
// @route     POST /api/users/forgotpassword
// @access    Public
const forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email })

  if (!user) {
    return next(new ErrorResponse('There is no user with that email', 404))
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken()

  await user.save({ validateBeforeSave: false })

  // Create reset url
  const resetUrl = `${req.protocol}://${req.get(
    'host',
  )}/api/users/resetpassword/${resetToken}`

  const message = `
  Vous recevez cet e-mail car vous (ou une autre personne) avez demandé la réinitialisation d'un mot de passe sur Sollen. Veuillez effectuer une requête à : \n\n ${resetUrl}`

  try {
    await sendEmail({
      email: user.email,
      subject: 'Demande de réinitialisation de mot de passe',
      message,
    })

    res.status(200).json({ success: true, data: 'Email envoyé avec succès.' })
  } catch (err) {
    console.log(err)
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save({ validateBeforeSave: false })

    return next(
      new ErrorResponse(
        "L'e-mail n'a pas été envoyé. Merci de réessayer.",
        500,
      ),
    )
  }

  res.status(200).json({
    success: true,
    data: user,
  })
})

// @desc      Reset password
// @route     PUT /api/users/resetpassword/:resettoken
// @access    Public
const resetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex')

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  })

  if (!user) {
    return next(new ErrorResponse('Invalid token', 400))
  }

  // Set new password
  user.password = req.body.password
  user.resetPasswordToken = undefined
  user.resetPasswordExpire = undefined
  await user.save()

  sendTokenResponse(user, 200, res)
})

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken()

  const options = {
    maxAge: process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000, // Utilisez maxAge en millisecondes
    httpOnly: true,
  }

  if (process.env.NODE_ENV === 'production') {
    options.secure = true
  }

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
  })
}

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  updatePassword,
  forgotPassword,
  resetPassword,
}
