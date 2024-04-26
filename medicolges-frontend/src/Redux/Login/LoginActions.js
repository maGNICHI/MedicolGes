import axios from 'axios';
import { toast } from 'react-toastify';

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

    if (data.blocked) {
      toast.error('Your account is blocked.');
      dispatch({
        type: LOGIN_FAIL,
        payload: 'Account is blocked.',
      });
      return; // Exit the function early to prevent further actions
    }
console.log(data.isVerified)
console.log(data.blocked)
//  if (!data.isVerified) {
//       toast.error('Your account is not Verified.');
//       dispatch({
//         type: LOGIN_FAIL,
//         payload: 'Account is blocked.',
//       });
//       return; // Exit the function early to prevent further actions
//     }
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
    // Check for a response indicating invalid credentials
    if (error.response && (error.response.status === 401 || error.response.data.message.toLowerCase().includes("invalid credentials"))) {
      toast.error('Invalid email or password.');
    } else {
      toast.error(error.response && error.response.data.message ? error.response.data.message : 'Login failed. Please try again.');
    }
    
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
