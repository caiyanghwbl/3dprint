import React, { useState } from 'react';
import axios from 'axios';

function FileUpload({ onSuccess }) {
  const [applicantName, setApplicantName] = useState('');
  const [applicantId, setApplicantId] = useState('');
  const [usageDateTime, setUsageDateTime] = useState(''); // 新增状态
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!applicantName || !applicantId || !usageDateTime || !file) {
      alert('请填写所有必填项！');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('applicantName', applicantName);
    formData.append('applicantId', applicantId);
    formData.append('usageDateTime', usageDateTime);
    setUploading(true);
    try {
      const res = await axios.post('http://localhost:3001/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      onSuccess(res.data.application._id);
    } catch (err) {
      console.error(err);
    }
    setUploading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>申请人姓名: </label>
        <input
          type="text"
          value={applicantName}
          onChange={(e) => setApplicantName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>学号/工号: </label>
        <input
          type="text"
          value={applicantId}
          onChange={(e) => setApplicantId(e.target.value)}
          required
        />
      </div>
      <div>
        <label>申请使用日期和时间: </label>
        <input
          type="datetime-local"
          value={usageDateTime}
          onChange={(e) => setUsageDateTime(e.target.value)}
          required
        />
      </div>
      <div>
        <label>上传文件: </label>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
      </div>
      <button type="submit" disabled={uploading}>
        {uploading ? '上传中...' : '提交申请'}
      </button>
    </form>
  );
}

export default FileUpload;
