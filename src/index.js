// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import 'bootstrap/dist/css/bootstrap.min.css';


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
// import store from './store.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
 

import { UsersContextProvider } from './userScreens/UserContext'

import Sidebar from './Dashboard/SideBar/SideBar';
import Dashboard from '../src/Dashboard/Dashboard/Dashboard';
import HeaderDash from './components/HeaderDash/HeaderDash';
import UserManagement from './Dashboard/UserManagement/UserList';
// import Login from './auth/login/Login'
import AjouterForm from './Dashboard/Dashboard/compnents/AjouterForm'
// import Signup from './auth/SignUp/SignUp';
import Home from "./UserInterface/Pages/Home";
import Legal from "./UserInterface/Pages/Legal";
import NotFound from "./UserInterface/Pages/NotFound";
import Appointment from "./UserInterface/Pages/Appointment";
import ProjectList from './Dashboard/ProjectManagement/ProjectList';
import OrganizationList from './Dashboard/OrganizationManagement/OrganizationList';
import FeedbackList from './Dashboard/FeedBackManagement/FeedbackList';
import Form from './Dashboard/FormGeneration/Form';
import CreateOrganization from './Dashboard/OrganizationManagement/OrganizationCreate';
import CreatePost from './UserInterface/Components/Post/CreatePost'
import PostList from './UserInterface/Components/Post/PostList'
import HomePage  from './UserInterface/Components/Post/HomePage'
import Organization from  './UserInterface/Components/Organization/OrganizationCreate'
import AddProject from './Dashboard/ProjectManagement/AddProject/AddProject';
import ConsultProject from './Dashboard/ProjectManagement/CosultProject/ConsultProject';
// import { Provider } from 'react-redux';
 
// import { applyMiddleware, createStore, compose } from 'redux';

import { reducers } from './reducers';
import {thunk }from 'redux-thunk';
import LoginScreen from "./userScreens/LoginScreen.js";

import { AuthContextProvider } from './userScreens/AuthContext'

import SignupScreen from "./userScreens/SignupScreen.js";
import AdminSignup from './adminScreens/SignupScreen.js';  
 import AdminLoginScreen from './adminScreens/LoginScreen.js';

//const store = createStore(reducers, compose(applyMiddleware(thunk)));
 
const router = createBrowserRouter(
   
  createRoutesFromElements(
    <Route path="/" element={<App />}>
       <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/signup" element={<SignupScreen />} />
    <Route index={true} path="/home" element={<HomePage />} />

    <Route path="/newadmin" element={<AdminSignup />} />
    <Route path="/admin" element={<AdminLoginScreen />} />
       
        <Route path="/userList" element={<UserManagement />} />
        <Route path="/projectList" element={<ProjectList />} />
        <Route path="/formGeneration" element={<Form />} />
        <Route path="/addProject" element={<AddProject />} />
        <Route path="/post" element={<CreatePost />} />
        <Route path="/liste" element={<PostList />} />
        <Route path="/consultProject/:id" element={<ConsultProject />} />
        <Route path="/organizationList" element={<OrganizationList />} />
        <Route path="/organizationCreate" element={<CreateOrganization />} />
        <Route path="/organizationFront" element={<Organization />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/feedbackList" element={<FeedbackList />} />
        <Route path="/" element={<Home />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/ajouterForm" element={<AjouterForm />} />

        
 

    </Route>
  ))
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   
  <React.StrictMode>
    
  <AuthContextProvider>
  <UsersContextProvider>
  
     <RouterProvider router={router}  >
     
   
      </RouterProvider>
      
      </UsersContextProvider>
      
      </AuthContextProvider>
  </React.StrictMode>
   
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



