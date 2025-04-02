const Application = require('../models/Application');

// 模拟审批处理
exports.approveApplication = async (req, res) => {
  try {
    const { applicationId, approvalStatus } = req.body;
    const application = await Application.findById(applicationId);
    if (!application) return res.status(404).json({ message: 'Application not found' });
    
    application.approvalStatus = approvalStatus;
    await application.save();
    
    res.json({ success: true, application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
