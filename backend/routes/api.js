// backend/routes/api.js
const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const uploadController = require('../controllers/uploadController')
const approvalController = require('../controllers/approvalController')
const signatureController = require('../controllers/signatureController')
const pdfController = require('../controllers/pdfController')
const reservationController = require('../controllers/reservationController')
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
const allowedExtensions = ['.stl', '.obj', '.3mf']
const upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase()
    if (allowedExtensions.includes(ext)) {
      cb(null, true)
    } else {
      cb(new Error('不支持的文件格式，仅允许上传: ' + allowedExtensions.join(', ')))
    }
  }
})
router.post('/upload', upload.single('file'), uploadController.uploadFile)
router.post('/approve', approvalController.approveApplication)
router.post('/signature', signatureController.saveSignature)
router.post('/generate-pdf', pdfController.generatePDF)
router.get('/reservations', reservationController.getReservations)
module.exports = router
