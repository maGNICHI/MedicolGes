import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import ChatProvider from "./UserInterface/Context/ChatProvider";
import { ChakraProvider } from "@chakra-ui/react"; 
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
//import {thunk }from 'redux-thunk';
//const store = createStore(reducers, compose(applyMiddleware(thunk)));
import store from './Redux/Store';
import { createTheme, ThemeProvider  } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root'));
const theme = createTheme({
  palette: {
    background: {
      paper: '#f0f0f0', // Define the background color for Paper component
    },
  },
});
root.render(
  <React.StrictMode>
  <Provider store={store}>
      <BrowserRouter forceRefresh={true}>
        <ChatProvider>
          <ChakraProvider>
          <ThemeProvider theme={theme}>

            <App />
            </ThemeProvider>
          </ChakraProvider>
        </ChatProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
