import React from 'react';
import useStyles from '../compnents/CardForm/styles';
 import { Card, Box, Heading, Text } from "@chakra-ui/react";

 import { useDispatch } from 'react-redux';


const FormCard=({ formData, setCurrentId })=>{
const classes = useStyles();
const dispatch = useDispatch();
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


    return (
        <Card className={classes.card}>
        <Box p={4}>
          <Heading className={classes.title} variant="h5" as="h2" mb={2}>
            {formData.name}
          </Heading>
          {formData.questions &&
            Array.isArray(formData.questions) &&
            formData.questions.map((question, index) => (
              <Box key={index} mb={4}>
                <Text fontSize="lg" fontWeight="bold">
                  Question {index + 1}: {question.question}
                </Text>
                <Text variant="body1">Question Type: {question.questionType}</Text>
              </Box>
            ))}
        </Box>
      </Card>
);

}
export default  FormCard;