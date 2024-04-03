import { REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL } from "./SignupActions";

const initialState = {
  user: null,
  error: null,
  loading: false, // Add loading state
};

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
        loading: false,
      };
    case REGISTER_USER_FAIL:
      return {
        ...state,
        user: null,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default signupReducer;
