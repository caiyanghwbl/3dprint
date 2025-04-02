const Application = require('../models/Application');

exports.uploadFile = async (req, res) => {
  try {
    console.log('上传的文件信息:', req.file);
    if (!req.file) {
      return res.status(400).json({ message: '未检测到文件上传' });
    }
    const newApplication = new Application({
      applicantName: req.body.applicantName,
      applicantId: req.body.applicantId, // 保存学号/工号
      fileUrl: req.file.path
    });
    const savedApp = await newApplication.save();
    res.json({ success: true, application: savedApp });
  } catch (error) {
    console.error('上传错误：', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
