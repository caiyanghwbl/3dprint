// frontend/src/App.js
import React, { useState } from 'react'
import FileUpload from './components/FileUpload'
import SignaturePadComponent from './components/SignaturePad'
import ReservationView from './components/ReservationView'
import axios from 'axios'
import './App.css'

function App() {
  const [applicationId, setApplicationId] = useState(null)
  const [pdfUrl, setPdfUrl] = useState(null)
  const [viewMode, setViewMode] = useState('upload')

  const handleFileUploadSuccess = (id) => {
    setApplicationId(id)
    setViewMode('signature')
  }

  const handleSignatureSubmit = async (signatureData) => {
    if (!applicationId) return
    try {
      await axios.post('http://45.63.15.45:3001/api/signature', {
        applicationId,
        signatureData
      })
      const res = await axios.post('http://45.63.15.45:3001/api/generate-pdf', { applicationId })
      setPdfUrl(res.data.pdfUrl)
      setViewMode('pdf')
    } catch (err) {
      console.error(err)
    }
  }

  const handleReturnHome = () => {
    setApplicationId(null)
    setPdfUrl(null)
    setViewMode('upload')
  }

  return (
    <div style={{ margin: '20px' }}>
      <h1>南京艺术学院3D打印设备使用申请系统</h1>
      {viewMode === 'upload' && (
        <>
          <p style={{ textAlign: 'center', color: 'red' }}>仅允许上传以下格式的文件: .stl, .obj, .3mf</p>
          <FileUpload
            onSuccess={handleFileUploadSuccess}
            onViewReservations={() => setViewMode('reservation')}
          />
        </>
      )}
      {viewMode === 'signature' && (
        <SignaturePadComponent onSubmit={handleSignatureSubmit} />
      )}
      {viewMode === 'pdf' && (
        <div>
          <h2>PDF已生成</h2>
          <a href={`http://45.63.15.45:3001/${pdfUrl}`} target="_blank" rel="noopener noreferrer">
            查看PDF文件
          </a>
          <br /><br />
          <button onClick={handleReturnHome}>返回主页</button>
        </div>
      )}
      {viewMode === 'reservation' && (
        <ReservationView onBack={handleReturnHome} />
      )}
    </div>
  )
}

export default App
