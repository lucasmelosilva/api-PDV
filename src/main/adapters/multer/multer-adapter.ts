import multer from 'multer'
import path from 'path'

export const uploadMiddleware = multer({
  storage: multer.diskStorage({
    destination (req, file, cb) {
      cb(null, path.resolve(__dirname, '..', '..', '..', '..', 'uploads'))
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  })
})
