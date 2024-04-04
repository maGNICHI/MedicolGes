import React, { useState } from "react";
import "./FileInput.css";

export default function FileInput({ onChange }) {
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");

  const handleDragOver = (e) => {
    e.preventDefault();
    setError("");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const fileType = file.name.split('.').pop().toLowerCase();
      if (fileType === 'xlsx' || fileType === 'xls' || fileType === 'csv') {
        setFileName(file.name);
        onChange({ target: { name: "file", files: [file] } });
      } else {
        setError("Invalid file format. Please drop an Excel (.xlsx, .xls) or CSV (.csv) file.");
      }
    }
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.name.split('.').pop().toLowerCase();
      if (fileType === 'xlsx' || fileType === 'xls' || fileType === 'csv') {
        setFileName(file.name);
        onChange(e);
      } else {
        setError("Invalid file format. Please select an Excel (.xlsx, .xls) or CSV (.csv) file.");
      }
    }
  };

  return (
    // <div className="custom-input-div">
    //   <input className="custom-input" name="file" type="file" accept=".xlsx, .xls, .csv" onChange={onChange} /> {/* Pass onChange prop */}
    //   <svg
    //     xmlns="http://www.w3.org/2000/svg"
    //     width="1em"
    //     height="1em"
    //     strokeLinejoin="round"
    //     strokeLinecap="round"
    //     viewBox="0 0 24 24"
    //     strokeWidth="2"
    //     fill="none"
    //     stroke="currentColor"
    //     className="custom-icon"
    //   >
    //     <polyline points="16 16 12 12 8 16"></polyline>
    //     <line y2="21" x2="12" y1="12" x1="12"></line>
    //     <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
    //     <polyline points="16 16 12 12 8 16"></polyline>
    //   </svg>
    // </div>
    <form className="file-upload-form" onDragOver={handleDragOver} onDrop={handleDrop}>
      <label htmlFor="file" className="file-upload-label">
        <div className="file-upload-design">
          <svg viewBox="0 0 640 512" height="1em">
            <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
          </svg>
          <p>{fileName || "Drag and Drop Or Click To Browse file"}</p>
        </div>
        <input
          id="file"
          name="file"
          type="file"
          accept=".xlsx, .xls, .csv"
          onChange={handleChange}
        />
      </label>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
