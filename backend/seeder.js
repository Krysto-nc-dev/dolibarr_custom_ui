import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import events from './data/events.js'
import veilles from './data/veilles.js'
import recipes from './data/recipes.js'
import plasticColors from './data/plastic_colors.js'
import plasticTypes from './data/plastic_types.js'
import recyclableProducts from './data/recyclable_products.js'
import machines from './data/machines.js' // Import des données de machines

import User from './models/userModel.js'
import Event from './models/eventModel.js'
import Veille from './models/veilleModel.js'
import Recipe from './models/recipeModel.js'
import PlasticColor from './models/plasticColorModel.js'
import PlasticType from './models/plasticTypeModel.js'
import RecyclableProduct from './models/recyclableProductModel.js'
import Machine from './models/machineModel.js' // Import du modèle Machine

import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    // await User.deleteMany()
    await Event.deleteMany()
    await Veille.deleteMany()
    await Recipe.deleteMany()
    await PlasticColor.deleteMany()
    await PlasticType.deleteMany()
    await RecyclableProduct.deleteMany()
    await Machine.deleteMany() // Suppression des anciennes données de machines

    // const createdUsers = await User.insertMany(users)

    // const adminUser = createdUsers[0]._id
    await Event.insertMany(events)
    await Veille.insertMany(veilles)
    await Recipe.insertMany(recipes)
    await PlasticColor.insertMany(plasticColors)
    await PlasticType.insertMany(plasticTypes)
    await RecyclableProduct.insertMany(recyclableProducts)
    await Machine.insertMany(machines) // Import des nouvelles données de machines

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    // await User.deleteMany()
    await Event.deleteMany()
    await Veille.deleteMany()
    await Recipe.deleteMany()
    await PlasticColor.deleteMany()
    await PlasticType.deleteMany()
    await RecyclableProduct.deleteMany()
    await Machine.deleteMany() // Suppression des données de machines

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
