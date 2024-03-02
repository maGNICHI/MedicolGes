import { FaBuilding, FaComment, FaFolder, FaTh, FaUser } from "react-icons/fa";

const menuItem = [
  {
    path: "/Dashboard",
    name: "Dashboard",
    icon: <FaTh />,
  },
  {
    path: "/userList",
    name: "User Management",
    icon: <FaUser />,
  },
  {
    path: "/projectList",
    name: "Project Management",
    icon: <FaFolder />,
  },
  {
    path: "/organizationList",
    name: "Organization Management",
    icon: <FaBuilding />,
  },
  {
    path: "/organizationCreate",
    name: "Organization Create",
    icon: <FaBuilding />,
  },
  {
    path: "/feedbackList",
    name: "Feedback Management",
    icon: <FaComment />,
  },
];
  export default menuItem