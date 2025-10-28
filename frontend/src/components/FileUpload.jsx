import { useState } from 'react'
import './FileUpload.css'

const FileUpload = ({ onFileSelect, accept = ".pdf,.doc,.docx", maxSize = 5, className = "" }) => {
  const [isDragOver, setIsDragOver] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [error, setError] = useState('')

  const validateFile = (file) => {
    const maxSizeInMB = maxSize
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024
    
    if (file.size > maxSizeInBytes) {
      setError(`File size must be less than ${maxSizeInMB}MB`)
      return false
    }

    const allowedTypes = accept.split(',').map(type => type.trim())
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase()
    
    if (!allowedTypes.includes(fileExtension)) {
      setError(`Only ${accept} files are allowed`)
      return false
    }

    setError('')
    return true
  }

  const handleFileSelect = (file) => {
    if (validateFile(file)) {
      setSelectedFile(file)
      if (onFileSelect) {
        onFileSelect(file)
      }
    }
  }

  const handleFileInputChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setIsDragOver(false)
    
    const files = event.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleDragOver = (event) => {
    event.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (event) => {
    event.preventDefault()
    setIsDragOver(false)
  }

  const handleClick = () => {
    document.getElementById('file-input').click()
  }

  const clearFile = () => {
    setSelectedFile(null)
    setError('')
    if (onFileSelect) {
      onFileSelect(null)
    }
  }

  return (
    <div className={`file-upload-container ${className}`}>
      <div 
        className={`file-upload-box ${isDragOver ? 'drag-over' : ''} ${selectedFile ? 'file-selected' : ''}`}
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          id="file-input"
          accept={accept}
          onChange={handleFileInputChange}
          style={{ display: 'none' }}
        />
        
        {selectedFile ? (
          <div className="file-selected-content">
            <div className="file-icon">📄</div>
            <div className="file-info">
              <h4>{selectedFile.name}</h4>
              <p>{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
            <button 
              className="remove-file-btn"
              onClick={(e) => {
                e.stopPropagation()
                clearFile()
              }}
            >
              ✕
            </button>
          </div>
        ) : (
          <div className="file-upload-content">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="upload-icon">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            <h3>Upload Your Resume</h3>
            <p>Click to upload or drag and drop</p>
            <span className="file-formats">{accept.toUpperCase()} (Max {maxSize}MB)</span>
          </div>
        )}
      </div>
      
      {error && (
        <div className="file-upload-error">
          {error}
        </div>
      )}
    </div>
  )
}

export default FileUpload
