import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Title from "../../components/Title/Title";
import Layout from "../SuperAdminLayout/Layout";
import "../Dashboard/Dashboard.css";
 import useStyles from "../../styless";
import { useDispatch } from "react-redux";
import { getForms } from "../../actions/cards";
import Form from "../Dashboard/compnents/Form/Form";
import '../Dashboard.css'
import { Box, Text } from "@chakra-ui/react";

function Dashboard() {
  const [selectedName, setSelectedName] = useState("Form Generation");
  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    dispatch(getForms());
  }, [dispatch]);

  return (
    <Layout selectedName={selectedName}>
      <Container fluid className="mt-4" style={{ height: "screen" }}>
        <Card className="card h-100" >
          <Card.Body
            style={{
              backgroundColor: "#ffffffa9",
              padding: "20px",
              borderRadius: "20px",
            }}
          >
            <Title title={"Create Form"} fontWeight={600} fontSize={"24px"} />
            <hr />
            <Row>
              <Col xs={12} md={12} className="text-center">
              <Box
                  className={ classes.appBar}
                  position="static"
                  color="inherit"
                  style={{
                    height: "450px",
                    backgroundImage: `url(${process.env.PUBLIC_URL}/images/Background/background.png)`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                >
                  <Text
                    as="h1"
                    fontSize="90px"
                    color="black"
                    fontWeight={900}
                  >
                    Form Generation
                  </Text>
                </Box>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={12}>
                <Form />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </Layout>
  );
}

export default Dashboard;
