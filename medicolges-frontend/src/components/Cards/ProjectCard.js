import React from 'react';
import './ProjectCard.css';
import IconButton from '../Button/IconButton';

export default function ProjectCard() {
  return (
    <div md={3} xs={12} className="project-card">
      <div className="project-top-section">
        <div className="project-border"></div>
        <div className="project-icons">
          <div className="project-logo">
          </div>
        </div>
      </div>
      <div className="project-bottom-section">
        <span className="project-title">UNIVERSE OF UI</span>
        <div className="project-row row1">
          <div className="project-item">
            <span className="project-big-text">2626</span>
            <span className="project-regular-text">UI elements</span>
          </div>
          <div className="project-item">
            <span className="project-big-text">100%</span>
            <span className="project-regular-text">Free for use</span>
          </div>
        </div>
        <div className="project-row row2">
          <div className="project-item flex justify-items-center justify-content-center">
            <span><IconButton >Contributors</IconButton></span>
          </div>
        </div>
      </div>
    </div>
  )
}
