// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import './App.css';
// import Sidebar from './Dashboard/SideBar/SideBar';
// import Dashboard from '../src/Dashboard/Dashboard/Dashboard';
// import HeaderDash from './components/HeaderDash/HeaderDash';
// import UserManagement from './Dashboard/UserManagement/UserList';
// import Login from './auth/login/Login'
// import AjouterForm from './Dashboard/Dashboard/compnents/AjouterForm'
// import Signup from './auth/SignUp/SignUp';
// import Home from "./UserInterface/Pages/Home";
// import Legal from "./UserInterface/Pages/Legal";
// import NotFound from "./UserInterface/Pages/NotFound";
// import Appointment from "./UserInterface/Pages/Appointment";
// import ProjectList from './Dashboard/ProjectManagement/ProjectList';
// import OrganizationList from './Dashboard/OrganizationManagement/OrganizationList';
// import FeedbackList from './Dashboard/FeedBackManagement/FeedbackList';
// import { applyMiddleware, createStore, compose } from 'redux';
// import { reducers } from './reducers';
// import {thunk }from 'redux-thunk';
// import { Provider } from 'react-redux';
// import Form from './Dashboard/FormGeneration/Form';
// import CreateOrganization from './Dashboard/OrganizationManagement/OrganizationCreate';
// import CreatePost from './UserInterface/Components/Post/CreatePost'
// import PostList from './UserInterface/Components/Post/PostList'
// import HomePage  from './UserInterface/Components/Post/HomePage'
// import Organization from  './UserInterface/Components/Organization/OrganizationCreate'
// import AddProject from './Dashboard/ProjectManagement/AddProject/AddProject';
// import ConsultProject from './Dashboard/ProjectManagement/CosultProject/ConsultProject';

// function App() {
//   const store = createStore(reducers, compose(applyMiddleware(thunk)));

//   return (
//     <BrowserRouter>
//       <Provider store={store}>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path='/signup' element={<Signup />} />
//         <Route path="/Dashboard" element={<Dashboard />} />
//         <Route path="/userList" element={<UserManagement />} />
//         <Route path="/projectList" element={<ProjectList />} />
//         <Route path="/formGeneration" element={<Form />} />
//         <Route path="/addProject" element={<AddProject />} />
//         <Route path="/post" element={<CreatePost />} />
//         <Route path="/liste" element={<PostList />} />
//         <Route path="/consultProject/:id" element={<ConsultProject />} />
//         <Route path="/organizationList" element={<OrganizationList />} />
//         <Route path="/organizationCreate" element={<CreateOrganization />} />
//         <Route path="/organizationFront" element={<Organization />} />
//         <Route path="/home" element={<HomePage />} />
//         <Route path="/feedbackList" element={<FeedbackList />} />
//         <Route path="/" element={<Home />} />
//         <Route path="/legal" element={<Legal />} />
//         <Route path="/appointment" element={<Appointment />} />
//         <Route path="/ajouterForm" element={<AjouterForm />} />

//         <Route path="*" element={<NotFound />} />
//       </Routes>
//       </Provider>
//     </BrowserRouter>

//   );
// }

// export default App;


import {   Outlet ,Navigate } from 'react-router-dom';
import './App.css';
import {   Routes, Route,   } from 'react-router-dom'
import { useAuthContext } from './userScreens/useAuthContext'
import { ToastContainer } from 'react-toastify';
 


function App() {
  
  const { user } = useAuthContext();
   
  return (
    <>

    
       <Routes>

       <Route 
              path="/" 
              element={user ? <Navigate to="/" /> : <Navigate to="/login" />} 
            />
             <Route 
              path="/login" 
              element={!user ? <Navigate to="/login" /> : <Navigate to="/" />} 
            />

          <Route 
              path="/Dashboard" 
              element={user ? <Navigate to="/Dashboard" /> : <Navigate to="/admin" />} 
            />
             <Route 
              path="/login" 
              element={!user ? <Navigate to="/admin" /> : <Navigate to="/Dashboard" />} 
            />


 
            
            
            </Routes> 
            <Outlet></Outlet>
            <ToastContainer />
     
    </>
  );
}

export default App;

