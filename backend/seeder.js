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
import machines from './data/machines.js'
import projects from './data/projects.js'
import collectes from './data/collects.js'
import collecteDetails from './data/collectDetails.js'

import User from './models/userModel.js'
import Event from './models/eventModel.js'
import Veille from './models/veilleModel.js'
import Recipe from './models/recipeModel.js'
import PlasticColor from './models/plasticColorModel.js'
import PlasticType from './models/plasticTypeModel.js'
import RecyclableProduct from './models/recyclableProductModel.js'
import Machine from './models/machineModel.js'
import Project from './models/ProjectModel.js'
import Collecte from './models/CollecteModel.js'
import CollecteDetails from './models/CollecteDetailsModel.js'

import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Event.deleteMany()
    await Veille.deleteMany()
    await Recipe.deleteMany()
    await PlasticColor.deleteMany()
    await PlasticType.deleteMany()
    await RecyclableProduct.deleteMany()
    await Machine.deleteMany()
    await Project.deleteMany()
    await Collecte.deleteMany()
    await CollecteDetails.deleteMany()

    await Event.insertMany(events)
    await Veille.insertMany(veilles)
    await Recipe.insertMany(recipes)
    await PlasticColor.insertMany(plasticColors)
    await PlasticType.insertMany(plasticTypes)
    await RecyclableProduct.insertMany(recyclableProducts)
    await Machine.insertMany(machines)
    await Project.insertMany(projects)
    await CollecteDetails.insertMany(collecteDetails)
    await Collecte.insertMany(collectes)

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Event.deleteMany()
    await Veille.deleteMany()
    await Recipe.deleteMany()
    await PlasticColor.deleteMany()
    await PlasticType.deleteMany()
    await RecyclableProduct.deleteMany()
    await Machine.deleteMany()
    await Project.deleteMany()
    await Collecte.deleteMany()
    await CollecteDetails.deleteMany()

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
