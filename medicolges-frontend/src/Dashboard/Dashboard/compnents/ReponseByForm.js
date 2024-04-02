import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchFormById, fetchResponsesByFormId } from '../compnents/api/index';
import { Card } from 'react-bootstrap'; // Supposons que vous utilisez Bootstrap pour les cartes

function ReponseByForm() {
    const [responses, setResponses] = useState([]);
    const { formId } = useParams();
    const [formData, setFormData] = useState({ id: "", name: "", questions: [] });
  
    useEffect(() => {
      const fetchData = async (formId) => {
        try {
          const [responseData, formData] = await Promise.all([
            fetchResponsesByFormId(formId),
            fetchFormById(formId)
          ]);
    
          // Traitement spécifique pour formData
          if (formData.questions) {
            formData.questions = JSON.parse(formData.questions);
          }
    
          setResponses(responseData);
          setFormData(formData);
        } catch (error) {
          console.error('Erreur lors de la récupération des réponses ou du formulaire :', error);
        }
      };
    
      fetchData(formId);
    
    }, [formId]);
    
    console.log("ssssssssssssssssssssssss",formData)
    const handleResponse = (id, responseValue, responseType) => {
      console.log("kkkkkk", id, responseValue, responseType);
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
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ fontSize: '20px', marginBottom: '36px' }}>Responses for Form: {formData.name} ({responses.length} responses)</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          {responses.map((response, index) => (
            <div key={index} style={{ width: '400px', backgroundColor: 'rgb(255, 255, 255)', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', gap: '20px', position: 'relative', overflow: 'hidden', boxShadow: '2px 2px 20px rgba(0, 0, 0, 0.062)' }}>
              <Card style={{ width: '100%' }}>
                <Card.Body>
                  {formData.questions.map((question, qIndex) => (
                    <div key={qIndex}>
                      <Card.Title style={{ fontSize: '16px', marginBottom: '5px' }}>
                      <strong> Question:</strong> {question.question} <br />
                        Type de question: {question.questionType} <br />
                      </Card.Title>
                      <Card.Text style={{marginBottom:'2px'}}>
                        {response.responses[qIndex] && (
                          <>
                            <strong>Response:</strong>{' '}
                            {/* //ajouter */}
                            {/* {question.questionType === "multipleChoice" && response.responses[qIndex].responseValue.selectedOption && (
        <>
          {response.responses[qIndex].responseValue.selectedOption}<br />
        </>
      )} */}
{/* {question.questionType === "multipleChoice" && response.responses[qIndex].responseValue.selectedOption && (
  <>
    <strong>Response:</strong>{' '}
    {response.responses[qIndex].responseValue.selectedOption}
    <br />
  </>
)} */}


                            {question.questionType === "toggle" ? (
  response.responses[qIndex].responseValue.toString() // Affiche directement la valeur booléenne sous forme de chaîne
  ) : (
  (question.questionType === "file" && response.responses[qIndex].responseValue) ? (
    // Check if responseValue is a valid image URL
    Array.isArray(response.responses[qIndex].responseValue) ? (
      response.responses[qIndex].responseValue.map((imageUrl, idx) => (
        <div key={idx}>
          <img src={imageUrl} alt={`Response Image ${idx}`} style={{ maxWidth: '100%', maxHeight: '200px' }} />
          <br />
        </div>
      ))
    ) : (
      <img src={response.responses[qIndex].responseValue} alt="Response Image" style={{ maxWidth: '100%', maxHeight: '200px' }} />
    )
  ) : (
    response.responses[qIndex].responseValue
  )
)}
                            {/* {response.responses[qIndex].responseValue} */}
                            <br />
                          </>
                        )}
                      </Card.Text>
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    );
    
    
    
    
    
    
    
    
  }
  
export default ReponseByForm;
