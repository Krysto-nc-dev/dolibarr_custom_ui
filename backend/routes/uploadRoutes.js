import express from 'express'
import path from 'path'
import multer from 'multer'

const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
    )
  },
})

function fileFilter(req, file, cb) {
  const filetypes = /jpe?g|png|webp|pdf/ // Ajoutez 'pdf' aux types de fichiers autorisés
  const mimetype = /image\/(jpeg|png|webp)|application\/pdf/ // Ajoutez 'application/pdf' pour les PDF

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetypeValid = mimetype.test(file.mimetype)

  if (extname && mimetypeValid) {
    cb(null, true)
  } else {
    cb(new Error("Ce fichier n'est pas une image ou un PDF valide!"), false)
  }
}

const upload = multer({ storage, fileFilter })
const uploadMultipleFiles = upload.array('files', 10) // Changez 'images' en 'files' pour refléter la possibilité de télécharger des PDF

// Route pour téléverser des fichiers
router.post('/', (req, res) => {
  uploadMultipleFiles(req, res, function (err) {
    if (err) {
      return res.status(400).send({ message: err.message })
    }

    // Array contenant les chemins des fichiers téléchargés
    const paths = req.files.map((file) => `/${file.filename}`)

    res.status(200).send({
      message: 'Fichiers téléchargés avec succès',
      files: paths,
    })
  })
})

router.get('/:filename', (req, res) => {
  const filePath = path.join(__dirname, '..', 'uploads', req.params.filename)

  // Vérifiez le chemin du fichier dans la console pour déboguer
  console.log('Chemin du fichier à télécharger :', filePath)

  res.sendFile(
    filePath,
    {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename=${req.params.filename}`,
      },
    },
    function (err) {
      if (err) {
        console.error("Erreur lors de l'envoi du fichier :", err)
        res.status(404).send('Fichier non trouvé')
      }
    },
  )
})

export default router
