const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadController = require('../controllers/uploadController');
const approvalController = require('../controllers/approvalController');
const signatureController = require('../controllers/signatureController');
const pdfController = require('../controllers/pdfController');

// 设置文件上传存储
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// 文件上传接口
router.post('/upload', upload.single('file'), uploadController.uploadFile);

// 模拟审批接口（实际中可集成企业微信审批 API）
router.post('/approve', approvalController.approveApplication);

// 在线签名接口
router.post('/signature', signatureController.saveSignature);

// PDF生成接口
router.post('/generate-pdf', pdfController.generatePDF);

module.exports = router;
