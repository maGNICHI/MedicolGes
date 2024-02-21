import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdSupervisedUserCircle,
  MdOutlineFilePresent,
  MdOutlineDashboard,
  MdDynamicForm,
  MdChat
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import Profile from "views/admin/profile";
import UserTable from 'views/admin/userManagement/user';
import Projects from 'views/admin/projectManagement/project';
//import RTL from "views/admin/rtl";

// Auth Imports
import SignInCentered from "views/auth/signIn";
import AddProject from 'views/admin/projectManagement/Add/addProject';
import ConsultProject from 'views/admin/projectManagement/ConsultProject/consultProject';

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdOutlineDashboard} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "User Management",
    layout: "/admin",
    path: "/users",
    icon: (
      <Icon
        as={MdSupervisedUserCircle}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: UserTable,
    secondary: true,
  },
  {
    name: "Add Project",
    layout: "/admin/projects",
    path: "/add-project",
    component: AddProject,
  },
  {
    name: "Project Management",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    path: "/projects",
    component: Projects,
  },
  {
    name: "Form Management",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdDynamicForm} width='20px' height='20px' color='inherit' />,
    component: Profile,
  },
  {
    name: "Organization Management",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: Profile,
  },
  {
    name: "Forum Management",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdOutlineFilePresent} width='20px' height='20px' color='inherit' />,
    component: Profile,
  },
  {
    name: "Chat",
    layout: "/admin",
    path: "/chat",
    icon: <Icon as={MdChat} width='20px' height='20px' color='inherit' />,
    component: Profile,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: Profile,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignInCentered,
  },
  // {
  //   name: "RTL Admin",
  //   layout: "/rtl",
  //   path: "/rtl-default",
  //   icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
  //   component: RTL,
  // },
];

export default routes;
