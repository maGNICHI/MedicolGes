import React from "react";
import { Col } from "react-bootstrap";
import { FaDatabase } from "react-icons/fa";
import IconButton from "../../../components/Button/IconButton";
import Title from "@material-ui/core/Typography";

export default function ProjectCard({ project }) {
  // Function to truncate the description text
  const truncateDescription = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    } else {
      return text;
    }
  };

  return (
    <div className="box">
      <div className="our-services settings">
        <div className="icon" style={{ background: `linear-gradient(-45deg, #3615e7 0%, #44a2f6 100%)`, borderRadius: "50%", width: "80px", height: "80px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* Circle with a background color */}
          <span style={{ color: "white" }}><FaDatabase /></span>
        </div>
        <h4>{project.name}</h4>
        <p className="pb-3">{truncateDescription(project.description, 100)}</p>
        
        <div className="row">
          <Col md={6} className="mt-2">
            <p style={{fontWeight:"bold"}}>30 Followers</p>
          </Col>
          <Col md={6} className="mb-5">
            <IconButton
              className="border-0 w-100"
              style={{
                background: "linear-gradient(-45deg, #3615e7 0%, #44a2f6 100%)",
                color: "white",
                fontSize: "16px",
                fontWeight: 600,
                padding: "8px 16px",
                borderRadius: "20px",
              }}
            >
              Follow
            </IconButton>
          </Col>
        </div>
      </div>
    </div>
  );
}
