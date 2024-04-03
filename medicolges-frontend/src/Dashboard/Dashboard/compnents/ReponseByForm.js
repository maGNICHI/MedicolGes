import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchFormById, fetchResponsesByFormId } from "../compnents/api/index";
import { Card } from "react-bootstrap"; // Supposons que vous utilisez Bootstrap pour les cartes

function ReponseByForm() {
  const [responses, setResponses] = useState([]);
  const { formId } = useParams();
  const [formData, setFormData] = useState({ id: "", name: "", questions: [] });

  useEffect(() => {
    const fetchData = async (formId) => {
      try {
        const [responseData, formData] = await Promise.all([
          fetchResponsesByFormId(formId),
          fetchFormById(formId),
        ]);
        console.log(responseData, formData);
        // Traitement spécifique pour formData
        if (formData.questions) {
          formData.questions = JSON.parse(formData.questions);
        }

        setResponses(responseData);
        setFormData(formData);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des réponses ou du formulaire :",
          error
        );
      }
    };

    fetchData(formId);
  }, [formId]);

  const returResponse = (quetionType, response) => {
    switch (quetionType) {
      case "date":
        return <span> {response.responseValue} </span>;
        break;
      case "listederoulate":
        return <span> {response.responseValue.selectedOption} </span>;
        break;
      case "multipleChoice":
        return <span> {response.responseValue.selectedOption} </span>;
        break;
      case "paragraph":
        return <span> {response.responseValue} </span>;
        break;
      case "text":
        return <span> {response.responseValue} </span>;
        break;
      case "gender":
        return <span> {response.responseValue} </span>;
        break;
      case "time":
        return <span> {response.responseValue} </span>;
        break;
      case "telephone":
        return <span> {response.responseValue} </span>;
        break;
      case "file":
        return <img src={response.responseValue} />  ;
        break;
      case "email":
        return <span> {response.responseValue} </span>;
        break;
      case "toggle":
        return <span> {response.responseValue == true ? 'Oui' : 'Non'} </span>;
        break;
      case "combobox":
        return <span> {response.responseValue.checked.map(item => <> {item + ', ' }</>) } </span>;
        break;

      default:
        return null;
        break;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ fontSize: '20px', marginBottom: '36px' }}>Responses for Form: {formData.name} ({responses.length} responses)</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {responses.map((response, index) => (
          <div key={index} style={{ width: '400px', backgroundColor: 'rgb(255, 255, 255)', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', gap: '20px', position: 'relative', overflow: 'hidden', boxShadow: '2px 2px 20px rgba(0, 0, 0, 0.062)' }}>
            {response.responses.map((res, resIndex) => (
              <div key={resIndex}>
                <Card style={{ width: '100%' }}>
                  <Card.Body>
                    <Card.Title style={{ fontSize: '16px', marginBottom: '5px' }}>
                      <strong> Question:</strong> {formData.questions.find((question) => question.id === res.questionId).question} <br />
                      Type de question: {formData.questions.find((question) => question.id === res.questionId).questionType} <br />
                    </Card.Title>
                    <Card.Text style={{marginBottom:'2px'}}>
                      {returResponse(formData.questions.find((question) => question.id === res.questionId).questionType, res)}
                      <br />
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReponseByForm;
