// frontend/src/App.js
import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import SignaturePadComponent from './components/SignaturePad';
import axios from 'axios';
import './App.css';


function App() {
  const [applicationId, setApplicationId] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleFileUploadSuccess = (id) => {
    setApplicationId(id);
  };

  const handleSignatureSubmit = async (signatureData) => {
    if (!applicationId) return;
    try {
      // 提交签名
      await axios.post('http://localhost:3001/api/signature', {
        applicationId,
        signatureData
      });
      // 签名后生成PDF
      const res = await axios.post('http://localhost:3001/api/generate-pdf', { applicationId });
      setPdfUrl(res.data.pdfUrl);
    } catch (err) {
      console.error(err);
    }
  };

  const handleReturnHome = () => {
    // 重置状态，返回到初始界面
    setApplicationId(null);
    setPdfUrl(null);
  };

  return (
    <div style={{ margin: '20px' }}>
      <h1>南京艺术学院3D打印设备使用申请系统</h1>
      {!applicationId && <FileUpload onSuccess={handleFileUploadSuccess} />}
      {applicationId && !pdfUrl && (
        <SignaturePadComponent onSubmit={handleSignatureSubmit} />
      )}
      {pdfUrl && (
        <div>
          <h2>PDF已生成</h2>
          <a href={`http://localhost:3001/${pdfUrl}`} target="_blank" rel="noopener noreferrer">
            查看PDF文件
          </a>
          <br /><br />
          <button onClick={handleReturnHome}>返回主页</button>
        </div>
      )}
    </div>
  );
}

export default App;
