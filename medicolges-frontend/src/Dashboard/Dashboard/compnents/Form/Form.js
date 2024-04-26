import React, { useState } from "react";
 
import {MdAccessTime, MdDateRange, MdDescription, MdTextFields, MdInsertDriveFile, MdFormatListBulleted, MdRadioButtonChecked, MdPeople, MdCheckBox, MdPhone, MdEmail, MdInsertInvitation, MdToggleOn } from "react-icons/md";

 
import {
  Radio,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Checkbox, 
  FormLabel,
  Input,
  FormControl,
  Switch,
  Stack,
  Box,
  IconButton,
  Textarea,
  Select,
  Button,
  Text,
  Icon ,
  Menu,
  MenuButton,
  MenuList,
  RadioGroup,
  Heading,
} from '@chakra-ui/react'
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash as DeleteIcon, FaPlus as AddIcon, FaBars as HamburgerIcon, FaSave as SaveIcon, FaChevronDown as ChevronDownIcon } from 'react-icons/fa';

import useStyles from "./styles";
//import { createForm } from '../../api'
 import { useEffect } from "react";
import { addForm } from "../api/index";
 import {  Container, Row } from "react-bootstrap";
 import { FaBars, FaPlus, FaSave, FaTrash, FaEdit  } from "react-icons/fa";
 import TimePickerInput from "../Form/TimePickerInput"; // Importer le composant TimePickerInput
 
  
import {putForm} from "../api/index";
 
