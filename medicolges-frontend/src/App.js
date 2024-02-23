import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Sidebar from './Dashboard/SideBar/SideBar';
import Dashboard from '../src/Dashboard/Dashboard/Dashboard';
import HeaderDash from './components/HeaderDash/HeaderDash';
import UserManagement from './Dashboard/UserManagement/UserList';
import Login from './auth/login/Login'
import Signup from './auth/SignUp/SignUp';
import Home from "./UserInterface/Pages/Home";
import Legal from "./UserInterface/Pages/Legal";
import NotFound from "./UserInterface/Pages/NotFound";
import Appointment from "./UserInterface/Pages/Appointment";
import ProjectList from './Dashboard/ProjectManagement/ProjectList';
import OrganizationList from './Dashboard/OrganizationManagement/OrganizationList';
import FeedbackList from './Dashboard/FeedBackManagement/FeedbackList';
import ChatProvider from "./UserInterface/chatbot/Context/ChatProvider";
import { ChakraProvider } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import HomePage from './UserInterface/chatbot/Pages/HomePage';
 import ChatPage from './UserInterface/chatbot/Pages/ChatPage';
//  const HomePage = React.lazy(() => import("./UserInterface/chatbot/Pages/HomePage"));
//  const ChatPage = React.lazy(() => import("./UserInterface/chatbot/Pages/ChatPage"));


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/userList" element={<UserManagement />} />
        <Route path="/projectList" element={<ProjectList />} />
        <Route path="/organizationList" element={<OrganizationList />} />
        <Route path="/feedbackList" element={<FeedbackList />} />
        <Route path="/" element={<Home />} />
      
      
      <Route path="/login2" element={<HomePage />} />
        <Route path="/chats" element={<ChatPage />} />
        
     
        
     
        <Route path="/legal" element={<Legal />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
