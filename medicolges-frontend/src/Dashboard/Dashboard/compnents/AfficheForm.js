import React, { useEffect, useState } from "react";
import {  Card,Container , Modal, Button} from "react-bootstrap";

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
import { FaEye, FaTrash ,FaEdit,FaLink} from "react-icons/fa";
import { faRandom } from "@fortawesome/free-solid-svg-icons";
import { Title } from "@material-ui/icons";
import { fetchFormById } from "../compnents/api/index";

function AfficheForm({ setCurrentId }) {
  const [forms, setForms] = useState([]);
  const [laoding, setlaoding] = useState(false);
  const navigate = useNavigate();
  //link
  const [link, setLink] = useState("");
const [copied, setCopied] = useState(false);
const [modalShow, setModalShow] = useState(false);

  // const baseUrl = process.env.REACT_APP_BASE_URL;

// Utilisez baseUrl pour construire votre lien
const [loading, setLoading] = useState(false);

const openFormInBrowser = async (formId) => {
  try {
    setLoading(true);
    const formData = await fetchFormById(formId);
    const link = `http://localhost:3000/afficheId/${formId}`;
    setLink(link);
    // setLink(JSON.stringify(formData)); // Vous pouvez formater les données du formulaire comme vous le souhaitez pour les afficher dans le lien
    setModalShow(true);
  } catch (error) {
    console.error("Erreur lors de la récupération du formulaire:", error);
  } finally {
    setLoading(false);
  }
};


  ///
  const handleClose = () => {
    setModalShow(false);
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
  };
  //  const putForm = async (id, updateForm) => {
  //   try {
  //     const response = await axios.put(`/EditForm/${id}`, updateForm);
  //     return response.data;
  //   } catch (error) {
  //     throw error;
  //   }
  // };
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
  <Container fluid className="mt-4" style={{ height: "100vh", backgroundColor: "#a3bee3" }}> {/* Ajouter le style de fond ici */}
      <Card className="card h-100" style={{ overflowY: "auto", backgroundColor: "#ffffffa9", padding: "20px", borderRadius: "20px" }}>
        <Title title={"Create Form"} fontWeight={600} fontSize={"24px"} />
        <hr />
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
                  <div style={{ display: "flex", alignItems: "center" }}>

                    <FaEye
                      onClick={() => {
                        displayForm(form);
                      }}
                      style={{ fontSize: "23px", cursor: "pointer" , marginRight: "10px"}}
                    />
                    <FaEdit // Icône pour la mise à jour (remplacez 'FaEdit' par l'icône appropriée)
      onClick={() => {
        displayForm(form);
      }}
      style={{ fontSize: "23px", cursor: "pointer" }}
    />
     <FaLink
                          onClick={() => {
                            openFormInBrowser(form._id);
                          }}
                          style={{ fontSize: "23px", cursor: "pointer" }}
                        />
                     {/* <FaTrash
                      onClick={() => {
                        deleteForm(form);
                      }}
                      style={{ fontSize: "23px", cursor: "pointer" }}
                    /> */}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        </Card>
      </Container>
 {/* Modal */}
 <Modal show={modalShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Lien du formulaire</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{link}</p>
          <Button onClick={handleCopy} disabled={copied}>
            {copied ? "Copié !" : "Copier le lien"}
          </Button>
        </Modal.Body>
      </Modal>
    </Layout>
  );
}

export default AfficheForm;
