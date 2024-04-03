// import React, { useState ,useEffect} from "react";
// import Layout from "../SuperAdminLayout/Layout";
// import { Card, Col, Container, Row } from "react-bootstrap";
// import Title from "../../components/Title/Title";
// import IconButton from "../../components/Button/IconButton";
// import { FaPlus } from "react-icons/fa";
// import CheckTable from "../../components/Table/UserTable";
// import "../Dashboard/Dashboard.css"
// import axios from 'axios';
// export default function UserList() {
//   const [selectedName, setSelectedName] = useState("User Management");
 
  

  
//   return (
//     <Layout selectedName={selectedName}>
//       <Container fluid className="mt-4 h-screen" style={{overflowY: "auto", maxHeight:"100%", zIndex:0}}>
//         <Card className="card">
//           <Card.Header
//             style={{ padding: "20px" }}
//           >
//             <Row className="align-items-center">
//               <Col xs={12} md={10}>
//                 <Title title={"Users List"} fontWeight={600} fontSize={"24px"} />
//               </Col>
//               <Col xs={12} md={2} className="text-md-end mt-3 mt-md-0">
//                 <IconButton
//                   className="h-100 border-0"
//                   style={{
//                     background: "#0ea9f991",
//                     color: "white",
//                     fontSize: "16px",
//                     fontWeight: 600,
//                     padding: "8px 16px",
//                     borderRadius: "20px",
//                   }}
                   
//                 >
//                    AddNewUser 
//                 </IconButton>
//               </Col>
//             </Row>
//           </Card.Header>
//           <Card.Body className="p-0">
//               <CheckTable />
//           </Card.Body>
//         </Card>
//       </Container>
//     </Layout>
//   );
// }
import React, { useState } from "react";
import Layout from "../SuperAdminLayout/Layout";
import { Card, Col, Container, Row } from "react-bootstrap";
import Title from "../../components/Title/Title";
import IconButton from "../../components/Button/IconButton";
// import { FaPlus } from "react-icons/fa"; // If you plan to use FaPlus icon, make sure to uncomment this
import CheckTable from "../../components/Table/UserTable";
import AddNewUserModal from "./AddNewUserModal"; // Adjust the import path as per your file structure
import "../Dashboard/Dashboard.css";
import axios from 'axios';
import { Snackbar, Alert } from '@mui/material';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
export default function UserList() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
const [snackbarMessage, setSnackbarMessage] = useState('');

  const [selectedName, setSelectedName] = useState("User Management");
  const [showAddNewUserModal, setShowAddNewUserModal] = useState(false);

  return (
    <Layout selectedName={selectedName}>
      <Container fluid className="mt-4 h-screen" style={{ overflowY: "auto", maxHeight: "100%", zIndex: 0 }}>
        <Card className="card">
          <Card.Header style={{ padding: "20px" }}>
            
            <Row className="align-items-center">
              <Col xs={12} md={10}>
                <Title title={"Users List"}   fontWeight={10} fontSize={"24px"} />
                <AddNewUserModal 
            show={showAddNewUserModal} 
            onHide={() => setShowAddNewUserModal(false)}
          />
              </Col>
              <Col xs={12} md={2} className="text-md-end mt-3 mt-md-0">
                {/* <IconButton
                  onClick={() => setShowAddNewUserModal(true)} // Trigger modal open
                  className="h-100 border-0"
                  style={{
                    background: "#0ea9f991",
                    color: "white",
                    fontSize: "16px",
                    fontWeight: 600,
                    padding: "8px 16px",
                    borderRadius: "20px",
                  }}
                >
                  Add New User
                </IconButton> */}
                





              </Col>
            </Row>
          </Card.Header>
          <Card.Body className="p-0">
            <CheckTable />
          </Card.Body>
        </Card>

       
        
          
        
      </Container>
    </Layout>
  );
}
