import axios from 'axios';

const url = 'http://localhost:5000/form';

export const fetchForm= () => axios.get(url);
export const addForm = (newForm) => axios.post(url, newForm);
export const putForm = (id, updateForm) => axios.patch(`${url}/${id}`, updateForm);;
export const deleteForm = (id, deleteForm) => axios.patch(`${url}/${id}`, deleteForm);;