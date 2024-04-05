import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "./LoginActions";

const initialState = {
  user: null,
  error: null,
  loading: false, // Add loading state
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
        loading: false,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        user: null,
        error: action.payload,
        loading: false,
      };
    case LOGOUT:
      return { userInfo: {} };
    default:
      return state;
  }
};

export default loginReducer;
