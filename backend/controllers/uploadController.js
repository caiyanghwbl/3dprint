// backend/controllers/uploadController.js
const Application = require('../models/Application')

exports.uploadFile = async (req, res) => {
  try {
    console.log('请求体:', req.body)
    console.log('上传的文件信息:', req.file)
    if (!req.file) {
      return res.status(400).json({ message: '未检测到文件上传' })
    }
    if (!req.body.usageDateTime) {
      return res.status(400).json({ message: '预约使用日期和时间必填' })
    }
    const usageDate = new Date(req.body.usageDateTime)
    if (isNaN(usageDate)) {
      return res.status(400).json({ message: '预约使用日期和时间格式错误' })
    }
    const newApplication = new Application({
      applicantName: req.body.applicantName,
      applicantId: req.body.applicantId,
      phone: req.body.phone,
      major: req.body.major,
      courseName: req.body.courseName,
      teacherName: req.body.teacherName,
      device: req.body.device,
      reason: req.body.reason,
      fileUrl: req.file.path,
      usageDateTime: usageDate
    })
    const savedApp = await newApplication.save()
    res.json({ success: true, application: savedApp })
  } catch (error) {
    console.error('上传错误：', error)
    res.status(500).json({ success: false, message: error.message })
  }
}
