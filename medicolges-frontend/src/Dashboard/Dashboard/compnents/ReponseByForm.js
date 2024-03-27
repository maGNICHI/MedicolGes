import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchFormById, fetchResponsesByFormId } from '../compnents/api/index';
import { Card } from 'react-bootstrap'; // Supposons que vous utilisez Bootstrap pour les cartes

function ReponseByForm() {
    const [responses, setResponses] = useState([]);
    const { formId } = useParams();
    const [formData, setFormData] = useState({ id: "", name: "", questions: [] });
  
    useEffect(() => {
      const fetchData = async () => {
        try {
            // Fetch responses and form data concurrently
            const [responseData, formData] = await Promise.all([
                fetchResponsesByFormId(formId),
                fetchFormById(formId)
            ]);
            setResponses(responseData);
            setFormData(formData);
        } catch (error) {
            console.error('Error fetching responses or form data:', error);
        }
    };

    fetchData();
}, [formId]);
    console.log("ssssssssssssssssssssssss",formData)

    return (
      <div>
        <h1>Responses for Form: {formData.name}</h1>
        <h2>Questions:</h2>
       
        <div className="card-container">
          {responses.map((response) => (
            <Card key={response._id} style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Question:
                    {/* {formData.questions.map((question, index) => (
              <li key={index}>
                Question: {question.question} <br />
                Type de question: {question.questionType} <br />

                {/* Ajoutez d'autres propriétés de question si nécessaire */}
              {/* </li>
            ))} */} 
            </Card.Title>
                <Card.Text>
                                {response.responses.map((res, index) => (
                                    <div key={index}>
                                      
                                        Response {index + 1}: {res.responseValue}
                                    </div>
                                ))}
                            </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    );
  }
  
export default ReponseByForm;
