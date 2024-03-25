// store.js

import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import signupReducer from "./SignUp/SignupReducer";
import loginReducer from "./Login/LoginReducer";

const rootReducer = combineReducers({
  signup: signupReducer,
  login: loginReducer,
});

const middleware = [thunk];

const store = createStore(
  rootReducer,
  applyMiddleware(...middleware)
);

export default store;
