import axios from 'axios';

const url = 'http://localhost:5000/form';

export const fetchForm= () => axios.get(url);
export const addForm = (newForm) => axios.post(url, newForm);
export const putForm = (id, updateForm) => axios.put(`${url}/EditForm/${id}`, updateForm);
export const deleteForm = (id, deleteForm) => axios.patch(`${url}/${id}`, deleteForm);;
export const fetchFormById = async (id) => {
    try {
      const response = await axios.get(`${url}/affichebyId/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