const Form = () => {
  const [darkMode, setDarkMode] = useState(false);

  const [formData, setFormData] = useState({id:"" , name: "", questions: [] });
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
  const handleMenuItemClick = (e) => {
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
        <Text color={questionColors[selectedQuestionType]}>
        {questions[selectedQuestionType]}
      </Text>
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
          <Input
            name="dateAnswer"
            type="date"
            value={question.responseValue}
            onChange={(e) => {
              handleResponse(question.id, e.target.value, "date");
            }}
            variant="outline"
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
          <FormControl display="flex" alignItems="center">
          <Switch
            isChecked={question.responseValue} // Use responseValue to indicate whether the toggle is checked or not
            onChange={(e) => {
              handleToggleChange(question.id, e.target.checked); // Update the response value with the toggle state
            }}
          />
          <FormLabel htmlFor={`toggle-${question.id}`}>Reponse</FormLabel>
        </FormControl>
        );
      case "paragraph":
        return (
          <FormControl>
            <FormLabel htmlFor={`paragraphAnswer-${question.id}`}>
              {question.questionType === "paragraph" && "Your Paragraph Answer"}
            </FormLabel>
            <Textarea
              name="paragraphAnswer"
              size="md"
              variant="filled"
              value={question.responseValue}
              onChange={(e) => {
                handleResponse(question.id, e.target.value, "paragraph");
              }}
              placeholder={
                question.questionType === "paragraph" &&
                "Enter your paragraph answer here"
              }
              resize="vertical"
            />
        </FormControl>
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
           <FormControl>
              <FormLabel htmlFor={`selectChoicesInput-${question.id}`}>
                {question.questionType === "multipleChoice" && "Enter Option"}
              </FormLabel>
              <Input
                type="text"
                id={`selectChoicesInput-${question.id}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    setFormData((prev) => ({
                      ...prev,
                      questions: prev.questions.map((obj) => {
                        if (obj.id === question.id) {
                          return {
                            ...obj,
                            responseValue: {
                              ...obj.responseValue,
                              options: [...obj.responseValue.options, e.target.value],
                            },
                          };
                        }
                        return obj;
                      }),
                    }));
                    e.target.value = ""; // Clear the input field after adding the option
                  }
                }}
                fullWidth
              />
            </FormControl>
                    {question.responseValue ? (
                    <Select
                      placeholder="Select Option"
                      value={question.responseValue}
                      onChange={(e) => {
                        // Update the selected option value
                        handleOptionChange(question.id, e.target.value);
                      }}
                      fullWidth
                    >
                      {question.responseValue.options.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </Select>
                  ) : null}
          </>
        );
      case "gender":
        return (
          <FormControl variant="outline" width="100%">
            <FormLabel id={`dropdown-label-${question.id}`}>Genre</FormLabel>
            <Select
              aria-labelledby={`dropdown-label-${question.id}`}
              value={question.responseValue}
              onChange={(e) => {
                handleResponse(question.id, e.target.value, "gender");
              }}
              placeholder="Genre"
            >
              <option value="Homme">Homme</option>
              <option value="Femme">Femme</option>
            </Select>
          </FormControl>
        );
      case "text":
        return (
          <Textarea
            name="textAnswer"
            size="md"
            resize="none"
            value={question.responseValue}
            onChange={(e) => {
              handleResponse(question.id, e.target.value, "text");
            }}
            placeholder={question.questionType === "text" ? "Your Text Answer" : ""}
            fullWidth
          />
        );
      case "number":
        return (
          <Input
            name="numberAnswer"
            type="number"
            variant="outline"
            value={question.responseValue}
            onChange={(e) => {
              handleResponse(question.id, e.target.value, "number");
            }}
            placeholder={question.questionType === "number" ? "Your Number Answer" : ""}
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
          <Select
            variant="outline"
            value={question.responseValue}
            onChange={(e) => {
              handleResponse(question.id, e.target.value, "dropdown");
            }}
            placeholder={question.question}
            id={`dropdown-${question.id}`}
            size="md"
            fullWidth
          >
            {/* Put your dropdown options here */}
          </Select>
          </FormControl>
        );
      case "dropdown":
        return (
          <Input
          name="dropdownAnswer"
          variant="outline"
          value={question.responseValue}
          onChange={(e) => {
            handleResponse(question.id, e.target.value, "file");
          }}
          placeholder={
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
            <Stack key={index} direction="row" alignItems="center" marginBottom="10px">
              <RadioGroup
                value={formData?.questions.find((q) => q.id === question.id)?.responseValue.options[index]}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    ["questions"]: prev.questions.map((obj) => {
                      if (obj.id === question.id) {
                        return {
                          ...obj,
                          responseValue: {
                            ...obj.responseValue,
                            ["selectedOption"]: e.target.value,
                          },
                        };
                      }
                      return obj;
                    }),
                  }));
                }}
              >
                <Radio colorScheme="blue" />
              </RadioGroup>
              <Input
                variant="outline"
                size="sm"
                value={formData?.questions.find((q) => q.id === question.id)?.responseValue.options[index]}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    ["questions"]: prev.questions.map((obj) => {
                      if (obj.id === question.id) {
                        return {
                          ...obj,
                          responseValue: {
                            ...obj.responseValue,
                            ["options"]: obj.responseValue.options.map(
                              (x, i) => (i === index ? e.target.value : x)
                            ),
                          },
                        };
                      }
                      return obj;
                    }),
                  }));
                }}
              />
            </Stack>
          ))}
        </div>
        );
      ///cmobox
      case "combobox":
        return (
          <Stack spacing={4}>
          {[...Array(question.optionsCount)].map((item, index) => (
            <div key={index}>
              <Input
                name={`input_${index}`} // Utilize a unique name for each input
                placeholder={`Input ${index + 1}`}
                value={
                  formData?.questions.find((q) => q.id === question.id)?.responseValue.checkboxes[index]
                }
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    ["questions"]: prev.questions.map((obj) => {
                      if (obj.id === question.id) {
                        return {
                          ...obj,
                          responseValue: {
                            ...obj.responseValue,
                            ["checkboxes"]: obj.responseValue.checkboxes.map(
                              (x, i) => (i === index ? e.target.value : x)
                            ),
                          },
                        };
                      }
                      return obj;
                    }),
                  }));
                }}
                // Add any other necessary properties for each input here
              />
              <Checkbox
               
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    ["questions"]: prev.questions.map((obj) => {
                      if (obj.id === question.id) {
                        return {
                          ...obj,
                          responseValue: {
                            ...obj.responseValue,
                            ["options"]: obj.responseValue.options.map(
                              (x, i) => (i === index ? e.target.checked : x)
                            ),
                          },
                        };
                      }
                      return obj;
                    }),
                  }));
                }}
              >
                {`Checkbox ${index + 1}`} {/* Update the label accordingly */}
              </Checkbox>
            </div>
          ))}
        </Stack>
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
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter email"
              value={question.responseValue}
              onChange={(e) => {
                handleResponse(question.id, e.target.value, "email");
              }}
            />
        </FormControl>
        );
      default:
        return null;
    }
  };


  const handleDeleteQuestion = (id) => {
    // const updatedQuestions = formData.questions.filter((q) => q.id !== id);
    setFormData((prevFormData) => ({
      ...prevFormData,
      questions: prevFormData.questions.filter((q) => q.id !== id),
      //questions: updatedQuestions,
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
     <Text color={question.color} fontSize="md">
        Question {index + 1}: {question.question} ({question.questionType})
      </Text>
      <Text fontSize="md">
        Response: {question.responseValue}
      </Text>
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
    <Box  
      p="4"
      boxShadow="md"
      borderRadius="md"
      bg="white"
      className={classes.paper}
    >
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
            <Heading
              as="h2"
              fontSize="18px"
              fontWeight="semibold"
              mb="2"
            >
              Name of the questionnaire
            </Heading>
              <Input
                type="text"
                placeholder="Enter Form Name"
                variant="filled"
                borderRadius="full"
                name="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                width="100%" // Ensures the input field takes the full width of its container
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
               <Text
                fontSize="md"
                color={question.color}
                marginRight="10px"
              >
                Question {index + 1}: {question.question} ({question.questionType})
              </Text>
                <DeleteIcon
                  color="info"
                  onClick={() => handleDeleteQuestion(question.id)}
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
            <Button
              variant="solid"
              colorScheme="blue"
              borderRadius="20px"
              fontSize="md"
              fontWeight="semibold"
              padding="8px 16px"
              leftIcon={<AddIcon />}
              onClick={handleOpenModal}
              width="100%" // Add width="100%" to make the button take full width
            >
              Add questions
            </Button>
            </div>
            <div className="col-md-3 col-xs-12">
            <Button
              variant="solid"
              colorScheme="green" // Change the color scheme to green
              borderRadius="20px"
              fontSize="16px"
              fontWeight="semibold"
              padding="8px 16px"
              leftIcon={<HamburgerIcon />}
              onClick={affichage}
              width="100%" // Add width="100%" to make the button take full width
            >
              Affiche {/* Change the button label */}
            </Button>
            </div>
            <div className="col-md-3 col-xs-12">
            <Button
              variant="solid"
              colorScheme="blue" // Change the color scheme to blue
              borderRadius="20px"
              fontSize="16px"
              fontWeight="semibold"
              padding="8px 16px"
              leftIcon={<SaveIcon />}
              type="submit"
              width="100%" // Add width="100%" to make the button take full width
            >
              Submit {/* Change the button label */}
            </Button>
            </div>
            
            <div className="col-md-3 col-xs-12 ">
            <Button
              variant="solid"
              colorScheme="red" // Change the color scheme to red
              borderRadius="20px"
              fontSize="16px"
              fontWeight="semibold"
              padding="8px 16px"
              marginLeft="56px" // Add marginLeft="56px"
              leftIcon={<DeleteIcon />}
              onClick={clear}
              width="100%" // Add width="100%" to make the button take full width
            >
              Clear {/* Change the button label */}
            </Button>
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
          <Text
            fontSize="18px"
            fontWeight={600}
            mb="2" // Use mb="2" for margin bottom
          >
            Ask your question
          </Text>
            <Input
              type="text"
              placeholder="Ask your question here"
              borderRadius="full" // Use borderRadius="full" for rounded appearance
              value={modalQuestion}
              onChange={(e) => setModalQuestion(e.target.value)}
              fullWidth // Not needed for Chakra UI, as Input component automatically takes full width
              marginBottom="15px" // Use marginBottom="15px" for spacing
            />
          </div>
          {/* <Text  variant="h6" style={{ marginBottom: "10px" }}>
            Posez votre question
          </Text>
          <TextField
            name="question"
            variant="outlined"
            label="Question"
            style={{ width: "100%", marginBottom: "15px" }}
            value={modalQuestion}
            onChange={(e) => setModalQuestion(e.target.value)}
          /> */}
          <FormControl mb={4}>
                <FormLabel>Question type:</FormLabel>
 
                  <Menu>
                    <MenuButton
                      as={Button}
                      rightIcon={<ChevronDownIcon />}
                      aria-label='Options'
                      variant='outline'
                      id="question-type"
                      value={selectedQuestionType}
                       borderColor="gray.400"
                      className="w-100"

                    >{selectedQuestionType || "Choisir question type"}</MenuButton>
                    <MenuList>
                    <MenuItem value="date" onClick={() => handleMenuItemClick("date")}>
                        <Icon as={MdDateRange} mr="2" color="black" />
                        Date
                      </MenuItem>
                      <MenuItem value="paragraph" onClick={() => handleMenuItemClick("paragraph")}>
                        <Icon as={MdDescription} mr="2" color="black" />
                        Paragraphe
                      </MenuItem>
                      <MenuItem value="text" onClick={() => handleMenuItemClick("text")}>
                        <Icon as={MdTextFields} mr="2" color="black" />
                        Textarea
                      </MenuItem>
                      <MenuItem value="file" onClick={() => handleMenuItemClick("file")}>
                        <Icon as={MdInsertDriveFile} mr="2" color="black" />
                        File upload
                      </MenuItem>
                      <MenuItem value="listederoulate" onClick={() => handleMenuItemClick("listederoulate")}>
                        <Icon as={MdFormatListBulleted} mr="2" color="black" />
                        Liste déroulante
                      </MenuItem>
                      <MenuItem value="multipleChoice" onClick={() => handleMenuItemClick("multipleChoice")}>
                        <Icon as={MdRadioButtonChecked} mr="2" color="black" />
                        Choix multiple
                      </MenuItem>
                      <MenuItem value="gender" onClick={() => handleMenuItemClick("gender")}>
                        <Icon as={MdPeople} mr="2" color="black" />
                        Gender
                      </MenuItem>
                      <MenuItem value="time" onClick={() => handleMenuItemClick("time")}>
                        <Icon as={MdAccessTime} mr="2" color="black" />
                        Time
                      </MenuItem>
                      <MenuItem value="combobox" onClick={() => handleMenuItemClick("combobox")}>
                        <Icon as={MdCheckBox} mr="2" color="black" />
                        Combobox
                      </MenuItem>
                      <MenuItem value="telephone" onClick={() => handleMenuItemClick("telephone")}>
                        <Icon as={MdPhone} mr="2" color="black" />
                        Phone
                      </MenuItem>
                      <MenuItem value="email" onClick={() => handleMenuItemClick("email")}>
                        <Icon as={MdEmail} mr="2" color="black" />
                        Email
                      </MenuItem>
                      <MenuItem value="number" onClick={() => handleMenuItemClick("number")}>
                        <Icon as={MdInsertInvitation} mr="2" color="black" />
                        Number
                      </MenuItem>
                      <MenuItem value="toggle" onClick={() => handleMenuItemClick("toggle")}>
                        <Icon as={MdToggleOn} mr="2" color="black" />
                        Toggle
                      </MenuItem>
                     </MenuList>
                  </Menu>
               </FormControl>
               <Input
                  name="numberOfOptions"
                  type="number"
                  value={numberOfOptions}
                  onChange={(e) => setNumberOfOptions(Number(e.target.value))}
                  variant="outline"
                  // Add any additional props as needed
                  // For example, you can add "fullWidth" to make the input take full width
                />

          <Input
            name="numberOfOptions"
            variant="outline"
            label="Number of Options"
            type="number"
            value={numberOfOptions}
            onChange={(e) => {
              setNumberOfOptions(Number(e.target.value));
            }}
            display={showNumberOfOptions ? "block" : "none"} // Use display prop for conditional rendering
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
            colorScheme="blue"
            size="sm"
            onClick={handleCloseModal}
          >
            Close Modal
          </Button>
          <Button
            colorScheme="blue"
            size="sm"
            onClick={handleModalSubmit}
          >
            OK
          </Button>
          </div>
        </div>
      </Modal>
    </Box>
  );
};

export default Form;
