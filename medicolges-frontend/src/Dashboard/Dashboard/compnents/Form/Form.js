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
  Grid,
  Checkbox,
  Input,
} from "@material-ui/core";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import InsertInvitationIcon from "@material-ui/icons/InsertInvitation";

import useStyles from "./styles";
//import { createForm } from '../../api'
import DeleteIcon from "@material-ui/icons/Delete";
import { useEffect } from "react";
import { addForm } from "../api/index";
import Title from "../../../../components/Title/Title";
import { Row } from "react-bootstrap";
import IconButton from "../../../../components/Button/IconButton";
import { FaBars, FaPlus, FaSave, FaTrash, FaEdit  } from "react-icons/fa";
import AjouterForm from "../AjouterForm";
// import { TimePicker } from "@material-ui/lab";
import TimePickerInput from "../Form/TimePickerInput"; // Importer le composant TimePickerInput
import DateRangeIcon from "@material-ui/icons/DateRange";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import PeopleIcon from "@material-ui/icons/People";
import DescriptionIcon from "@material-ui/icons/Description";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import PhoneField from "./PhoneField"; // Assuming PhoneField is defined in a separate file
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import Switch from "@mui/material/Switch";

import {putForm} from "../api/index";

const Form = () => {
  const [darkMode, setDarkMode] = useState(false);

  const [formData, setFormData] = useState({ name: "", questions: [] });
  console.log("data from formjs",formData)
  const [idCount, setIdCount] = useState(0);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [selectedQuestionType, setSelectedQuestionType] = useState("");
  const [modalQuestion, setModalQuestion] = useState("");
  const [modalResponse, setModalResponse] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  //email
  // const [email, setEmail] = React.useState('');
  // const [selectedDomain, setSelectedDomain] = React.useState('');
  // const allowedDomains = ["@gmail.com", "@yahoo.com", "@hotmail.com"];

  //couleur
  const [inputColor, setInputColor] = useState("#000000");
  const [questionColors, setQuestionColors] = useState({
    listederoulate: "#000000",
    date: "#000000",
    email: "#000000",
    paragraph: "#000000",
    text: "#000000",
    file: "#000000",
    multipleChoice: "#000000",
    gender: "#000000",
    time: "#000000",
    combobox: "#000000",
    telephone: "#000000",
    number: "#000000",
    toggle: "#000000",
  });
  const [questions, setQuestions] = useState({
    listederoulate: "listederoulate",
    toggle: "toggle",
    date: "date",
    email: "email",
    paragraph: "paragraph",
    text: "text",
    file: "file",
    multipleChoice: "multipleChoice",
    gender: "gender",
    time: "time",
    combobox: "combobox",
    telephone: "telephone",
    number: "number",
  });

  // Effet pour mettre à jour la couleur de la police lorsque la couleur de la question est modifiée
  useEffect(() => {
    setInputColor(questionColors[selectedQuestionType]);
  }, [questionColors, selectedQuestionType]);

  // Fonction pour gérer le changement de couleur
  const handleColorChange = (questionType, color) => {
    console.log("Question type:", questionType);
    console.log("Color:", color);
    console.log("Question colors:", questionColors);
//
    setQuestionColors((prevColors) => ({
      ...prevColors,
      [questionType]: color,
    }));
  };

  ///phoone
  const [phoneValue, setPhoneValue] = React.useState();

  const handlePhoneChange = (value, country) => {
    console.log("Country code:", country); // Vous pouvez utiliser le code de pays ici
    setPhoneValue(value);
  };
  ///togle

  // Fonction pour gérer la mise à jour de la réponse du commutateur
  const handleToggleChange = (questionId, checked) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      //faire le mis a jours lil question de lobjet prevFormData en utilisant map pour parcourir chaque question et appliquer une transformation
      questions: prevFormData.questions.map((question) => {
        if (question.id === questionId) {
          return {
            ...question,
            responseValue: checked, // Met à jour la valeur de responseValue avec l'état du commutateur
          };
        }
        return question;
      }),
    }));
  };

  //pour listderoulante
  // const [questions, setQuestions] = useState([]);

  const handleInputChange = (id, value) => {
    // Mettre à jour la valeur d'entrée de la question spécifiée par id
    const updatedQuestions = questions.map((question) => {
      if (question.id === id) {
        return { ...question, inputValue: value };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const handleSelectChange = (id, value) => {
    // Mettre à jour la valeur sélectionnée de la question spécifiée par id
    const updatedQuestions = questions.map((question) => {
      if (question.id === id) {
        return { ...question, selectedOption: value };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
        //ajouter
        try {
          console.log("Case:", location.state); 
          console.log(formData._id,'data')
          if (formData._id  !== ""  ) {
          
            // If updating an existing form
            await updateForm();
            setTimeout(() => {
              navigate("/afficheForm");  // Navigate back to afficheForm

            }, 5000);
          } 
          if (formData._id  == undefined  ) {
              // If you are creating a new form
              await createForm(); // Create a new form
              setTimeout(() => {
                navigate("/ajouterForm", { state: { formData, case: "create" } }); // Navigate to ajouterForm

              }, 5000);
          }
      } catch (error) {
          console.error("Error handling form submission:", error);
          // Handle error, display message, etc.
      }
    // createForm();
    // console.log("hhhhh", formData);
    // navigate("/ajouterForm", { state: { formData, case: "create" } });
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
  const affichage = async (e) => {
    e.preventDefault();
    navigate("/afficheForm", { state: { formData } });
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  useEffect(() => {
    //assurer que les données de formulaire existent dans l'objet location.sta
    if (location.state && location.state.formData) {
      setFormData(location.state.formData);
    }//execute lorsque location.state change
  }, [location.state]);
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  //radioButton
  const [showRadioButtons, setShowRadioButtons] = useState(false); // Etat pour afficher ou cacher les boutons radio
  const [radioButtonStates, setRadioButtonStates] = useState([]);
  //combox
  const [showNumberOfInputs, setShowNumberOfInputs] = useState(false);
  const [numberOfInputs, setNumberOfInputs] = useState(2);

  //checkbox
  const [showCheckbox, setShowCheckbox] = useState(false);
  const [checkboxStates, setCheckboxStates] = useState([]);
  const handleNumberOfInputsChange = (e) => {
    const value = parseInt(e.target.value);
    setNumberOfInputs(value);
    setCheckboxStates([...Array(value)].fill(false));
  };
  const handleQuestionTypeChange = (e) => {
    setSelectedQuestionType(e.target.value);
    //ajouter
    if (e.target.value === "multipleChoice") {
      setShowNumberOfOptions(true); // Afficher le champ numberOfOptions si le type de question est 'multipleChoice'
      setShowRadioButtons(true); // Affiche les boutons radio si le type de question est "multipleChoice"
      setRadioButtonStates([...Array(numberOfOptions)].fill(false)); // Initialiser le tableau d'états avec 'false' pour chaque bouton radio
    } else if (e.target.value === "combobox") {
      setShowCheckbox(true);
      setCheckboxStates([...Array(numberOfInputs)].fill(false));
      setShowNumberOfInputs(true); // Mettre à jour l'état showNumberOfInputs
    } else if (e.target.value === "listederoulate") {
      setShowCheckbox(true);
      setCheckboxStates([...Array(numberOfInputs)].fill(false));
      setShowNumberOfInputs(true); // Mettre à jour l'état showNumberOfInputs
    } else {
      setShowNumberOfOptions(false); // Masquer le champ numberOfOptions pour les autres types de questions
      setShowRadioButtons(false); // Cache les boutons radio pour d'autres types de questions
      setShowNumberOfInputs(false); // Mettre à jour l'état showNumberOfInputs
      setShowCheckbox(false);
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
          color: inputColor,
          questionType: selectedQuestionType,
          question: modalQuestion,
          responseValue: {
            selectedOption: "",
            options: Array.from({ length: numberOfOptions }, () => ""),
          },
          optionsCount: numberOfOptions,
        };
      } else if (selectedQuestionType === "combobox") {
        newQuestion = {
          id: idCount,
          color: inputColor,
          questionType: selectedQuestionType,
          question: modalQuestion,
          responseValue: {
            checked: [],
            checkboxes: Array.from({ length: numberOfInputs }, () => ""),
          },
          optionsCount: numberOfInputs,
        };
      } else if (selectedQuestionType === "listederoulate") {
        newQuestion = {
          id: idCount,
          color: inputColor,
          questionType: selectedQuestionType,
          question: modalQuestion,
          responseValue: {
            selectedOption: "",
            options: [],
          },
          optionsCount: numberOfInputs,
        };
      } else {
        newQuestion = {
          id: idCount,
          color: inputColor,
          questionType: selectedQuestionType,
          question: modalQuestion,
          responseValue: null,
        };
      }
      ///de mise à jour fournie dans useState
      setFormData((prevFormData) => ({
        ...prevFormData,
        questions: [...prevFormData.questions, newQuestion],
      }));
      // Mettre à jour la couleur de la police pour la question
      // Mise à jour des questions avec la couleur de police coleur
      const updatedQuestions = { ...questions };
      updatedQuestions[selectedQuestionType] = (
        <Typography style={{ color: questionColors[selectedQuestionType] }}>
          {questions[selectedQuestionType]}
        </Typography>
      );
      console.log("Updated questions:", updatedQuestions);

      setQuestions(updatedQuestions);

      setModalQuestion("");
      setModalResponse("");
      setSelectedQuestionType("");
      setShowNumberOfOptions(false);
      setNumberOfOptions(2);
      setNumberOfInputs(2); // Réinitialiser le nombre de checkboxes
      setIdCount(idCount + 1);
      handleCloseModal();
      setShowNumberOfInputs(false);
    }
  };

  const createForm = () => {
    addForm(
   
      {
      _id:  formData._id,
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
  const updateForm = () => {
    putForm(
      formData._id, {
        name: formData.name,
        questions: JSON.stringify(formData.questions)
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
    console.log("gggggggggggggggggggg", id, responseValue, responseType);
    switch (responseType) {
      case "text":
        setFormData((prev) => ({
          ...prev,
          //a ligne met à jour la propriété questions de l'objet prev. Elle utilise la méthode map() pour parcourir
          // chaque objet dans le tableau prev.questions et appliquer une transformation.
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
                    : obj.responseValue.push(responseValue),
                },
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
            style={{ width: "50px", height: "30px", fontSize: "14px" }} // Styles personnalisés pour ajuster la taille
          />
        );
      case "toggle":
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
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
      // case "telephone":
      //   return (
      //     <PhoneInputWithFlag
      //       label="your number phone"
      //       value={question.responseValue}
      //       onChange={(e) => {
      //         handleResponse(question.id, e.target.value, "telephone");
      //       }}
      //     />
      //   );
      case "time":
        return (
          <TimePickerInput
            value={question.responseValue}
            onChange={(e) =>
              handleResponse(question.id, e.target.value, "time")
            }
          />
        );
      case "listederoulate":
        return (
          <>
            <TextField
              label="Enter Option"
              id="selectChoicesInput"
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  e.preventDefault();
                  setFormData((prev) => ({
                    ...prev,
                    ["questions"]: prev.questions.map((obj) => {
                      if (obj.id === question.id) {
                        // Update the properties for the object with id 2
                        return {
                          ...obj,
                          responseValue: {
                            ...obj.responseValue,
                            ["options"]: [
                              ...obj.responseValue.options,
                              e.target.value,
                            ],
                          },
                        }; // Add or update other properties as needed
                      }
                      // If the id doesn't match, return the original object
                      return obj;
                    }),
                  }));
                  document.getElementById("selectChoicesInput").value = "";
                }
              }}
              fullWidth
            />
            {question.responseValue ? (
              <Select label="Select Option" fullWidth>
                {question.responseValue &&
                  question.responseValue.options.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
              </Select>
            ) : null}
          </>
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
            label={
              question.questionType === "number" ? "Your Number Answer" : ""
            }
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
            <InputLabel id={`dropdown-label-${question.id}`}>
              {question.question}
            </InputLabel>
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
        console.log(("rrrrrrrrrrrrr", question));
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
                      ?.responseValue.options[index]
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
      ///cmobox
      case "combobox":
        return (
          <div>
            {[...Array(question.optionsCount)].map((item, index) => (
              <div key={index}>
                <TextField
                  name={`input_${index}`} // Utilisez un nom unique pour chaque input
                  label={`Input ${index + 1}`}
                  fullWidth
                  value={
                    formData.questions.find((q) => q.id == question.id)
                      .responseValue.checkboxes[index]
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
                  // Ajoutez ici les autres propriétés nécessaires pour chaque input
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label={`Checkbox ${index + 1}`} // Mettez à jour le label en conséquence
                />
              </div>
            ))}
          </div>
        );
      // case "email":
      //   const handleChangeEmail = (e) => {
      //     const { value } = e.target;
      //     if (!value.includes("@")) {
      //       handleResponse(question.id, value, "email");
      //     }
      //   };

      //   const handleKeyPressEmail = (e) => {
      //     if (e.key === '@') {
      //       e.preventDefault(); // Empêche l'ajout du caractère "@" dans le champ d'e-mail
      //     }
      //   };

      //   const handleChangeDomain = (e) => {
      //     setSelectedDomain(e.target.value);
      //   };

      //   return (
      //     <div style={{ display: 'flex', alignItems: 'center' }}>
      //       <TextField
      //         type="email"
      //         label="Email"
      //         placeholder="Enter email"
      //         variant="outlined"
      //         value={question.responseValue}
      //         onChange={(e) => {
      //           handleResponse(question.id, e.target.value, "email");
      //         }}
      //         onKeyPress={handleKeyPressEmail}
      //         fullWidth
      //         inputProps={{
      //           maxLength: 50 // Limiter la longueur maximale de l'e-mail si nécessaire
      //         }}
      //       />
      //       <TextField
      //         select
      //         value={selectedDomain}
      //         onChange={(e) => {
      //           setSelectedDomain(e.target.value);
      //           handleResponse(question.id, e.target.value, "domain");
      //         }}
      //         // onChange={handleChangeDomain}
      //         variant="outlined"
      //         style={{ minWidth: '100px', marginLeft: '10px' }}
      //       >
      //         {allowedDomains.map((domain) => (
      //           <MenuItem key={domain} value={domain}>
      //             {domain}
      //           </MenuItem>
      //         ))}
      //       </TextField>
      //     </div>
      //   );
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
  const handleUpdateQuestion = (index) => {
   // Récupérer la question à partir de l'index
  const questionToUpdate = sortedQuestions[index];

  // Demander à l'utilisateur de saisir la nouvelle version de la question
  const updatedQuestion = prompt("Enter the updated question:", questionToUpdate.question);

  // Vérifier si l'utilisateur a saisi une nouvelle question
  if (updatedQuestion !== null) {
    // Copier le tableau des questions
    const updatedQuestions = [...formData.questions];

    // Mettre à jour la question dans le tableau
    updatedQuestions[index] = { ...questionToUpdate, question: updatedQuestion };

    // Mettre à jour le state avec les questions mises à jour
    setFormData((prevFormData) => ({
      ...prevFormData,
      questions: updatedQuestions,
    }));
  }
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
        <Typography color={question.color} variant="body1">
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
              //className={darkMode ? 'dark-form' : 'light-form'}
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Container>
          <Row>
            
            {/* <div className="mb-4 col-12"> */}
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
                <Typography
                  variant="body1"
                  style={{ color: question.color, marginRight: "10px" }}
                >
                  Question {index + 1}: {question.question} (
                  {question.questionType})
                </Typography>
                <DeleteIcon
                  color="info"
                  onClick={() => handleDeleteQuestion(index)}
                  style={{ cursor: "pointer", marginLeft: "10px" }}
                />
                   <FaEdit // Utilisez EditIcon ici
        color="info"
        onClick={() => handleUpdateQuestion(index)} // Assurez-vous de définir cette fonction
        style={{ cursor: "pointer", marginLeft: "10px" }}
      />
              </div>
              {renderInputField(question)}
            </div>
          ))}
          
          <div className="row text-center" style={{ marginRight: "-97px" }}>
           
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
                  background: "#328CBD", // Couleur verte
                  color: "white",
                  fontSize: "16px",
                  fontWeight: 600,
                  padding: "8px 16px",
                  borderRadius: "20px",
                }}
                startIcon={<FaBars />}
                onClick={affichage}
                fullWidth // Add fullWidth prop to make button take full width
              >
                <Title title={"Affiche"} /> {/* Change the button label */}
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
            
            <div className="col-md-3 col-xs-12 ">
              <IconButton
                className="h-100 border-0"
                style={{
                  background: "#bd6262",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: 600,
                  padding: "8px 16px",
                  borderRadius: "20px",
                  marginleft:"56px",
                }}
                startIcon={<FaTrash />}
                onClick={clear}
                fullWidth // Add fullWidth prop to make button take full width
              >
                <Title title={"Clear"} /> {/* Change the button label */}
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
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            width: "45%", // Ajustez la largeur de la modal
            // height: "40%", // Ajustez la hauteur de la modal
            maxHeight: "80vh", // Empêchez la modal de dépasser la hauteur de la fenêtre
            // overflowY: "auto", // Ajoutez un défilement vertical si nécessaire
            borderColor: "rgba(219, 234, 254, 1)", // Définissez la couleur de la bordure
            borderRadius: "1rem", // Définissez le rayon de la bordure
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
              <MenuItem value="date">
                <DateRangeIcon
                  style={{ marginRight: "10px", color: "black" }}
                />{" "}
                Date
              </MenuItem>
              <MenuItem value="paragraph">
                <DescriptionIcon
                  style={{ marginRight: "10px", color: "black" }}
                />
                Paragraphe
              </MenuItem>
              <MenuItem value="text">
                <TextFieldsIcon
                  style={{ marginRight: "10px", color: "black" }}
                />{" "}
                Textarea
              </MenuItem>
              <MenuItem value="file">
                {" "}
                <InsertDriveFileIcon
                  style={{ marginRight: "10px", color: "black" }}
                />
                File upload
              </MenuItem>
              <MenuItem value="listederoulate">
                <FormatListBulletedIcon
                  style={{ marginRight: "10px", color: "black" }}
                />
                Liste déroulante
              </MenuItem>
              <MenuItem value="multipleChoice">
                {" "}
                <RadioButtonCheckedIcon
                  style={{ marginRight: "10px", color: "black" }}
                />
                Choix multiple
              </MenuItem>
              <MenuItem value="gender">
                {" "}
                <PeopleIcon style={{ marginRight: "10px", color: "black" }} />
                Gender
              </MenuItem>
              <MenuItem value="time">
                {" "}
                <AccessTimeIcon
                  style={{ marginRight: "10px", color: "black" }}
                />{" "}
                Time
              </MenuItem>
              <MenuItem value="combobox">
                {" "}
                <CheckBoxIcon style={{ marginRight: "10px", color: "black" }} />
                Combobox
              </MenuItem>
              <MenuItem value="telephone">
                <PhoneIcon style={{ marginRight: "10px", color: "black" }} />{" "}
                phone
              </MenuItem>
              <MenuItem value="email">
                <EmailIcon style={{ marginRight: "10px", color: "black" }} />{" "}
                Email
              </MenuItem>
              <MenuItem value="number">
                <InsertInvitationIcon
                  style={{ marginRight: "10px", color: "black" }}
                />{" "}
                Number
              </MenuItem>
              <MenuItem value="toggle">
                <ToggleOnIcon style={{ marginRight: "10px", color: "black" }} />{" "}
                Toggle
              </MenuItem>
            </Select>
            <Input
              type="color"
              onChange={(e) => {
                console.log(e);
                setInputColor(e.target.value);
              }}
              style={{ marginTop: "8px" }}
            />
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

          <TextField
            name="numberOfInputs"
            type="number"
            label="Number of Inputs"
            value={numberOfInputs}
            onChange={(e) => setNumberOfInputs(parseInt(e.target.value))}
            fullWidth
            style={{
              display: selectedQuestionType === "combobox" ? "block" : "none",
            }}
          />

          <div></div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              marginTop: "30px", // Ajoutez une marge en haut
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
