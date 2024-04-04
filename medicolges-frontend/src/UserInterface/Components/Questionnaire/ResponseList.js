import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { fetchFormById, fetchResponsesByFormId } from "../../../Dashboard/Dashboard/compnents/api";

function ResponseList({ formId, setNbrResponse }) {
  const [responses, setResponses] = useState([]);
  const [formData, setFormData] = useState({ id: "", name: "", questions: [] });

  useEffect(() => {
    const fetchData = async (formId) => {
      try {
        const [responseData, formData] = await Promise.all([
          fetchResponsesByFormId(formId),
          fetchFormById(formId),
        ]);
        console.log(responseData, formData);
        // Specific processing for formData
        if (formData.questions) {
          formData.questions = JSON.parse(formData.questions);
        }

        setResponses(responseData);
        setFormData(formData);
        setNbrResponse(responseData.length);
      } catch (error) {
        console.error("Error fetching responses or form:", error);
      }
    };

    fetchData(formId);
  }, [formId]);

  const returnResponse = (questionType, response) => {
    switch (questionType) {
      case "date":
      case "paragraph":
      case "text":
      case "gender":
      case "time":
      case "telephone":
      case "email":
      case "number":
        return <span>{response.responseValue}</span>;
      case "listederoulate":
      case "multipleChoice":
        return <span>{response.responseValue.selectedOption}</span>;
      case "file":
        return <img src={response.responseValue} alt="Response" />;
      case "toggle":
        return <span>{response.responseValue === true ? "Yes" : "No"}</span>;
      case "combobox":
        return (
          <span>
            {response.responseValue.checked.map((item) => (
              <span key={item}>{item}, </span>
            ))}
          </span>
        );
      default:
        return null;
    }
  };
  

  return (
    <div className="my-4" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        {responses.map((response, index) => (
          <div key={index} style={{ width: "400px", backgroundColor: "rgb(255, 255, 255)", borderRadius: "8px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px", gap: "20px", position: "relative", overflow: "hidden", boxShadow: "2px 2px 20px rgba(0, 0, 0, 0.062)" }}>
            <Card style={{ width: "100%" }}>
              <Card.Body>
                {response.responses.map((res, resIndex) => (
                  <div key={resIndex}>
                    <Card.Title style={{ fontSize: "16px", marginBottom: "5px" }}>
                      <strong>Question:</strong> {formData.questions.find((question) => question.id === res.questionId).question}
                      <br />
                      Question Type: {formData.questions.find((question) => question.id === res.questionId).questionType}
                      <br />
                    </Card.Title>
                    <Card.Text style={{ marginBottom: "2px" }}>
                      <strong>Response:</strong>{" "}
                      {returnResponse(formData.questions.find((question) => question.id === res.questionId).questionType, res)}
                      <br />
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

export default ResponseList;
