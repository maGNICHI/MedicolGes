import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import Layout from "../../../Dashboard/SuperAdminLayout/Layout";
import "../../Dashboard/Dashboard.css";
import { useNavigate } from "react-router-dom";
import {} from "@material-ui/core/";
import { Grid, CircularProgress } from "@material-ui/core";
import { fetchForm } from "./api";
import FormCard from "./FormCard";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { IconButton, TableHead } from "@mui/material";
import { FaEye, FaTrash } from "react-icons/fa";
import { faRandom } from "@fortawesome/free-solid-svg-icons";
function AfficheForm({ setCurrentId }) {
  const [forms, setForms] = useState([]);
  const [laoding, setlaoding] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setlaoding(true);
    fetchForm().then((res) => {
      console.log(res);
      setForms(res.data);
      setlaoding(false);
    });
  }, []);
  const displayForm = (form)=> {
    console.log(form);
    navigate("/ajouterForm", { state: {  case : 'update' , formData : {name : form.name , questions : JSON.parse(form.questions)} } });
  }
//   const deleteForm = (form)=> {
//     console.log(form);
//     navigate("/afficheForm", { state: {  case : 'update' , formData : {name : form.name , questions : JSON.parse(form.questions)} } });
//   }
  
  return (
    <Layout selectedName={"title"}>
      <Container fluid className="mt-4 h-screen">
        {laoding ? (
          <CircularProgress />
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nom </TableCell>
                <TableCell>Actions </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {forms.map((form, index) => (
                <TableRow key={index}>
                  <TableCell>{form.name}</TableCell>
                  <TableCell>
                    <FaEye
                      onClick={() => {
                        displayForm(form);
                      }}
                      style={{ fontSize: "23px", cursor: "pointer" }}
                    />
                     {/* <FaTrash
                      onClick={() => {
                        deleteForm(form);
                      }}
                      style={{ fontSize: "23px", cursor: "pointer" }}
                    /> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Container>
    </Layout>
  );
}

export default AfficheForm;
