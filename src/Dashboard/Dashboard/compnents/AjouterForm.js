import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
//SuperAdminLayout/Layout
import Title from "../../../components/Title/Title";
import Layout from "../../../Dashboard/SuperAdminLayout/Layout";
import "../../Dashboard/Dashboard.css";
import { AppBar } from "@material-ui/core";
import useStyles from "../../../styless";
import { useDispatch } from "react-redux";
import Dashboard from "../Dashboard"; // Import the Dashboard component
import {
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox,
} from "@material-ui/core/";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import IconButton from "../../../components/Button/IconButton";
import { FaSave } from "react-icons/fa";

const AjouterForm = () => {
  const [formData, setFormData] = useState({});
  const [selectedName, setSelectedName] = useState("Dashboard");
  const dispatch = useDispatch();
  const classes = useStyles();
  const location = useLocation();
  const [canEditQuestions, setcanEditQuestions] = useState(true);
  useEffect(() => {
    if (location.state && location.state.formData) {
      console.log(location.state.formData);
      setcanEditQuestions(false);
      setFormData(location.state.formData);
    }
  }, [location.state]);
  const [multipleChoiceAnswers, setMultipleChoiceAnswers] = useState({});

  const handleResponse = (questionId, answer, answerType) => {
    // Logique pour gérer la réponse de l'utilisateur
    console.log("Question ID:", questionId);
    console.log("Answer:", answer);
    console.log("Answer Type:", answerType);
  };

  const handleMultipleChoiceResponse = (questionId, option) => {
    // Logique pour gérer les réponses de choix multiples
    setMultipleChoiceAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: option,
    }));
  };
  const handleOptionInputChange = (questionId, optionIndex, value) => {
    const updatedOptions = formData.questions.map((question) => {
      if (question.id === questionId) {
        return {
          ...question,
          responseValue: {
            ...question.responseValue,
            options: question.responseValue.options.map((opt, index) => {
              if (index === optionIndex) {
                return value;
              }
              return opt;
            }),
          },
        };
      }
      return question;
    });
    setFormData((prevFormData) => ({
      ...prevFormData,
      questions: updatedOptions,
    }));
  };
  const renderInputField = (question) => {
    console.log("im here");
    switch (question.questionType) {
      case "date":
        return (
          <TextField
            name="dateAnswer"
            type="date"
            variant="outlined"
            fullWidth
          />
        );
      case "paragraph":
        return (
          <TextField
            name="paragraphAnswer"
            multiline
            rows={4}
            variant="outlined"
            label="Your Paragraph Answer"
            fullWidth
          />
        );
      case "text":
        return (
          <TextField
            name="textAnswer"
            variant="outlined"
            label="Your Text Answer"
            fullWidth
          />
        );
      case "file":
        return (
          <div style={{ marginLeft: "-1017px" }}>
            <input
              type="file"
              onChange={(event) =>
                handleResponse(question.id, event.target.files[0], "file")
              }
            />
          </div>
        );
      case "dropdown":
        return (
          <TextField
            name="dropdownAnswer"
            select
            variant="outlined"
            label="Your Dropdown Answer"
            fullWidth
          />
        );
      case "multipleChoice":
        return (
          <FormControl component="fieldset">
            <FormGroup>
              {question.responseValue.options.map((option, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                  <FormControlLabel
                    control={<Radio />}
                    checked={multipleChoiceAnswers[question.id] === option}
                    onChange={() =>
                      handleMultipleChoiceResponse(question.id, option)
                    }
                  />
                  <TextField
                    disabled={!canEditQuestions}
                    variant="outlined"
                    value={option}
                    onChange={(e) =>
                      handleOptionInputChange(
                        question.id,
                        index,
                        e.target.value
                      )
                    }
                    fullWidth
                    style={{ width: "1258px" }}
                  />
                  {/* Afficher la réponse de l'utilisateur pour cette option */}
                </div>
              ))}
            </FormGroup>
          </FormControl>
        );
      default:
        return null;
    }
  };
  return (
    <Layout selectedName={selectedName}>
      <Container fluid className="mt-4" style={{ height: "100vh" }}>
        <Card className="card h-100" style={{ overflowY: "auto" }}>
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
              </Col>
              <Col xs={12} md={12} className="text-center">
                <div>
                  {formData && (
                    <>
                      <CardContent
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "0px",
                          marginBottom: "4px",
                        }}
                      >
                        <div
                          style={{ marginLeft: "18px", marginRight: "10px" }}
                        >
                          <Title
                            secondTitle={"Name of the questionnaire:"}
                            fontSize={"18px"} // Taille de police identique
                            fontWeight={600} // Poids de police identique
                            className={"mb-2"}
                            style={{
                              marginBottom: "0px",
                              marginRight: "7px",
                              fontFamily: "Arial, sans-serif",
                            }} // Police de caractères identique
                          />
                        </div>
                        <div>
                          {formData && (
                            <Typography
                              className={classes.title}
                              gutterBottom
                              variant="h5"
                              component="h2"
                              style={{
                                marginBottom: "7px",
                                fontSize: "18px",
                                fontFamily: "Arial, sans-serif",
                              }} // Taille de police et police de caractères identiques
                            >
                              {formData.name}
                            </Typography>
                          )}
                        </div>
                      </CardContent>
                      <CardContent>
                        {formData.questions &&
                          Array.isArray(formData.questions) &&
                          formData.questions.map((question, index) => (
                            <div key={index} style={{ marginBottom: "20px" }}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  paddingBottom: "8px",
                                }}
                              >
                                <Typography
                                  variant="body1"
                                  style={{
                                    fontSize: "18px", // Taille de police identique
                                    fontWeight: 600, // Poids de police identique
                                    fontFamily: "Arial, sans-serif", // Police de caractères identique
                                    paddingBottom: "8px", // Espacement en bas identique
                                  }}
                                >
                                  Question {index + 1}: {question.question}
                                </Typography>
                                {/* <Typography variant="body1">
                                                            Question Type: {question.questionType}
                                                        </Typography> */}
                              </div>
                              {/* Render input field based on question type */}
                              {renderInputField(question)}
                            </div>
                          ))}
                      </CardContent>
                    </>
                  )}
                </div>
                <div className="col-md-12 col-xs-12 d-flex justify-content-end">
                  <IconButton
                    className="h-100 border-0"
                    style={{
                      background: "#047db9",
                      color: "white",
                      fontSize: "16px",
                      fontWeight: 600,
                      padding: "8px 16px",
                      borderRadius: "20px",
                    }}
                    startIcon={<FaSave />}
                    fullWidth // Add fullWidth prop to make button take full width
                  >
                    <Title title={"Save"} /> {/* Change the button label */}
                  </IconButton>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </Layout>
  );
};
export default AjouterForm;
