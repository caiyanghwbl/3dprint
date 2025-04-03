import React, { useRef, useEffect } from 'react';
import SignaturePad from 'signature_pad';

function SignaturePadComponent({ onSubmit }) {
  const canvasRef = useRef(null);
  const signaturePadRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    signaturePadRef.current = new SignaturePad(canvas);
  }, []);

  const handleClear = () => {
    signaturePadRef.current.clear();
  };

  const handleSubmit = () => {
    if (signaturePadRef.current.isEmpty()) {
      alert("请先签名");
      return;
    }
    const dataUrl = signaturePadRef.current.toDataURL();
    onSubmit(dataUrl);
  };

  return (
    <div>
      <h2>在线签名</h2>
      <canvas ref={canvasRef} width={500} height={200} style={{ border: '1px solid #000' }} />
      <div>
        <button onClick={handleClear}>清除</button>
        <button onClick={handleSubmit}>提交签名</button>
      </div>
    </div>
  );
}

export default SignaturePadComponent;
