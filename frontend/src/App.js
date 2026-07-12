import { useState } from 'react';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (file) => {
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleFileChange = (e) => handleFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: "Something went wrong. Is the Flask server running?" });
    }
    setLoading(false);
  };

  const isHealthy = result?.disease?.toLowerCase().includes("healthy");

  return (
    <div className="app">
      <div className="card">
        <div className="header">
          <span className="leaf-icon">🌿</span>
          <h1>Leaf Disease Classifier</h1>
          <p>AI-powered plant health detection — upload a leaf, get instant results</p>
        </div>

        <div
          className={`dropzone ${dragActive ? "active" : ""} ${preview ? "has-image" : ""}`}
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          onClick={() => document.getElementById("fileInput").click()}
        >
          {preview ? (
            <img src={preview} alt="preview" className="preview-img" />
          ) : (
            <>
              <div className="upload-icon">📤</div>
              <p className="dropzone-text">Drag & drop a leaf photo here</p>
              <p className="dropzone-subtext">or click to browse</p>
            </>
          )}
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>

        {selectedFile && (
          <button className="analyze-btn" onClick={handleUpload} disabled={loading}>
            {loading ? (
              <span className="spinner"></span>
            ) : (
              "🔍 Analyze Leaf"
            )}
          </button>
        )}

        {result && !result.error && (
          <div className={`result-card ${isHealthy ? "healthy" : "diseased"}`}>
            <div className="result-icon">{isHealthy ? "✅" : "⚠️"}</div>
            <div className="result-text">
              <h2>{result.disease.replace(/_/g, " ")}</h2>
              <div className="confidence-bar-bg">
                <div
                  className="confidence-bar-fill"
                  style={{ width: `${result.confidence}%` }}
                ></div>
              </div>
              <p>{result.confidence}% confidence</p>
            </div>
          </div>
        )}

        {result && result.error && (
          <div className="error-box">⚠️ {result.error}</div>
        )}
      </div>
    </div>
  );
}

export default App;