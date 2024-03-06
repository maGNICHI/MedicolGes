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
//import OrganizationCreate from './Dashboard/OrganizationManagement/OrganizationCreate';
import FeedbackList from './Dashboard/FeedBackManagement/FeedbackList';
import CreateOrganization from './Dashboard/OrganizationManagement/OrganizationCreate';
import CreatePost from './UserInterface/Components/Post/CreatePost'
import PostList from './UserInterface/Components/Post/PostList'
import HomePage  from './UserInterface/Components/Post/HomePage'
import Organization from  './UserInterface/Components/Organization/OrganizationCreate'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/post" element={<CreatePost />} />
        <Route path="/liste" element={<PostList />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/userList" element={<UserManagement />} />
        <Route path="/projectList" element={<ProjectList />} />
        <Route path="/organizationList" element={<OrganizationList />} />
        <Route path="/organizationCreate" element={<CreateOrganization />} />
        <Route path="/organizationFront" element={<Organization />} />
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
