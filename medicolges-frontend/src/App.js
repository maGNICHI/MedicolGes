import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Sidebar from './Dashboard/SideBar/SideBar';
import Dashboard from '../src/Dashboard/Dashboard/Dashboard';
import HeaderDash from './components/HeaderDash/HeaderDash';
import UserManagement from './Dashboard/UserManagement/UserList';
import Login from './auth/login/Login'
import AjouterForm from './Dashboard/Dashboard/compnents/AjouterForm'
import AfficheForm from './Dashboard/Dashboard/compnents/AfficheForm'
import AfficheFormById from './Dashboard/Dashboard/compnents/AfficheFormById'

import Signup from './auth/SignUp/SignUp';
import Home from "./UserInterface/Pages/Home";
import Legal from "./UserInterface/Pages/Legal";
import NotFound from "./UserInterface/Pages/NotFound";
import Appointment from "./UserInterface/Pages/Appointment";
import ProjectList from './Dashboard/ProjectManagement/ProjectList';
import OrganizationList from './Dashboard/OrganizationManagement/OrganizationList';
import FeedbackList from './Dashboard/FeedBackManagement/FeedbackList';
import { applyMiddleware, createStore, compose } from 'redux';
import { reducers } from './reducers';
import {thunk }from 'redux-thunk';
import { Provider } from 'react-redux';
import Form from './Dashboard/FormGeneration/Form';
import AfficheYourReponse from './Dashboard/Dashboard/compnents/AfficheYourReponse';
import AfficheReponse from './Dashboard/Dashboard/compnents/AfficherReponse';
import ReponseByForm from './Dashboard/Dashboard/compnents/ReponseByForm';

function App() {
  const store = createStore(reducers, compose(applyMiddleware(thunk)));

  return (
    <BrowserRouter>
      <Provider store={store}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/userList" element={<UserManagement />} />
        <Route path="/projectList" element={<ProjectList />} />
        <Route path="/formGeneration" element={<Form />} />
        <Route path="/organizationList" element={<OrganizationList />} />
        <Route path="/feedbackList" element={<FeedbackList />} />
        <Route path="/" element={<Home />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/ajouterForm" element={<AjouterForm />} />
        <Route path="/afficheForm" element={<AfficheForm/>} />
        <Route path="/afficheId/:id" element={<AfficheFormById />} />
        <Route path="/affucheyourReponse" element={<AfficheYourReponse />} />
        <Route path="/AfficheReponse" element={<AfficheReponse />} />
        <Route path="/reponseAll/:formId" element={<ReponseByForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Provider>
    </BrowserRouter>

  );
}

export default App;
