import React, { useState } from "react";
import Layout from "../SuperAdminLayout/Layout";
import { Card, Col, Container, Row } from "react-bootstrap";
import Title from "../../components/Title/Title";
import IconButton from "../../components/Button/IconButton";
import { FaPlus } from "react-icons/fa";
import CheckTable from "../../components/Table/UserTable";
import "../Dashboard/Dashboard.css"
import OrganizationTable from "../../components/Table/OrganizationTable";

export default function OrganizationList() {
  const [selectedName, setSelectedName] = useState("Organization Management");

  return (
    <Layout selectedName={selectedName}>
      <Container fluid className="mt-4 h-screen" style={{overflowY: "auto", maxHeight:"100%", zIndex:0}}>
        <Card className="card">
          <Card.Header
            style={{ padding: "20px" }}
          >
            <Row className="align-items-center">
              <Col xs={12} md={9}>
                <Title title={"Organization List"} fontWeight={600} fontSize={"24px"} />
              </Col>
              <Col xs={12} md={3} className="text-md-end mt-3 mt-md-0">
                <IconButton
                  className="h-100 border-0"
                  style={{
                    background: "#0ea9f991",
                    color: "white",
                    fontSize: "16px",
                    fontWeight: 600,
                    padding: "8px 16px",
                    borderRadius: "20px",
                  }}
                  startIcon={<FaPlus />}
                >
                  <Title title={"Add Organization"} />
                </IconButton>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body className="p-0">
              <OrganizationTable />
          </Card.Body>
        </Card>
      </Container>
    </Layout>
  );
}
