import path from 'path'
import cors from 'cors'
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config()
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import userRoutes from './routes/userRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import eventRoutes from './routes/eventRoutes.js'
import veilleRoutes from './routes/veilleRoutes.js'
import recipeRoutes from './routes/recipeRoutes.js'
import plasticTypeRoutes from './routes/plasticTypeRoutes.js'
import plasticColorRoutes from './routes/plasticColorRoutes.js'
import recyclableProductRoutes from './routes/recyclableProductRoutes.js'
import machineRoutes from './routes/machineRoutes.js'
import projectRoutes from './routes/projectRoutes.js'
import collecteRoutes from './routes/collecteRouter.js'
import collecteDetailsRoutes from './routes/collecteDetailsRouter.js'

const port = process.env.PORT || 5000

connectDB()
const app = express()

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())

// Cookie parser middleware
app.use(cookieParser())

// Define routes
app.use('/dolibarr-ui/api/users', userRoutes)
app.use('/dolibarr-ui/api/upload', uploadRoutes)
app.use('/dolibarr-ui/api/events', eventRoutes)
app.use('/dolibarr-ui/api/veilles', veilleRoutes)
app.use('/dolibarr-ui/api/recipes', recipeRoutes)
app.use('/dolibarr-ui/api/plastic-colors', plasticColorRoutes)
app.use('/dolibarr-ui/api/plastic-types', plasticTypeRoutes)
app.use('/dolibarr-ui/api/recyclable-products', recyclableProductRoutes)
app.use('/dolibarr-ui/api/machines', machineRoutes)
app.use('/dolibarr-ui/api/projects', projectRoutes)
app.use('/dolibarr-ui/api/collectes', collecteRoutes)
app.use('/dolibarr-ui/api/collecte-details', collecteDetailsRoutes)

const __dirname = path.resolve()
// Permet d'accéder aux fichiers dans le répertoire 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Définition de la route pour télécharger un fichier
app.get('/download/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.filename)
  res.download(filePath)
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')),
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running...')
  })
}

app.use(notFound)

app.use(errorHandler)

// Utilisez server.listen pour gérer à la fois l'API express et les connexions Socket.IO
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
