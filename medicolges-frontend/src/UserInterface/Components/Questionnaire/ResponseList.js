import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { fetchFormById, fetchResponsesByFormId } from "../../../Dashboard/Dashboard/compnents/api";

function ResponseList({ formId, setNbrResponse }) {
  const [responses, setResponses] = useState([]);
  const [formData, setFormData] = useState({ id: "", name: "", questions: [] });

  ///exele
  const downloadExcel = () => {
    // Créer le contenu HTML pour le fichier Excel
    let excelContent = `<!DOCTYPE html>
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">
      <!--[if gte mso 9]>
      <xml>
        <x:ExcelWorkbook>
          <x:ExcelWorksheets>
            <x:ExcelWorksheet>
              <x:Name>Responses</x:Name>
              <x:WorksheetOptions>
                <x:DisplayGridlines/>
              </x:WorksheetOptions>
            </x:ExcelWorksheet>
          </x:ExcelWorksheets>
        </x:ExcelWorkbook>
      </xml>
      <![endif]-->
    </head>
    <body><table>`;
    
    // Ajouter les en-têtes de colonne
    excelContent += "<tr>";
    formData.questions.forEach(question => {
      excelContent += `<td>${question.question}</td>`;
    });
    excelContent += "</tr>";
  
    // Ajouter les réponses pour chaque question dans une ligne
    responses.forEach(response => {
      excelContent += "<tr>";
      formData.questions.forEach(question => {
        const res = response.responses.find(res => res.questionId === question.id);
        const responseValue = res ? returnResponse(question.questionType, res, true) : '';
        excelContent += `<td>${responseValue}</td>`;
      });
      excelContent += "</tr>";
    });
  
    // Fermer le contenu HTML
    excelContent += "</table></body></html>";
  
    // Convertir le contenu HTML en Blob
    const blob = new Blob([excelContent], { type: 'application/vnd.ms-excel' });
  
    // Créer un objet URL pour le Blob
    const url = URL.createObjectURL(blob);
  
    // Créer un lien <a> pour télécharger le fichier Excel
    const link = document.createElement('a');
    link.href = url;
    link.download = 'responses.xls';
    document.body.appendChild(link);
  
    // Cliquez sur le lien pour démarrer le téléchargement
    link.click();
  
    // Nettoyer l'URL de l'objet
    URL.revokeObjectURL(url);
  };
  
  
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

  // const returnResponse = (questionType, response) => {
  //   switch (questionType) {
  //     case "date":
  //     case "paragraph":
  //     case "text":
  //     case "gender":
  //     case "time":
  //     case "telephone":
  //     case "email":
  //     case "number":
  //       return <span>{response.responseValue}</span>;
  //     case "listederoulate":
  //     case "multipleChoice":
  //       return <span>{response.responseValue.selectedOption}</span>;
  //     case "file":
  //       return <img src={response.responseValue} alt="Response" />;
  //     case "toggle":
  //       return <span>{response.responseValue === true ? "Yes" : "No"}</span>;
  //     case "combobox":
  //       return (
  //         <span>
  //           {response.responseValue.checked.map((item) => (
  //             <span key={item}>{item}, </span>
  //           ))}
  //         </span>
  //       );
  //     default:
  //       return null;
  //   }
  // };
  const returnResponse = (questionType, response,forExcel) => {
    switch (questionType) {
      case "date":
        return response.responseValue;

      case "paragraph":
        return response.responseValue;

      case "text":
        return response.responseValue;

      case "gender":
        return response.responseValue;

      case "time":
        return response.responseValue;

      case "telephone":
        return response.responseValue;

      case "email":
        return response.responseValue;

      case "number":
        return response.responseValue;
      case "listederoulate":
        return response.responseValue.selectedOption;
      case "multipleChoice":
        return response.responseValue.selectedOption;
        case "file":
          return forExcel ? response.responseValue : <img src={response.responseValue} alt="Response" />;

          case "toggle":
        return response.responseValue === true ? "Yes" : "No";
      case "combobox":
        
        return  response.responseValue.checked.map((item ) =>  item ).join(", ") ;

      default:
        return null;
    }
  };
  

  return (
    <div className="my-4" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <button onClick={downloadExcel}>Télécharger Excel</button>

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
