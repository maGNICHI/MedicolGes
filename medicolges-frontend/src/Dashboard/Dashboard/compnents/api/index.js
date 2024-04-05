import axios from 'axios';

const url = 'http://localhost:5000/form';
const url1 = 'http://localhost:5000/reponse';

export const fetchForm= () => axios.get(url);
export const addForm = (newForm) => axios.post(url, newForm);
export const putForm = (id, updateForm) => axios.put(`${url}/EditForm/${id}`, updateForm);
// export const deleteForm = (id) => axios.delete(`${url}/DeleteForm/${id}`);
export const deleteForm = (id) => axios.delete(`${url}/DeleteForm/${id}`);

export const fetchFormById = async (formId) => {
    try {
      const response = await axios.get(`${url}/affichebyId/${formId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  export const sendResponse = async (id, responses) => {
    try {
        const response = await axios.post(`${url1}/addFormc/${id}`, {
          responses: responses
        });

        // Gérer la réponse de l'API
        console.log('Réponse de l\'API:', response.data);
        return response.data;
    } catch (error) {
        // Gérer les erreurs
        console.error('Erreur lors de l\'envoi de la réponse:', error);
        throw error; // Facultatif : propager l'erreur vers le code appelant
    }
};
//getAllReponse 

export const fetchResponsesByFormId = async (formId) => {
  try {
      const response = await axios.get(`${url1}/responses/${formId}`);
      return response.data;
  } catch (error) {
      console.error('Erreur lors de la récupération des réponses pour le formulaire:', error);
      throw error;
  }
};
// export const fetchResponsesByFormId = async (formId) => {
//   try {
//       const [responses, formData] = await Promise.all([
//         axios.get(`${url1}/responses/${formId}`),
//         fetchFormById(formId) // Supposons que vous avez une fonction fetchFormById pour récupérer les détails du formulaire
//       ]);
//       return { responses: responses.data, formData: formData.data };
//   } catch (error) {
//       console.error('Erreur lors de la récupération des réponses pour le formulaire:', error);
//       throw error;
//   }
// };
