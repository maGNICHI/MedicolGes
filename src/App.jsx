import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Sidebar from './Dashboard/SideBar/SideBar';
import Dashboard from './Dashboard/Dashboard/Dashboard';
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
import About from './UserInterface/Components/profile';
import { Outlet, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import UserHeader from "./UserInterface/UserComponents/Header";
import AdminHeader from "./Dashboard/AdminComponents/AdminHeader";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");
  return (
    <>
     
    { isAdminPage ? <AdminHeader/> : <UserHeader/> }
      <ToastContainer />
      <Container className="my-2">
        <Outlet/>
      </Container>
       
    </>
  );
}

export default App;
