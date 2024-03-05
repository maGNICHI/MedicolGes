import React from "react";
import './FileInput.css';

export default function FileInput() {
  return (
    <div className="custom-input-div">
      <input className="custom-input" name="file" type="file" />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        strokeLinejoin="round"
        strokeLinecap="round"
        viewBox="0 0 24 24"
        strokeWidth="2"
        fill="none"
        stroke="currentColor"
        className="custom-icon"
      >
        <polyline points="16 16 12 12 8 16"></polyline>
        <line y2="21" x2="12" y1="12" x1="12"></line>
        <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
        <polyline points="16 16 12 12 8 16"></polyline>
      </svg>
    </div>
  );
}
