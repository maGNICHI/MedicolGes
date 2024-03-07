import * as api from '../Dashboard/Dashboard/compnents/api/index.js';
export const getForms = () => async (dispatch) => {
  try {
    const { data } = await api.fetchForm();

    dispatch({ type: 'FETCH_ALL', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
  export const addForm = (form) => async (dispatch) => {
    try {
      const { data } = await api.addForm(form);
  
      dispatch({ type: 'CREATE', payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };