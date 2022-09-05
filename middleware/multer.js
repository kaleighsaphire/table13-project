const multer = require('multer')
const sharp = require('sharp')

const multerStorage = multer.memoryStorage()

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true)
  }
  else {
    cb(new Error(''), false)
  }
}

const upload = multer({
  storage: multerStorage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: multerFilter
})

exports.uploadProfilePic = upload.single('profilePic')

exports.uploadErrorHandler = (err, req, res, next) => {
  if (err) {
    req.flash('errors', { msg: 'Profile picture must be an image file less than 5 MB.' })
    return res.redirect('../signup')
  }
  else {
    next()
  }
}

exports.formatUserPhoto = async (req, res, next) => {
  if (!req.file) {
    return next()
  }
  
  await sharp(req.file.buffer)
    .resize(150, 150)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/pfp/${req.file.originalname}.jpg`)
  
  next()
}