import React, { useState } from "react";
import FileBase from "react-file-base64";

import {
  TextField,
  Button,
  Typography,
  Paper,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  Radio,
  FormControlLabel,
  Container,
  Grid
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
//import { createForm } from '../../api'
import DeleteIcon from "@material-ui/icons/Delete";
import { useEffect } from "react";
import { addForm } from "../api/index";
import Title from "../../../../components/Title/Title";
import { Row } from "react-bootstrap";
import IconButton from "../../../../components/Button/IconButton";
import { FaPlus, FaSave, FaTrash } from "react-icons/fa";
import AjouterForm from "../AjouterForm";
// import { TimePicker } from "@material-ui/lab";
import TimePickerInput from "../Form/TimePickerInput"; // Importer le composant TimePickerInput

const Form = () => {
  const [formData, setFormData] = useState({ name: "", questions: [] });
  const [idCount, setIdCount] = useState(0);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [selectedQuestionType, setSelectedQuestionType] = useState("");
  const [modalQuestion, setModalQuestion] = useState("");
  const [modalResponse, setModalResponse] = useState("");
  const navigate= useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    createForm();
    console.log("hhhhh",formData); 
  navigate('/ajouterForm' , { state: { formData } });
  };
////ajouter
// const cards = useSelector((state) => state.cards);
// {cards.map((formData, index) => (
//   <Grid key={index} item xs={12} sm={6} md={6}>

//     <AjouterForm formData={formData}  />
//     </Grid>
// ))}
  const clear = () => {
    setFormData({ name: "", questions: [] });
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const [showRadioButtons, setShowRadioButtons] = useState(false); // Etat pour afficher ou cacher les boutons radio
  const [radioButtonStates, setRadioButtonStates] = useState([]);

  const handleQuestionTypeChange = (e) => {
    setSelectedQuestionType(e.target.value);
    //ajouter
    if (e.target.value === "multipleChoice") {
      setShowNumberOfOptions(true); // Step 2: Show number of options only if the selected question type is 'multipleChoice'
      setShowRadioButtons(true); // Affiche les boutons radio si le type de question est "multipleChoice"
      setRadioButtonStates([...Array(numberOfOptions)].fill(false)); // Initialiser le tableau d'états avec 'false' pour chaque bouton radio
    } else {
      setShowNumberOfOptions(false); // Step 3: Hide number of options for other question types
      setShowRadioButtons(false); // Cache les boutons radio pour d'autres types de questions
    }
  };

  const handleModalSubmit = () => {
    //  console.log("hhhhh",formData)

    // console.log("Valeur de modalResponse:", modalResponse);
    if (selectedQuestionType && modalQuestion !== "") {
      let newQuestion;
      if (selectedQuestionType == "multipleChoice") {
        newQuestion = {
          id: idCount,
          questionType: selectedQuestionType,
          question: modalQuestion,
          responseValue: {
            selectedOption: "",
            options: Array.from({ length: numberOfOptions }, () => ""),
          },
          optionsCount: numberOfOptions,
        };
      } else {
        newQuestion = {
          id: idCount,
          questionType: selectedQuestionType,
          question: modalQuestion,
          responseValue: null,
        };
      }
      setFormData((prevFormData) => ({
        ...prevFormData,
        questions: [...prevFormData.questions, newQuestion],
      }));
      setModalQuestion("");
      setModalResponse("");
      setSelectedQuestionType("");
      setShowNumberOfOptions(false);
      setNumberOfOptions(2);
      setIdCount(idCount + 1);
      handleCloseModal();
    }
  };

  const createForm = () => {
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

  const handleChangetextArea = (event) => {
    console.log(event);
    setModalResponse(event.target.value);
  };
  const [numberOfOptions, setNumberOfOptions] = useState(2); // Step 1: State for number of options
  const [selectedOptions, setSelectedOptions] = useState([]);
  //ajoute
  const [showNumberOfOptions, setShowNumberOfOptions] = useState(false); // Step 1: State to control visibility of number of options

  const handleOptionChange = (index) => (event) => {
    const newRadioButtonStates = radioButtonStates.map((state, i) =>
      i === index ? !state : state
    );
    setRadioButtonStates(newRadioButtonStates);
  };
  // const handleOptionInputChange = (e) => {
  //   setNumberOfOptions(parseInt(e.target.value));
  // };
  const handleOptionInputChange = (index, value) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = value;
    setSelectedOptions(newSelectedOptions);
  };

  const handleResponse = (id, responseValue, responseType, file) => {
    console.log(id, responseValue, responseType);
    switch (responseType) {
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
                  return { ...obj, responseValue: responseValue, questionType: "gender" };
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
      default:
        break;
    }
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const renderInputField = (question) => {
    switch (question.questionType) {
      case "date":
        return (
          <TextField
            name="dateAnswer"
            type="date"
            variant="outlined"
            value={question.responseValue}
            onChange={(e) => {
              handleResponse(question.id, e.target.value, "date");
            }}
            label={question.questionType === "date"}
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
            value={question.responseValue}
            onChange={(e) => {
              handleResponse(question.id, e.target.value, "paragraph");
            }}
            label={
              question.questionType === "paragraph"
                ? "Your Paragraph Answer"
                : ""
            }
            fullWidth
          />
        );
        
    case "time":
      return (
        <TimePickerInput
          value={question.responseValue}
          onChange={(e) => handleResponse(question.id, e.target.value, "time")}
        />
      );
        case "gender":
  return (
      <FormControl variant="outlined" fullWidth>
        <InputLabel id={`dropdown-label-${question.id}`}>Genre</InputLabel>
        <Select
          labelId={`dropdown-label-${question.id}`}
          id={`dropdown-${question.id}`}
          value={question.responseValue}
          onChange={(e) => {
            handleResponse(question.id, e.target.value, "gender");
          }}
          label="Genre"
        >
          <MenuItem value="Homme">Homme</MenuItem>
          <MenuItem value="Femme">Femme</MenuItem>
        </Select>
      </FormControl>
);
      case "text":
        return (
          <TextField
            name="textAnswer"
            rows={4}
            variant="outlined"
            value={question.responseValue}
            onChange={(e) => {
              handleResponse(question.id, e.target.value, "text");
            }}
            label={question.questionType === "text" ? "Your Text Answer" : ""}
            fullWidth
          />
        );
      case "file":
        return (
          <input
            type="file"
            onChange={(event) =>
              handleResponse(question.id, event.target.files[0], "file")
            } // Utilisez 'event' au lieu de 'e'
          />
        );
        case "dropdown":
          return (
            <FormControl variant="outlined" fullWidth>
              <InputLabel id={`dropdown-label-${question.id}`}>{question.question}</InputLabel>
              <Select
                labelId={`dropdown-label-${question.id}`}
                id={`dropdown-${question.id}`}
                value={question.responseValue}
                onChange={(e) => {
                  handleResponse(question.id, e.target.value, "dropdown");
                }}
                label={question.question}
              >
                {/* Mettez ici les options de votre liste déroulante */}
              </Select>
            </FormControl>
          );
      case "dropdown":
        return (
          <TextField
            name="dropdownAnswer"
            select
            variant="outlined"
            value={question.responseValue}
            onChange={(e) => {
              handleResponse(question.id, e.target.value, "file");
            }}
            label={
              question.questionType === "dropdown" ? "Your Dropdown Answer" : ""
            }
            fullWidth
          />
        );
      case "multipleChoice":
        return (
          <div>
            {[...Array(question.optionsCount)].map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <FormControlLabel
                  value={
                    formData.questions.find((q) => q.id == question.id)
                      .responseValue.options[index]
                  }
                  control={<Radio />}
                  checked={
                    formData.questions.find((q) => q.id == question.id)
                      .responseValue.selectedOption ==
                      formData.questions.find((q) => q.id == question.id)
                        .responseValue.options[index] &&
                    formData.questions.find((q) => q.id == question.id)
                      .responseValue.selectedOption != ""
                  }
                  onChange={(e) => {
                    console.log(e);
                    setFormData((prev) => ({
                      ...prev,
                      ["questions"]: prev.questions.map((obj) => {
                        if (obj.id === question.id) {
                          // Update the properties for the object with id 2
                          return {
                            ...obj,
                            responseValue: {
                              ...obj.responseValue,
                              ["selectedOption"]: e.target.value,
                            },
                          }; // Add or update other properties as needed
                        }
                        // If the id doesn't match, return the original object
                        return obj;
                      }),
                    }));
                  }}
                />
                <TextField
                  variant="outlined"
                  size="small"
                  value={
                    formData.questions.find((q) => q.id == question.id)
                      .responseValue.options[index]
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
                              ["options"]: obj.responseValue.options.map(
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
                />
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  const handleDeleteQuestion = (id) => {
    const updatedQuestions = formData.questions.filter((q) => q.id !== id);
    setFormData((prevFormData) => ({
      ...prevFormData,
      questions: updatedQuestions,
    }));
  };
  const renderQuestions = () => {
    return formData.questions.map((question, index) => (
      <div
        key={index}
        style={{
          marginBottom: "20px",
          minHeight: "50px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="body1">
          Question {index + 1}: {question.question} ({question.questionType})
        </Typography>
        <Typography variant="body1">
          Response: {question.responseValue}{" "}
          {/* Afficher la valeur de la réponse */}
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <DeleteIcon
            color="secondary"
            onClick={() => handleDeleteQuestion(question.id)}
            style={{ cursor: "pointer" }}
          />
          {renderInputField(question)}
        </div>
      </div>
    ));
  };
  const sortedQuestions = formData.questions;

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Container>
          <Row>
            <div className="mb-4 col-12">
              <Title
                secondTitle={"Name of the questionnaire"}
                fontSize={"18px"}
                fontWeight={600}
                className={"mb-2"}
              />
              <TextField
                type="text"
                placeholder="Enter Form Name"
                className="rounded-pill"
                name="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                fullWidth // Ensures the input field takes the full width of its container
              />
            </div>
          </Row>
          {sortedQuestions.map((question, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <Typography variant="body1" style={{ marginRight: "10px" }}>
                  Question {index + 1}: {question.question} (
                  {question.questionType})
                </Typography>
                <DeleteIcon
                  color="info"
                  onClick={() => handleDeleteQuestion(index)}
                  style={{ cursor: "pointer", marginLeft: "10px" }}
                />
              </div>
              {renderInputField(question)}
            </div>
          ))}
          <div className="row mb-4">
          <div className="col-md-2"></div>
            <div className="col-md-3 col-xs-12">
              <IconButton
                className="h-100 border-0"
                style={{
                  background: "#bd6262",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: 600,
                  padding: "8px 16px",
                  borderRadius: "20px",
                }}
                startIcon={<FaTrash />}
                onClick={clear}
                fullWidth // Add fullWidth prop to make button take full width
              >
                <Title title={"Clear"} /> {/* Change the button label */}
              </IconButton>
            </div>
            <div className="col-md-4 col-xs-12">
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
                startIcon={<FaPlus />}
                onClick={handleOpenModal}
                fullWidth // Add fullWidth prop to make button take full width
              >
                <Title title={"Add questions"} />{" "}
                {/* Change the button label */}
              </IconButton>
            </div>
            
            <div className="col-md-3 col-xs-12">
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
                  type="submit"
                  fullWidth // Add fullWidth prop to make button take full width
                >
                  <Title title={"Submit"} /> {/* Change the button label */}
                </IconButton>
              </div>
          </div>

          {/* <IconButton
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            Submit
          </IconButton> */}
        </Container>
      </form>

      <Modal open={openModal} onClose={handleCloseModal}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-80%, -60%)",
            backgroundColor: "white",
            padding: "20px",
          }}
        >
          <div className="mb-4 col-12">
            <Title
              secondTitle={"Ask your question"}
              fontSize={"18px"}
              fontWeight={600}
              className={"mb-2"}
            />
            <TextField
              type="text"
              placeholder="Ask your question here"
              className="rounded-pill"
              name="question"
              value={modalQuestion}
              onChange={(e) => setModalQuestion(e.target.value)}
              fullWidth
              style={{ width: "100%", marginBottom: "15px" }}
            />
          </div>
          {/* <Typography variant="h6" style={{ marginBottom: "10px" }}>
            Posez votre question
          </Typography>
          <TextField
            name="question"
            variant="outlined"
            label="Question"
            style={{ width: "100%", marginBottom: "15px" }}
            value={modalQuestion}
            onChange={(e) => setModalQuestion(e.target.value)}
          /> */}
          <FormControl
            style={{ width: "100%", marginTop: "10px", marginBottom: "10px" }}
          >
            <InputLabel id="question-type-label">Question type</InputLabel>
            <Select
              labelId="question-type-label"
              id="question-type"
              value={selectedQuestionType}
              onChange={handleQuestionTypeChange}
            >
              <MenuItem value="date">Date</MenuItem>
              <MenuItem value="paragraph">Paragraphe</MenuItem>
              <MenuItem value="text">Text</MenuItem>
              <MenuItem value="file">Import Fichier</MenuItem>
              <MenuItem value="listederoulate">Liste déroulante</MenuItem>
              <MenuItem value="multipleChoice">Choix multiple</MenuItem>
              <MenuItem value="gender">Gender</MenuItem>
              <MenuItem value="time">Time</MenuItem>

            </Select>
          </FormControl>
          <TextField
            name="numberOfOptions"
            variant="outlined"
            label="Number of Options"
            type="number"
            fullWidth
            value={numberOfOptions}
            onChange={(e) => {
              setNumberOfOptions(Number(e.target.value));
            }}
            style={{ display: showNumberOfOptions ? "block" : "none" }}
          />
          <div></div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              marginTop: "10px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleCloseModal}
            >
              Close Modal
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleModalSubmit}
            >
              OK
            </Button>
          </div>
        </div>
      </Modal>
    </Paper>
  );
};

export default Form;
