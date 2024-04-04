import axios from 'axios';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('http://localhost:5000/api/user/login', { email, password }, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
    if (data.role === 'super admin') {
        window.location.href = 'http://localhost:3000/dashboard'; // Redirect to dashboard interface
      } else {
        window.location.href = 'http://localhost:3000/'; // Redirect to default URL
      }
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: LOGOUT });
};
