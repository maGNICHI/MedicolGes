import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchFormById } from "../compnents/api/index";
import {
    TextField,FormControl,InputLabel,Select,MenuItem,
    Radio,FormControlLabel,  Checkbox,


  } from "@material-ui/core";
  import TimePickerInput from "../compnents/Form/TimePickerInput"; // Importer le composant TimePickerInput

  import PhoneInput from "react-phone-input-2";
  import Switch from "@mui/material/Switch";


function AfficheFormById() {
  const { id } = useParams();
  const [formData, setFormData] = useState({ name: "", questions: [] });

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
            //   handleResponse(question.id, e.target.value, "date");
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
            //   handleResponse(question.id, value, "telephone");
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
                    // handleToggleChange(question.id, e.target.checked); // Mettez à jour la valeur de la réponse avec l'état du toggle
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
            //   handleResponse(question.id, e.target.value, "paragraph");
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
            // onChange={(e) =>
            //   handleResponse(question.id, e.target.value, "time")
            // }
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
                // handleResponse(question.id, e.target.value, "gender");
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
            //   handleResponse(question.id, e.target.value, "text");
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
            //   handleResponse(question.id, e.target.value, "number");
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
            // onChange={(event) =>
            //   handleResponse(question.id, event.target.files[0], "file")
            // } // Utilisez 'event' au lieu de 'e'
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
                // handleResponse(question.id, e.target.value, "dropdown");
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
            //   handleResponse(question.id, e.target.value, "file");
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
            //   handleResponse(question.id, e.target.value, "email");
            }}
            fullWidth
          />
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
        console.error('Erreur lors de la récupération du formulaire:', error);
      }
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
      {formData ? (
        <div>
          <h1>{formData.name}</h1>
          <ul>
          {formData.questions.map((question, index) => (
              <li key={index}>
                Question: {question.question} <br />
                Type de question: {question.questionType} <br />
                {renderInputField(question)}

                {/* Ajoutez d'autres propriétés de question si nécessaire */}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
}

export default AfficheFormById;
