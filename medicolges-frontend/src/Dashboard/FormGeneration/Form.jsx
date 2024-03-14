import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Title from "../../components/Title/Title";
import Layout from "../SuperAdminLayout/Layout";
import "../Dashboard/Dashboard.css";
import { AppBar, T} from "@material-ui/core";
import useStyles from "../../styless";
import { useDispatch } from "react-redux";
import { getForms } from "../../actions/cards";
import Form from "../Dashboard/compnents/Form/Form";
import Customizer from "../Dashboard/compnents/Form/Customizer";

function Dashboard() {
  const [selectedName, setSelectedName] = useState("Form Generation");
  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    dispatch(getForms());
  }, [dispatch]);

  return (
    <Layout selectedName={selectedName}>
      <Container fluid className="mt-4" style={{ height: "100vh" }}>
        {/* <Card className="card h-100" style={{ overflowY: "auto" }}> */}
          {/* <Card.Body
            style={{
              backgroundColor: "#ffffffa9",
              padding: "20px",
              borderRadius: "20px",
            }}
          > */}
            <Title title={"Create Form"} fontWeight={600} fontSize={"24px"} />
            {/* <hr /> */}
          {/* </Card.Body>
        </Card> */}
        <Row className="d-flex justify-content-center justify-elements-center justify-items-center">
              <Col xs={12} md={8} className="text-center">
                <AppBar
                  className={classes.appBar}
                  position="static"
                  color="inherit"
                  style={{
                    height: "450px",
                    backgroundImage: `url(${process.env.PUBLIC_URL}/images/Background/background.png)`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                >
                  <Title
                    secondTitle={"Form Generation"}
                    fontSize={"90px"}
                    color={"black"}
                    fontWeight={900}
                  />
                </AppBar>
                <Form className="-pt-5" />
              </Col>
            </Row>
      </Container>
    </Layout>
  );
}

export default Dashboard;
