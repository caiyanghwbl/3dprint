// backend/models/Application.js
const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  applicantName: { type: String, required: true },
  applicantId: { type: String, required: true },
  phone: { type: String, required: true },
  major: { type: String, required: true },
  courseName: { type: String, required: true },
  teacherName: { type: String, required: true },
  device: { type: String, required: true },
  reason: { type: String, required: true },
  fileUrl: { type: String },
  approvalStatus: { type: String, default: 'Pending' },
  signature: { type: String },
  pdfUrl: { type: String },
  usageDateTime: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', ApplicationSchema);
