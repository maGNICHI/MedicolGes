import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
//SuperAdminLayout/Layout
import Title from "../../../components/Title/Title";

import { AppBar } from "@material-ui/core";
import useStyles from "../../../styless";
import { useDispatch } from "react-redux";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

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
import { FaAd, FaAngleDown, FaArchive, FaSave } from "react-icons/fa";
import Switch from "@mui/material/Switch";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { sendResponse } from "../../../Dashboard/Dashboard/compnents/api";
import TimePickerInput from "../../../Dashboard/Dashboard/compnents/Form/TimePickerInput";
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
    console.log("im here");
    switch (question.questionType) {
      // case "date":
      //   return (
      //     <TextField
      //       name="dateAnswer"
      //       type="date"
      //       variant="outlined"
      //       fullWidth
      //     />
      //   );
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
            required

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
                  checked={question.responseValue === "true"} // Utilisez responseValue pour indiquer si le toggle est activé ou désactivé
                  onChange={(e,value) => {
                    const checked = e.target.checked ? "true" : "false"; // Convertit le booléen en chaîne
                    console.log("aaaaaaaaaaaaaaaa",handleToggleChange)
                    console.log("bbb",handleResponse)
                    console.log("ccc",question.id)
                    handleToggleChange(question.id, checked); // Mettez à jour la valeur de la réponse avec l'état du toggle
                    handleResponse(question.id, checked ,value, "toggle"); // Met à jour la valeur de réponse dans le state

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
            error={question.responseValue && !isValidEmail(question.responseValue)} // Example validation function
          helperText={question.responseValue && !isValidEmail(question.responseValue) ? 'Invalid email format' : ''}
  
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
      case "paragraph":
        return (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            name="paragraphAnswer"
            multiline
            rows={4}
            variant="outlined"
            value={question.responseValue}
            onChange={(e) => {
              handleResponse(question.id, e.target.value, "paragraph");
              //ajouter
            // Ajouter la validation ici
          if (e.target.value.length > 0 && e.target.value.length < 20) {
            setTextError('Votre réponse doit contenir au moins 20 caractères.');
          } else {
            setTextError('');
          }
              
            }}
            label={
              question.questionType === "paragraph"
                ? "Your Paragraph Answer"
                : ""
            }
            fullWidth
            />

            {error && (
              <Typography variant="caption" color="error" style={{marginRight: '1172px', marginTop: '8px' }}>
                {textError}
              </Typography>
           )}
           </div>
        );
      case "text":
        return (
          <div>
          <TextField
            name="textAnswer"
            rows={4}
            variant="outlined"
            value={question.responseValue}
            onChange={(e) => {
              handleResponse(question.id, e.target.value, "text");
              if (e.target.value.length > 0 && e.target.value.length < 8) {
                setError('Votre réponse doit contenir au moins 8 caractères.');
              } else {
                setError('');
              }
            }}
            label={question.questionType === "text" ? "Your Text Answer" : ""}
            fullWidth
            required  // Rendre le champ obligatoire
         
          />
          {error && (
  <Typography variant="caption" color="error" style={{  marginTop: '8px', marginRight: '1172px' }}>
    {error}
  </Typography>
)}
</div>
        );
      case "file":
        return (
          <div>
            <input
              type="file"
              accept=".pdf, .mp4, .avi, .mov, .wmv, .flv, .mkv, .jpg, .png "
              onChange={(event) =>
                handleResponse(question.id, event.target.files[0], "file")
              }

            />
      {image && <img src={image}  className="w-40 h-40" style={{ marginLeft: '557px', marginTop: '19px' }} alt="Uploaded" />}

          </div>
        );
      case "time":
        return (
          <div style={{ marginRight: "1400px", color: "black" }}>
            {" "}
            {/* Décalage à gauche */}
            <TimePickerInput
              value={question.responseValue}
              style={{ width: "100%", maxWidth: "400px" }}
              onChange={(e) =>
                handleResponse(question.id, e.target.value, "time")
              }
              fullWidth
              variant="outlined"
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
      // case "multipleChoice":
      //   return (
      //     <FormControl component="fieldset">
      //       <FormGroup>
      //         {question.responseValue.options.map((option, index) => (
      //           <div
      //             key={index}
      //             style={{
      //               display: "flex",
      //               alignItems: "center",
      //               marginTop: "10px",
      //             }}
      //           >
      //             <FormControlLabel
      //               control={<Radio />}
      //               checked={multipleChoiceAnswers[question.id] === option}
      //               onChange={() =>
      //                 handleMultipleChoiceResponse(question.id, option)
      //               }
      //             />
      //             <TextField
      //               disabled={!canEditQuestions}
      //               variant="outlined"
      //               value={option}
      //               onChange={(e) =>
      //                 handleOptionInputChange(
      //                   question.id,
      //                   index,
      //                   e.target.value
      //                 )
      //               }
      //               fullWidth
      //               style={{ width: "1258px" }}
      //             />
      //             {/* Afficher la réponse de l'utilisateur pour cette option */}
      //           </div>
      //         ))}
      //       </FormGroup>
      //     </FormControl>
      //   );
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
                  disabled={!canEditQuestions}
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
                      checked={question.responseValue.checked.some(
                        (x) => x == question.responseValue.checkboxes[index]
                      )}
                      onChange={(event) => {
                        handleResponse(
                          question.id,
                          question.responseValue.checkboxes[index],
                          "combobox"
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
      case "listederoulate":
        return (
          <>
            {/* <TextField
                // label="Enter Option"
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
                    document.getElementById('selectChoicesInput').value = ''
                  }
                }}
                fullWidth
              /> */}
            {question.responseValue ? (
              <Select
                label="Select Option"
                onChange={(e) => {
                  handleResponse(question.id, e.target.value, "listederoulate");
                }}
                fullWidth
              >
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
                <AppBar
                  className={classes.appBar}
                  position="static"
                  color="inherit"
                  style={{
                    height: "210px",
                    backgroundImage: `url(${process.env.PUBLIC_URL}/images/Background/backgray.jpg)`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                >
                  <Title
                    secondTitle={"Form Generation"}
                    fontSize={"50px"}
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
                              fontFamily: "Poppins, sans-serif",
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
                                fontFamily: "Poppins, sans-serif",
                              }} // Taille de police et police de caractères identiques
                            >
                              {formData.name}
                              {formData.id}
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
                                    fontFamily: "Poppins, sans-serif", // Police de caractères identique
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
                  {location.state && location.state.case == "create" ? (
                    <IconButton
                      className="w-100 border-0"
                      style={{
                        background: "#1990aa",
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
                      className="w-100 border-0"
                      style={{
                        background: "#1990aa",
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
  );
};
export default AjouterForm;
