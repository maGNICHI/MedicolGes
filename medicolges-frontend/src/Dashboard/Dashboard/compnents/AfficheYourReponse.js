import React , {  useState } from 'react';
import { useLocation } from 'react-router-dom';

const AfficheYourReponse = () => {
  const location = useLocation(); // Hook pour obtenir les données passées depuis la page précédente
  const [formData, setFormData] = useState({ name: "", questions: [] });

  // Extrayez les valeurs de l'objet de location.state
  const { name, questions } = location.state;

  return (
    <div>
      <h2>Page Affiche Reponse</h2>
      <p>Nom du questionnaire : {formData.name}</p>
      {/* <div>
        {questions.map((question, index) => (
          <div key={index}>
            <p>Question {index + 1}: {question.question}</p>
            <p>Réponse : {question.responseValue}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default AfficheYourReponse;
