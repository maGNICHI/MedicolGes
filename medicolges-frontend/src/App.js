import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import AddProject from './Dashboard/ProjectManagement/AddProject/AddProject';
import ConsultProject from './Dashboard/ProjectManagement/CosultProject/ConsultProject';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/userList" element={<UserManagement />} />
        <Route path="/projectList" element={<ProjectList />} />
        <Route path="/addProject" element={<AddProject />} />
        <Route path="/consultProject/:id" element={<ConsultProject />} />
        <Route path="/organizationList" element={<OrganizationList />} />
        <Route path="/feedbackList" element={<FeedbackList />} />
        <Route path="/" element={<Home />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
