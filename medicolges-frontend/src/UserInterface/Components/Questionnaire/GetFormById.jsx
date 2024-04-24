import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
 
import {
  UnorderedList,
  ListItem,
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
} from '@chakra-ui/react'
import PhoneInput from "react-phone-input-2";
 //import Layout from "../../../Dashboard/SuperAdminLayout/Layout";

import { Card, Col, Container, Row } from "react-bootstrap";
import TimePickerInput from "../../../Dashboard/Dashboard/compnents/Form/TimePickerInput";
import { fetchFormById } from "../../../Dashboard/Dashboard/compnents/api";
 //import Layout from '../../SuperAdminLayout/Layout';

function GetFormById() {
  const [selectedName, setSelectedName] = useState("Dashboard");

  const { id } = useParams();
  const [formData, setFormData] = useState({ name: "", questions: [] });
 
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
  useEffect(() => {
    const fetchData = async (form) => {
      try {
        const formData = await fetchFormById(id);

        // Si formData.questions existe, convertir la chaîne JSON en objet JavaScript
        if (formData.questions) {
          formData.questions = JSON.parse(formData.questions);
        }

        // Mettre à jour l'état avec les données récupérées
        setFormData(formData);
      } catch (error) {
        console.error("Erreur lors de la récupération du formulaire:", error);
      }
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    // <div>
    //   {formData ? (
    //     <div>
    //       <h1>{formData.name}</h1>
    //       {formData.id}
    //       <ul>
    //       {formData.questions.map((question, index) => (
    //           <li key={index}>
    //             Question: {question.question} <br />
    //             Type de question: {question.questionType} <br />
    //             {renderInputField(question)}

    //             {/* Ajoutez d'autres propriétés de question si nécessaire */}
    //           </li>
    //         ))}
    //       </ul>
    //     </div>
    //   ) : (
    //     <p>Chargement...</p>
    //   )}
    // </div>

    <Container className="mt-16" maxW="100%" h="100vh"   overflowY="auto">
    <Card bg="rgba(255, 255, 255, 0.66)" borderRadius="20px">
      {formData ? (
        <Box className=" p-3">
          <Text fontWeight="bold" color="black" fontSize="xl"  >
            Name of Fom: {formData.name}
          </Text>
          {formData.id}
          <UnorderedList>
            {formData.questions.map((question, index) => (
              <ListItem key={index}>
                <Text fontWeight="bold" color="black">
                  Question: {question.question}
                </Text>
                {renderInputField(question)}
              </ListItem>
            ))}
          </UnorderedList>
        </Box>
      ) : (
        <Text>Chargement...</Text>
      )}
    </Card>
  </Container>
  );
}

export default GetFormById;
