import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Dashboard from '../src/Dashboard/Dashboard/Dashboard';
import UserManagement from './Dashboard/UserManagement/UserList';
import Login from './auth/login/Login'
import AjouterForm from './Dashboard/Dashboard/compnents/AjouterForm'
import Signup from './auth/SignUp/SignUp';
import Home from "./UserInterface/Pages/Home";
import Legal from "./UserInterface/Pages/Legal";
import NotFound from "./UserInterface/Pages/NotFound";
import Appointment from "./UserInterface/Pages/Appointment";
import ProjectList from './Dashboard/ProjectManagement/ProjectList';
import OrganizationList from './Dashboard/OrganizationManagement/OrganizationList';
import FeedbackList from './Dashboard/FeedBackManagement/FeedbackList';
//import { applyMiddleware, createStore, compose } from 'redux';
//import { reducers } from './reducers';
//import {thunk }from 'redux-thunk';
//import { Provider } from 'react-redux';
import Form from './Dashboard/FormGeneration/Form';
import CreateOrganization from './Dashboard/OrganizationManagement/OrganizationCreate';
import CreatePost from './UserInterface/Components/Post/CreatePost'
import PostList from './UserInterface/Components/Post/PostList'
import HomePage from './UserInterface/Components/Post/HomePage'
import Organization from './UserInterface/Components/Organization/OrganizationCreate'
import OrganizationShow from './UserInterface/Components/Organization/OrganizationList'
import AddProject from './Dashboard/ProjectManagement/AddProject/AddProject';
import ConsultProject from './Dashboard/ProjectManagement/CosultProject/ConsultProject';
import ListProject from './UserInterface/Components/ProjectManagement/ListProject';
import Add from './UserInterface/Components/ProjectManagement/AddProject/AddProject';
import Consult from './UserInterface/Components/ProjectManagement/ConsultProject/ConsultProject';
import AfficheForm from './Dashboard/Dashboard/compnents/AfficheForm';
import HomePost1 from './UserInterface/Components/PostNew/home/homePost1';
import AddResponseComponent from './UserInterface/Components/Questionnaire/AddResponseComponent';
import UpdateQuestionnaireComponent from './UserInterface/Components/Questionnaire/UpdateQuestionnaireComponent';
import EditQuestionnaire from './UserInterface/Components/Questionnaire/EditQuestionnaire';
import GetFormById from './UserInterface/Components/Questionnaire/GetFormById';
import SignupScreen from "./userScreens/SignupScreen.js";
import LoginScreen from "./userScreens/LoginScreen.js";
import ProfileScreen from './userScreens/profile/profile.js';
import AdminProfileScreen from './adminScreens/profile/profile.js';
import DiseaseAI from './UserInterface/Components/DiseaseAi.js';
import FacialAuth from './userScreens/facial.js'
import ProtectedRoute from './userScreens/protect.js'
import TwoFactorAuthSetup from './userScreens/qrcode.js'
import FacialAuthLive from './userScreens/live picture.js'
import VerificationPage from "./userScreens/Email.js";
import ForgotPassword from "./userScreens/ForgotPassword.js";
import TreatmentExcelFile from "./UserInterface/Components/ProjectManagement/ConsultProject/Treatement.js";

const ChatPage = React.lazy(() => import("./UserInterface/Pages/ChatPage"));

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  // const store = createStore(reducers, compose(applyMiddleware(thunk)));

  // Allow access to login and signup pages when the user is not logged in

  // const store = createStore(reducers, compose(applyMiddleware(thunk)));

  return (

    <Routes>

      <Route path="/login" element={<Login />} />
      <Route path="/qr" element={<TwoFactorAuthSetup />} />
      <Route path="/" element={<Home />} />
      {/* <Route path="/dashboard" element={
        <ProtectedRoute roleRequired="super admin">
          <Dashboard />
        </ProtectedRoute>
      } /> */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-email" element={<VerificationPage />} />
      <Route path="/face" element={<FacialAuth />} />
      <Route path="/faceauth" element={<FacialAuthLive />} />
      {/* <Route path="/signup" element={<Signup />} /> */}
      <Route path="/signup" element={<SignupScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/Profile" element={<ProfileScreen />} />
      <Route path="/login" element={<Login />} />
      <Route path='/signupp' element={<Signup />} />
      <Route path="/AdminProfile" element={<AdminProfileScreen />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/userList" element={<UserManagement />} />
      <Route path="/projectList" element={<ProjectList />} />
      <Route path="/projectList" element={<ProjectList />} />
      <Route path="/formGeneration" element={<Form />} />
      <Route path="/addProject" element={<AddProject />} />
      <Route path="/post" element={<CreatePost />} />
      <Route path="/chats" element={<ChatPage />} />
      <Route path="/liste" element={<PostList />} />
      <Route path="/consultProject/:id" element={<ConsultProject />} />
      <Route path="/organizationList" element={<OrganizationList />} />
      <Route path="/organizationCreate" element={<CreateOrganization />} />
      <Route path="/organizationFront" element={<Organization />} />
      <Route path="/organizationShow" element={<OrganizationShow />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/feedbackList" element={<FeedbackList />} />
      <Route path="/" element={<Home />} />
      <Route path="/legal" element={<Legal />} />
      <Route path="/appointment" element={<Appointment />} />
      <Route path="/ajouterForm" element={<AjouterForm />} />
      <Route path='/addResponse' element={<AddResponseComponent />} />
      <Route path='/updateForm' element={<UpdateQuestionnaireComponent />} />
      <Route path='/editForm' element={<EditQuestionnaire />} />
      <Route path="/afficheId/:id" element={<GetFormById />} />
      <Route path='/projects' element={<ListProject />} />
      <Route path='/projects/add' element={<Add />} />
      <Route path='/projects/consult/:id' element={<Consult />} />
      <Route path="/afficheForm" element={<AfficheForm />} />
      <Route path="/homeNew" element={<HomePost1 />} />
      <Route path="/disease" element={<DiseaseAI />} />
      <Route path="/treatement" element={<TreatmentExcelFile />} />

      <Route path="*" element={<NotFound />} />
    </Routes>


  );
}

export default App;