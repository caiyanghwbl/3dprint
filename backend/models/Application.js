const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  applicantName: { type: String, required: true },
  applicantId: { type: String, required: true },
  fileUrl: { type: String },
  approvalStatus: { type: String, default: 'Pending' },
  signature: { type: String },
  pdfUrl: { type: String },
  usageDateTime: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', ApplicationSchema);
