const Application = require('../models/Application');

exports.saveSignature = async (req, res) => {
  try {
    const { applicationId, signatureData } = req.body; // signatureData 为Base64字符串
    const application = await Application.findById(applicationId);
    if (!application) return res.status(404).json({ message: 'Application not found' });
    
    application.signature = signatureData;
    await application.save();
    
    res.json({ success: true, application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
