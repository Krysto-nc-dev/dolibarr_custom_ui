import asyncHandler from '../middleware/asyncHandler.js'
import Recipe from '../models/recipeModel.js'

// @desc    Get all recipes
// @route   GET /api/recipes
// @access  Public
const getRecipes = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find()
  res.status(200).json(recipes)
})

// @desc    Create a new recipe
// @route   POST /api/recipes
// @access  Public
const createRecipe = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    colors,
    productionType,
    user,
    images,
    source,
    plasticType,
  } = req.body

  const recipe = new Recipe({
    title,
    description,
    colors,
    productionType,
    user,
    images,
    source,
    plasticType,
  })

  const createdRecipe = await recipe.save()
  res.status(201).json(createdRecipe)
})

// @desc    Get recipe by ID
// @route   GET /api/recipes/:id
// @access  Public
const getRecipeById = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id)

  if (recipe) {
    res.status(200).json(recipe)
  } else {
    res.status(404)
    throw new Error('Recipe not found')
  }
})

// @desc    Update recipe
// @route   PUT /api/recipes/:id
// @access  Public
const updateRecipe = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    colors,
    productionType,
    user,
    images,
    source,
    plasticType,
  } = req.body

  const recipe = await Recipe.findById(req.params.id)

  if (recipe) {
    recipe.title = title || recipe.title
    recipe.description = description || recipe.description
    recipe.colors = colors || recipe.colors
    recipe.productionType = productionType || recipe.productionType
    recipe.user = user || recipe.user
    recipe.images = images || recipe.images
    recipe.source = source || recipe.source
    recipe.plasticType = plasticType || recipe.plasticType

    const updatedRecipe = await recipe.save()
    res.status(200).json(updatedRecipe)
  } else {
    res.status(404)
    throw new Error('Recipe not found')
  }
})

// @desc    Delete recipe
// @route   DELETE /api/recipes/:id
// @access  Public
const deleteRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id)

  if (recipe) {
    await recipe.deleteOne()
    res.status(200).json({ message: 'Recipe removed' })
  } else {
    res.status(404)
    throw new Error('Recipe not found')
  }
})

export { getRecipes, createRecipe, getRecipeById, updateRecipe, deleteRecipe }
