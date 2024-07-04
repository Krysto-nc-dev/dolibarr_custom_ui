// ============================== MULTIPLES IMAGES
import path from 'path'
import express from 'express'
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
  const filetypes = /jpe?g|png|webp/
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = mimetypes.test(file.mimetype)

  if (extname && mimetype) {
    cb(null, true)
  } else {
    cb(new Error("Ce fichier n'est pas valide ! "), false)
  }
}

const upload = multer({ storage, fileFilter })
const uploadMultipleImages = upload.array('images', 10)

router.post('/', (req, res) => {
  uploadMultipleImages(req, res, function (err) {
    if (err) {
      return res.status(400).send({ message: err.message })
    }

    // Array contenant les chemins des fichiers téléchargés
    const paths = req.files.map((file) => `/${file.path}`)

    res.status(200).send({
      message: 'Images téléchargées avec succès',
      images: paths,
    })
  })
})

export default router
