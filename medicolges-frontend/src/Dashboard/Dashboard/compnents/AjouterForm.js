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
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; 
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
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core/";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import IconButton from "../../../components/Button/IconButton";
import { FaSave } from "react-icons/fa";
import { addForm, } from "../compnents/api/index";
import Switch from '@mui/material/Switch';

const AjouterForm = () => {
  const [formData, setFormData] = useState({});
  const [selectedName, setSelectedName] = useState("Dashboard");
  const dispatch = useDispatch();
  const classes = useStyles();
  const location = useLocation();
  const [canEditQuestions, setcanEditQuestions] = useState(true);
  //togle
  const handleToggleChange = (questionId, checked) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      questions: prevFormData.questions.map((question) => {
        if (question.id === questionId) {
          return {
            ...question,
            responseValue: checked // Met à jour la valeur de responseValue avec l'état du commutateur
          };
        }
        return question;
      })
    }));
  };
  
  useEffect(() => {
    if (location.state && location.state.formData) {
      console.log(location.state.formData);
      setcanEditQuestions(false);
      setFormData(location.state.formData);
    }
  }, [location.state]);
  const [multipleChoiceAnswers, setMultipleChoiceAnswers] = useState({});
  const handleSave = async (e) => {
    e.preventDefault();
    createForm();
  };
  const createForm = () => {
    console.log("ggggggggggggggggggggg", formData.responseValue);

    addForm({
      name: formData.name,
      questions: JSON.stringify(formData.questions),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleResponse = (id, responseValue, responseType) => {
    console.log(id, responseValue, responseType);
    switch (responseType) {
      case "toggle":
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.map((obj) => {
        if (obj.id === id) {
          return { ...obj, responseValue: responseValue };
        }
        return obj;
      }),
    }));
    break;
      case "text":
        setFormData((prev) => ({
          ...prev,
          ["questions"]: prev.questions.map((obj) => {
            if (obj.id === id) {
              // Update the properties for the object with id 2
              return { ...obj, responseValue: responseValue }; // Add or update other properties as needed
            }
            // If the id doesn't match, return the original object
            return obj;
          }),
        }));
        break;
        case "telephone":
          setFormData((prev) => ({
            ...prev,
            ["questions"]: prev.questions.map((obj) => {
              if (obj.id === id) {
                // Mettre à jour les propriétés pour l'objet avec l'id correspondant
                return { ...obj, responseValue: responseValue }; // Ajouter ou mettre à jour d'autres propriétés si nécessaire
              }
              // Si l'id ne correspond pas, retourner l'objet original
              return obj;
            }),
          }));
          break;
      case "paragraph":
        setFormData((prev) => ({
          ...prev,
          ["questions"]: prev.questions.map((obj) => {
            if (obj.id === id) {
              // Update the properties for the object with id 2
              return { ...obj, responseValue: responseValue }; // Add or update other properties as needed
            }
            // If the id doesn't match, return the original object
            return obj;
          }),
        }));
        break;
      case "gender":
        if (responseValue === "Homme" || responseValue === "Femme") {
          setFormData((prev) => ({
            ...prev,
            questions: prev.questions.map((obj) => {
              if (obj.id === id) {
                return {
                  ...obj,
                  responseValue: responseValue,
                  questionType: "gender",
                };
              }
              return obj;
            }),
          }));
        }
        break;
      case "date":
        setFormData((prev) => ({
          ...prev,
          ["questions"]: prev.questions.map((obj) => {
            if (obj.id === id) {
              // Update the properties for the object with id 2
              return { ...obj, responseValue: responseValue }; // Add or update other properties as needed
            }
            // If the id doesn't match, return the original object
            return obj;
          }),
        }));
        break;
      case "time":
        // Mise à jour de la réponse pour le type 'time'
        setFormData((prev) => ({
          ...prev,
          questions: prev.questions.map((obj) => {
            if (obj.id === id) {
              return { ...obj, responseValue: responseValue };
            }
            return obj;
          }),
        }));
        break;
      case "file":
        // const file = responseValue;
        // console.log("ggggggggggggggggggggggg",file)
        // const reader = new FileReader();
        // reader.readAsDataURL(file);
        // reader.onload = () => {
        //   const fileContent  = reader.result;
        //   setFormData((prev) => ({
        //     ...prev,
        //     questions: prev.questions.map((obj) => {
        //       if (obj.id === id) {
        //         return { ...obj, responseValue: file }; // Mettre à jour la valeur de réponse avec le contenu du fichier
        //       }
        //       return obj;
        //     }),
        //   }));
        // };
        // break;
        const fileName = responseValue.name; // Récupérer le nom du fichier
        setFormData((prev) => ({
          ...prev,
          questions: prev.questions.map((obj) => {
            if (obj.id === id) {
              return { ...obj, responseValue: fileName };
            }
            return obj;
          }),
        }));
        break;
        case "number":
          // Mise à jour de la réponse pour le type 'number'
          setFormData((prev) => ({
            ...prev,
            questions: prev.questions.map((obj) => {
              if (obj.id === id) {
                return { ...obj, responseValue: responseValue };
              }
              return obj;
            }),
          }));
          break;
      case "multipleChoice":
        setFormData((prev) => ({
          ...prev,
          ["questions"]: prev.questions.map((obj) => {
            if (obj.id === id) {
              // Update the properties for the object with id 2
              return {
                ...obj,
                responseValue: { selectedValue: "", options: [""] },
              }; // Add or update other properties as needed
            }
            // If the id doesn't match, return the original object
            return obj;
          }),
        }));
        break;
      case "combobox":
        setFormData((prev) => ({
          ...prev,
          ["questions"]: prev.questions.map((obj) => {
            if (obj.id === id) {
              // Update the properties for the object with id 2
              return {
                ...obj,
                ["responseValue"]: {
                  ...obj.responseValue,
                  ["checked"]: obj.responseValue.checked.includes(responseValue)
                    ? obj.responseValue.checked.filter(
                        (x) => x != responseValue
                      )
                    : obj.responseValue.checked.push(responseValue),
                },
              }; // Add or update other properties as needed
            }
            // If the id doesn't match, return the original object
            return obj;
          }),
        }));
        break;
        case "email":
          setFormData((prev) => ({
            ...prev,
            questions: prev.questions.map((obj) => {
              if (obj.id === id) {
                return { ...obj, responseValue: responseValue };
              }
              return obj;
            }),
          }));
          break;
      default:
        break;
    }
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
        case "telephone":
          return (
            <PhoneInput
            placeholder="Enter phone number"
            value={question.responseValue}
            onChange={(value, country) => {
              handleResponse(question.id, value, "telephone");
            }}
            countryCodeEditable={false} // Empêche l'édition manuelle du code de pays
            enableSearch={true} // Activer la recherche pour choisir le code de pays
            style={{ width: '50px', height: '30px', fontSize: '14px' }} // Styles personnalisés pour ajuster la taille
          />
        );
        case "toggle":
          return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={question.responseValue} // Utilisez responseValue pour indiquer si le toggle est activé ou désactivé
                    onChange={(e) => {
                      handleToggleChange(question.id, e.target.checked); // Mettez à jour la valeur de la réponse avec l'état du toggle
                    }}
                  />
                }
                label="Reponse"
              />
            </div>
          );
        case "email":
          return (
            <TextField
              type="email"
              label="Email"
              placeholder="Enter email"
              variant="outlined"
              value={question.responseValue}
              onChange={(e) => {
                handleResponse(question.id, e.target.value, "email");
              }}
              fullWidth
            />
          );
        case "number":
          return (
            <TextField
              name="numberAnswer"
              type="number"
              variant="outlined"
              value={question.responseValue}
              onChange={(e) => {
                handleResponse(question.id, e.target.value, "number");
              }}
              label={question.questionType === "number" ? "Your Number Answer" : ""}
              fullWidth
            />
          );
      case "gender":
        return (
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="gender-select">Gender</InputLabel>
            <Select
              label="Gender"
              value={formData.gender || ""}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
              inputProps={{
                name: "gender",
                id: "gender-select",
              }}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>
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
      case "time":
        return (
          <TextField
            name="timeAnswer"
            type="time"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
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

      case "combobox":
        return (
          <div>
            {[...Array(question.optionsCount)].map((item, index) => (
              <div key={index}>
                {/* <TextField
                  name={`input_${index}`} 
                  label={` ${question.question}`}
                  fullWidth
                  value={
                    question.question
                  }
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      ["questions"]: prev.questions.map((obj) => {
                        if (obj.id === question.id) {
                          // Update the properties for the object with id 2
                          return {
                            ...obj,
                            responseValue: {
                              ...obj.responseValue,
                              ["checkboxes"]: obj.responseValue.checkboxes.map(
                                (x, i) => (i == index ? e.target.value : x)
                              ),
                            },
                          }; // Add or update other properties as needed
                        }
                        // If the id doesn't match, return the original object
                        return obj;
                      }),
                    }));
                  }}
                  disabled
                  
                /> */}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={question.responseValue.checked.includes(question.responseValue.checkboxes[index])}
                      onChange={(event) => {
                        handleResponse(
                          question.id,
                          question.responseValue.checkboxes[index],
                          "combobox",
                          null
                        );
                      }}
                    />
                  }
                  label={` ${question.responseValue.checkboxes[index]}`} // Mettez à jour le label en conséquence
                />
              </div>
            ))}
          </div>
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
                    onClick={handleSave}
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
