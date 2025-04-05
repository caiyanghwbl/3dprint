// frontend/src/components/FileUpload.js
import React, { useState } from 'react'
import axios from 'axios'
function FileUpload({ onSuccess, onViewReservations }) {
  const [applicantName, setApplicantName] = useState('')
  const [applicantId, setApplicantId] = useState('')
  const [phone, setPhone] = useState('')
  const [major, setMajor] = useState('')
  const [courseName, setCourseName] = useState('')
  const [teacherName, setTeacherName] = useState('')
  const [device, setDevice] = useState('激光切割机')
  const [reason, setReason] = useState('')
  const [usageDateTime, setUsageDateTime] = useState('')
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [fileError, setFileError] = useState('')
  const allowedExtensions = ['.stl', '.obj', '.3mf']
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      const ext = selectedFile.name.slice(selectedFile.name.lastIndexOf('.')).toLowerCase()
      if (!allowedExtensions.includes(ext)) {
        setFileError('不支持的文件格式，仅允许上传: ' + allowedExtensions.join(', '))
        setFile(null)
      } else {
        setFileError('')
        setFile(selectedFile)
      }
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!applicantName || !applicantId || !phone || !major || !courseName || !teacherName || !device || !reason || !usageDateTime || !file) {
      alert('请填写所有必填项！')
      return
    }
    const formData = new FormData()
    formData.append('file', file)
    formData.append('applicantName', applicantName)
    formData.append('applicantId', applicantId)
    formData.append('phone', phone)
    formData.append('major', major)
    formData.append('courseName', courseName)
    formData.append('teacherName', teacherName)
    formData.append('device', device)
    formData.append('reason', reason)
    formData.append('usageDateTime', usageDateTime)
    setUploading(true)
    try {
      const res = await axios.post('http://45.63.15.45:3001/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      onSuccess(res.data.application._id)
    } catch (err) {
      console.error(err)
    }
    setUploading(false)
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>申请人姓名: </label>
        <input type="text" value={applicantName} onChange={(e) => setApplicantName(e.target.value)} required />
      </div>
      <div>
        <label>学号/工号: </label>
        <input type="text" value={applicantId} onChange={(e) => setApplicantId(e.target.value)} required />
      </div>
      <div>
        <label>个人电话: </label>
        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      </div>
      <div>
        <label>专业: </label>
        <input type="text" value={major} onChange={(e) => setMajor(e.target.value)} required />
      </div>
      <div>
        <label>课程名称: </label>
        <input type="text" value={courseName} onChange={(e) => setCourseName(e.target.value)} required />
      </div>
      <div>
        <label>任课老师: </label>
        <input type="text" value={teacherName} onChange={(e) => setTeacherName(e.target.value)} required />
      </div>
      <div>
        <label>申请设备: </label>
        <select value={device} onChange={(e) => setDevice(e.target.value)} required>
          <option value="激光切割机">激光切割机</option>
          <option value="FDM打印机">FDM打印机</option>
          <option value="光固化打印机">光固化打印机</option>
        </select>
      </div>
      <div>
        <label>申请原因: </label>
        <input type="text" value={reason} onChange={(e) => setReason(e.target.value)} required />
      </div>
      <div>
        <label>申请使用日期和时间: </label>
        <input type="datetime-local" value={usageDateTime} onChange={(e) => setUsageDateTime(e.target.value)} required />
      </div>
      <div>
        <label>上传文件: </label>
        <input type="file" onChange={handleFileChange} required />
        {fileError && <span style={{ color: 'red', marginLeft: '10px' }}>{fileError}</span>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
        <button type="submit" disabled={uploading}>
          {uploading ? '上传中...' : '提交申请'}
        </button>
        <button type="button" onClick={onViewReservations}>
          查看预约
        </button>
      </div>
    </form>
  )
}
export default FileUpload
