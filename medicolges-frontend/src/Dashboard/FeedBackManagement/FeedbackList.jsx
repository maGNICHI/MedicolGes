import React, { useState } from "react";
import Layout from "../SuperAdminLayout/Layout";
import { Card, Col, Container, Row } from "react-bootstrap";
import Title from "../../components/Title/Title";
import IconButton from "../../components/Button/IconButton";
import { FaPlus } from "react-icons/fa";
import CheckTable from "../../components/Table/UserTable";
import "../Dashboard/Dashboard.css"
import FeedbackTable from "../../components/Table/FeedbackList";

export default function FeedbackList() {
  const [selectedName, setSelectedName] = useState("Feedback Management");

  return (
    <Layout selectedName={selectedName}>
      <Container fluid className="mt-4 h-screen" style={{overflowY: "auto", maxHeight:"100%", zIndex:0}}>
        <Card className="card">
          <Card.Header
            style={{ padding: "20px" }}
          >
            <Row className="align-items-center">
              <Col xs={12} md={12}>
                <Title title={"Feedback List"} fontWeight={600} fontSize={"24px"} />
              </Col>
            </Row>
          </Card.Header>
          <Card.Body className="p-0">
              <FeedbackTable fee />
          </Card.Body>
        </Card>
      </Container>
    </Layout>
  );
}
