const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  applicantName: { type: String, required: true },
  applicantId: { type: String, required: true }, // 新增字段
  fileUrl: { type: String },
  approvalStatus: { type: String, default: 'Pending' },
  signature: { type: String },
  pdfUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', ApplicationSchema);
