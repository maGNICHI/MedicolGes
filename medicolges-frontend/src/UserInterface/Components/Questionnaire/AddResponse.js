import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
//SuperAdminLayout/Layout
import Title from "../../../components/Title/Title";

import useStyles from "../../../styless";
import { useDispatch } from "react-redux";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import {

  FormControl,
  FormLabel,
  Button ,
  RadioGroup,
  Radio,
  Checkbox,
  Input,
  Select,
  MenuItem,
  Stack,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaAd, FaAngleDown, FaArchive, FaSave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { sendResponse } from "../../../Dashboard/Dashboard/compnents/api";
import TimePickerInput from "../../../Dashboard/Dashboard/compnents/Form/TimePickerInput";
import { Box, Switch, Text, Textarea } from "@chakra-ui/react";
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

    navigate("/editForm", { state: { formData } });
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
    navigate('/projects')
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
              
            </FormControl>
                    {question.responseValue ? (
                    <Select
                      placeholder="Select Option"
                      value={question.responseValue.selectedOption }
                      onChange={(e) => {
                        // Update the selected option value
                        handleResponse(question.id, e.target.value, "listederoulate");
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
                <Radio colorScheme="blue" >{formData?.questions.find((q) => q.id === question.id)?.responseValue.options[index]} </Radio>
              </RadioGroup>
             
            </Stack>
          ))}
        </div>
        );
      ///cmobox
      case "combobox":
        return (
          <Stack spacing={4}>
        <div>
            {[...Array(question.optionsCount)].map((item, index) => (
              <div key={index}>
          
                          
               <FormControl className="d-flex">
                <Checkbox />
                <FormLabel> {" "}  {          formData.questions.find((q) => q.id === question.id)?.responseValue.checkboxes[index]} </FormLabel>
              </FormControl>
              </div>
            ))}
          </div>
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
  return (
      <Container fluid className="mt-4">
        <Card className="card h-100">
          <Card.Body
            style={{
              backgroundColor: "#ffffffa9",
              padding: "20px",
              borderRadius: "20px",
            }}
          >
            <Row>
            <Col xs={12} md={12} className="text-center">
             
                <Box
                className={classes.appBar}
                position="static"
                color="inherit"
                height="450px"
                backgroundImage={`url(${process.env.PUBLIC_URL}/images/Background/backgray.jpg)`}
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
                          <Box
                            display="flex"
                            alignItems="center"
                            padding="0px"
                            marginBottom="4px"
                          >
                            <Box marginLeft="18px" marginRight="10px">
                              <Text
                                fontSize="18px"
                                fontWeight={600}
                                marginBottom="0px"
                                marginRight="7px"
                                fontFamily="Poppins, sans-serif"
                              >
                                Name of the questionnaire:
                              </Text>
                            </Box>
                            <Box>
                              {formData && (
                                <Text
                                  className={classes.title}
                                  marginBottom="7px"
                                  fontSize="18px"
                                  fontFamily="Poppins, sans-serif"
                                >
                                  {formData.name}
                                  {formData.id}
                                </Text>
                              )}
                            </Box>
                          </Box>
                          <Box>
                            {formData.questions &&
                              Array.isArray(formData.questions) &&
                              formData.questions.map((question, index) => (
                                <Box key={index} marginBottom="20px">
                                  <Box
                                    display="flex"
                                    alignItems="center"
                                    paddingBottom="8px"
                                  >
                                    <Text
                                      fontSize="18px"
                                      fontWeight={600}
                                      fontFamily="Poppins, sans-serif"
                                      paddingBottom="8px"
                                    >
                                      Question {index + 1}: {question.question}
                                    </Text>
                                    {/* You can add Question Type if needed */}
                                  </Box>
                                  {/* Render input field based on question type */}
                                  {renderInputField(question)}
                                </Box>
                              ))}
                          </Box>
                        </>
                      )}
                </div>
                <div className="col-md-12 col-xs-12 d-flex justify-content-end">
                {location.state && location.state.case === "create" ? (
                      <Button
                        variant="solid"
                        colorScheme="blue"
                        size="lg"
                        fontWeight="bold"
                        borderRadius="20px"
                        onClick={handleSave}
                        fullWidth // Add fullWidth prop to make button take full width
                      >
                        Save {/* Change the button label */}
                      </Button>
                    ) : (
                      <Button
                        variant="solid"
                        colorScheme="blue"
                        size="lg"
                        fontWeight="bold"
                        borderRadius="20px"
                        onClick={handleUpdate}
                        fullWidth // Add fullWidth prop to make button take full width
                      >
                        Update {/* Change the button label */}
                      </Button>
                    )}
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
  );
};
export default AjouterForm;

