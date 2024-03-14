import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Title from "../../../../components/Title/Title";
import IconButton from "../../../../components/Button/IconButton";
import { FaDownload } from "react-icons/fa";
import axios from "axios";

export default function Details({ projectData, organization }) {
    const downloadFile = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/project/download/${projectData.file}`, {
            responseType: 'blob',
          });
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', projectData.file);
          document.body.appendChild(link);
          link.click();
        } catch (error) {
          console.error("Error downloading file:", error);
        }
      };    
    return (
    <Card className="mt-5 mx-1 px-4 py-3" style={{ background: "#3b47ec26" }}>
      <Row>
        <Col md={9} xs={12}>
          <Title
            title={`This Project Is Created Under The Organization "${organization.name}"`}
            fontWeight={600}
            fontSize={"20px"}
            className={"text-center"}
          />
          <br />
          <br />
          <div className="details-item">
            <Title
              title={"Address Of The Organization: "}
              fontWeight={600}
              fontSize={"16px"}
              className="inline-title"
            />
            <p className="inline-content">{organization.address}</p>
          </div>
          <div className="details-item">
            <Title
              title={"The Organization Contact: "}
              fontWeight={600}
              fontSize={"16px"}
              className="inline-title"
            />
            <p className="inline-content">{organization.phoneNumber}</p>
          </div>
          <hr />
        </Col>
        <Col md={3} className="d-none d-md-block">
          <img
            src={process.env.PUBLIC_URL + "/images/avatar/useravatar.jpg"}
            alt="organization"
          />
        </Col>
      </Row>
      <Row className="mb-5">
        <div>
          <Title
            title={"Description Of The Project: "}
            fontWeight={600}
            fontSize={"16px"}
            className="inline-title"
          />
          <p className="inline-content">{projectData.description}</p>
        </div>
      </Row>
      <Row className="justify-content-center">
        <Col xs={6} md={4}>
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
            endIcon={<FaDownload />}
            onClick={downloadFile}
          >
            Download Data
          </IconButton>
        </Col>
        <Col xs={6} md={4}>
          <IconButton
            className="border-0 w-100 mt-3 mt-md-0"
            style={{
              background: "linear-gradient(-45deg, #3615e7 0%, #44a2f6 100%)",
              color: "white",
              fontSize: "16px",
              fontWeight: 600,
              padding: "8px 16px",
              borderRadius: "20px",
            }}
          >
            Answer Questionnaire
          </IconButton>
        </Col>
      </Row>
    </Card>
  );
}
