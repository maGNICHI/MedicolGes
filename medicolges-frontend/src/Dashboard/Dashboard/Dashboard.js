import React, { useState } from "react";
import { Card, Container } from "react-bootstrap";
import Title from "../../components/Title/Title";
import Layout from "../SuperAdminLayout/Layout";
import './Dashboard.css'

function Dashboard() {
  const [selectedName, setSelectedName] = useState("Dashboard");

  return (
    <Layout selectedName={selectedName}>
      <Container fluid className="mt-4 h-screen">
        <Card className="card h-screen" >
          <Card.Body style={{ backgroundColor: "#ffffffa9", padding: "20px", borderRadius: "20px" }}>
            <Title title={"Dashboard"} fontWeight={600} fontSize={"24px"} />
            <hr />
            {/* Your dashboard content here */}
          </Card.Body>
        </Card>
      </Container>
    </Layout>
  );
}

export default Dashboard;
