import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
//SuperAdminLayout/Layout
import Title from "../../../components/Title/Title";
import Layout from "../../../Dashboard/SuperAdminLayout/Layout";
import "../../Dashboard/Dashboard.css";
import TimePickerInput from "../compnents/Form/TimePickerInput";

import useStyles from "../../../styless";
import { useDispatch } from "react-redux";
 import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
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
  CardContent,
 
} from '@chakra-ui/react'
 
import { useLocation } from "react-router-dom";
import { FaSave } from "react-icons/fa";
import { sendResponse} from "../compnents/api/index";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
  //image
  const preset_key="cw1paxgz";
  const cloud_name="dwkto7nzl";
const AjouterForm = () => {
  const [error, setError] = useState(''); // Définition de l'état error
  const [textError, setTextError] = useState('');

  const [formData, setFormData] = useState({id:"",name: "", questions: [] });
  console.log("formdata from ajouter form",formData._id)
  const [formId, setFormId] = useState(""); // Initialiser formId à null ou une valeur par défaut appropriée
  const [selectedName, setSelectedName] = useState("Dashboard");
  const dispatch = useDispatch();
  const classes = useStyles();
  const location = useLocation();
  const [canEditQuestions, setcanEditQuestions] = useState(true);
  const navigate = useNavigate();

  //ajouter
  const[image, setImage]=useState();

  //forUdpate
  const [questions, setQuestions] = useState([]);
//ajouter visibilite 
const [isUpdating, setIsUpdating] = useState(false); // State to control update mode

  const handleUpdate = async (e) => {

    navigate("/formGeneration", { state: { formData } });
  };

  //togle
  const handleToggleChange = (questionId, checked) => {
    setFormData((prevFormData) => {
      const updatedQuestions = prevFormData.questions.map((question) => {
        if (question.id === questionId && question.questionType === 'toggle') {
          return {
            ...question,
            responseValue: checked,
          };
        }
        return question;
      });
  
      return {
        ...prevFormData,
        questions: updatedQuestions,
      };
    });
  };
  
  useEffect(() => {
    console.log(formData);
  }, [formData]);
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
    console.log("Form data before saving:", formData); // Vérifiez les données du formulaire avant la sauvegarde

    createForm(formData);
    // navigate("/affucheyourReponse", { state: { formData } });

  };
  const createForm = async (formData) => {
    console.log("Form data to save:", formData);
    console.log("ggggggggggggggggggggg", formData.responseValue);
    // try {
    //   console.log("Form data to save:", formData); // Vérifier les données du formulaire avant de les envoyer
    //   await addForm({
    //     name: formData.name,
    //     questions: JSON.stringify(formData.questions),
    //   });
    //   console.log("Form saved successfully!");
    // } catch (err) {
    //   console.log("Error saving form: ", err);
    // }

    try {
      console.log("Données du formulaire à sauvegarder:", formData); // Vérifiez les données du formulaire avant de les envoyer
      // // Envoyer une réponse à l'API pour chaque question du formulaire
      // for (const question of formData.questions) {
      //   console.log("Form ID before sending response:", formId);
         
      //     await sendResponse(formData._id, question.id, question.responseValue);
      // }
      
        // Map form data to an array of response objects
        const responses = formData.questions.map(question => ({
          questionId: question.id,
          responseValue: question.responseValue,
          // userId: '66033c44e4bf89819130ebce'
      }));
      await sendResponse(formData._id, responses);

      console.log("Toutes les réponses ont été envoyées avec succès!");
  } catch (err) {
      console.log("Erreur lors de l'envoi des réponses: ", err);
      throw err; // Facultatif : propager l'erreur vers le code appelant
  }
    // addForm({
    //   name: formData.name,
    //   questions: JSON.stringify(formData.questions),
    // })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  const handleResponse = (id, responseValue, responseType) => {
    console.log("kkkkkk", id, responseValue, responseType);//
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
        const formData = new FormData();
  formData.append('file', responseValue);
  formData.append('upload_preset', preset_key);
  axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
    .then(res => {
      const imageUrl = res.data.secure_url;
      setFormData(prev => ({
        ...prev,
        questions: prev.questions.map(obj => {
          if (obj.id === id) {
            return { ...obj, responseValue: imageUrl };
          }
          return obj;
        }),
      }));
      setImage(imageUrl);
    })
    .catch(err => console.log(err));
  break;
        // break;
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
              // Update the properties for the object with the given id
              const checked = obj.responseValue.checked || []; // Ensure checked is an array
              const updatedChecked = checked.includes(responseValue)
                ? checked.filter((x) => x !== responseValue)
                : [...checked, responseValue];
  
              return {
                ...obj,
                ["responseValue"]: {
                  ...obj.responseValue,
                  ["checked"]: updatedChecked,
                },
              };
            }
            // If the id doesn't match, return the original object
            return obj;
          }),
        }));
        break;
        // setFormData((prev) => ({
        //   ...prev,
        //   ["questions"]: prev.questions.map((obj) => {
        //     if (obj.id === id) {
        //       // Update the properties for the object with id 2
        //       return {
        //         ...obj,
        //         ["responseValue"]: {
        //           ...obj.responseValue,
        //           ["checked"]: obj.responseValue.checked.includes(responseValue)
        //             ? obj.responseValue.checked.filter(
        //                 (x) => x != responseValue
        //               )
        //             : obj.responseValue.checked.push(responseValue),
        //         },
        //       }; // Add or update other properties as needed
        //     }
        //     // If the id doesn't match, return the original object
        //     return obj;
        //   }),
        // }));
        // break;
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
      case "listederoulate":
        setFormData((prev) => ({
          ...prev,
          questions: prev.questions.map((obj) => {
            if (obj.id === id) {
              return {
                ...obj,
                responseValue: {
                  ...obj.responseValue,
                  ["selectedOption"]: responseValue,
                },
              };
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
    setFormData((prevFormData) => ({
      ...prevFormData,
      questions: updatedOptions,
    }));
  };
  const isValidEmail = (value) => {
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };
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
              <MenuItem value="Homme">Homme</MenuItem>
              <MenuItem value="Femme">Femme</MenuItem>
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
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
               <FormControl>
                  <RadioGroup
                    value={formData.questions.find((q) => q.id === question.id)?.responseValue.selectedOption}
                    onChange={(selectedOption) => {
                      setFormData((prev) => ({
                        ...prev,
                        questions: prev.questions.map((obj) => {
                          if (obj.id === question.id) {
                            return {
                              ...obj,
                              responseValue: {
                                ...obj.responseValue,
                                selectedOption,
                              },
                            };
                          }
                          return obj;
                        }),
                      }));
                    }}
                  >
                  

                          {formData.questions.find((q) => q.id === question.id)?.responseValue.options.map((option, index) => (
                            <Radio key={index} value={option}>
                              {option}
                            </Radio>
                          ))}
                  
                  </RadioGroup>
                </FormControl>
                <Input
                  variant="outline"
                  size="sm"
                  value={formData.questions.find((q) => q.id === question.id)?.responseValue.options[index]}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      questions: prev.questions.map((obj) => {
                        if (obj.id === question.id) {
                          return {
                            ...obj,
                            responseValue: {
                              ...obj.responseValue,
                              options: obj.responseValue.options.map((x, i) => (i === index ? e.target.value : x)),
                            },
                          };
                        }
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
                        <Input
                  name={`input_${index}`} // Use a unique name for each input
                  placeholder={`Input ${index + 1}`}
                  value={formData.questions.find((q) => q.id === question.id)?.responseValue.checkboxes[index]}
                  onChange={(e, index) => {
                    setFormData((prev) => ({
                      ...prev,
                      questions: prev.questions.map((obj) => {
                        if (obj.id === question.id) {
                          return {
                            ...obj,
                            responseValue: {
                              ...obj.responseValue,
                              checkboxes: obj.responseValue.checkboxes.map((x, i) => (i === index ? e.target.value : x)),
                            },
                          };
                        }
                        return obj;
                      }),
                    }));
                  }}
                  // Add other necessary properties for each input here
                />
               <FormControl>
                <FormLabel>{`Checkbox ${index + 1}`}</FormLabel>
                <Checkbox />
              </FormControl>
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
              <Box
                className={classes.appBar}
                position="static"
                color="inherit"
                height="450px"
                backgroundImage={`url(${process.env.PUBLIC_URL}/images/Background/background.png)`}
                backgroundRepeat="no-repeat"
                backgroundSize="cover"
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
              <Col xs={12} md={12} className="text-center">
                <div>
                  {formData && (
                    <>
                      <Card
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
                          <Text
                            fontSize="18px"
                            fontWeight="600"
                            marginBottom="2"
                            style={{
                              marginBottom: "0px",
                              marginRight: "7px",
                              fontFamily: "Arial, sans-serif",
                            }}
                          >
                            Name of the questionnaire:
                          </Text>
                        </div>
                        <div>
                        {formData && (
                            <Text
                              fontSize="18px"
                              marginBottom="7px"
                              fontFamily="Arial, sans-serif"
                            >
                              {formData.name}
                              {formData.id}
                            </Text>
                          )}
                        </div>
                      </Card>
                      <Card>
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
                                <Text
                                  fontSize="18px" // Taille de police identique
                                  fontWeight="600" // Poids de police identique
                                  fontFamily="Arial, sans-serif" // Police de caractères identique
                                  paddingBottom="8px" // Espacement en bas identique
                                >
                                  Question {index + 1}: {question.question}
                                </Text>
                        
                              </div>
                              {/* Render input field based on question type */}
                              {renderInputField(question)}
                            </div>
                          ))}
                      </Card>
                    </>
                  )}
                </div>
                <div className="col-md-12 col-xs-12 d-flex justify-content-end">
                  {location.state && location.state.case == "create" ? (
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
                  ) : (
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
                      onClick={handleUpdate}
                      fullWidth // Add fullWidth prop to make button take full width
                    >
                      <Title title={"Update"} /> {/* Change the button label */}
                    </IconButton>
                  )}
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
