import React, { useEffect, useState } from "react";
import { Card, Container, Modal, Button } from "react-bootstrap";

import Layout from "../../../Dashboard/SuperAdminLayout/Layout";
import "../../Dashboard/Dashboard.css";
import { useNavigate } from "react-router-dom";
import { Grid, CircularProgress } from '@chakra-ui/react'

import { fetchForm ,deleteForm} from "./api";
 
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import { FaEye, FaTrash, FaEdit, FaLink } from "react-icons/fa";
import { faRandom } from "@fortawesome/free-solid-svg-icons";
import { Heading } from "@chakra-ui/react";
import { fetchFormById } from "../compnents/api/index";

function AfficheForm({ setCurrentId }) {
  const [forms, setForms] = useState([]);
  const [laoding, setlaoding] = useState(false);
  const navigate = useNavigate();
  const [link, setLink] = useState("");
 
  const [copied, setCopied] = useState(false);
  const [modalShow, setModalShow] = useState(false);
//ajouter
const [selectedFormId, setSelectedFormId] = useState(null); // État pour stocker le formulaire sélectionné pour la mise à jour

  // const baseUrl = process.env.REACT_APP_BASE_URL;

  // Utilisez baseUrl pour construire votre lien
  const [loading, setLoading] = useState(false);
  ///delete
  
  const handleDeleteForm = (id) => {
    deleteForm(id)
      .then(response => {
        console.log(response.data); // Afficher le message de suppression
        // Mettre à jour l'état local en supprimant le formulaire avec l'ID donné
        setForms(forms.filter(form => form._id !== id));
      })
      .catch(error => {
        console.error(error);
        // Gérer les erreurs si nécessaire
      });
  };

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
      //console.log(res);
      setForms(res.data);
      setlaoding(false);
    });
  }, []);

  // console.log(forms.map((item)=>item._id))
  // const ids=forms.map((item)=>item._id)
  const displayForm = (form) => {
    console.log(form)
    navigate("/ajouterForm", {
      state: {
        case: "update",
        formData: {_id:form._id, name: form.name, questions: JSON.parse(form.questions) },
      },
    });
  };
  //   const deleteForm = (form)=> {
  //     console.log(form);
  //     navigate("/afficheForm", { state: {  case : 'update' , formData : {name : form.name , questions : JSON.parse(form.questions)} } });
  //   }
  const save = (form) => {
    navigate("/ajouterForm", {
      state: {
        case: "create",
        formData: {_id:form._id, name: form.name, questions: JSON.parse(form.questions) },
      },
    }); // Redirige vers la page ajouterForm
  };
  return (
    <Layout selectedName={"title"}>
      <Container
        fluid
        className="mt-4"
        style={{ height: "100vh", backgroundColor: "#a3bee3" }}
      >
        {" "}
        {/* Ajouter le style de fond ici */}
        <Card
          className="card h-100"
          style={{
            overflowY: "auto",
            backgroundColor: "#ffffffa9",
            padding: "20px",
            borderRadius: "20px",
          }}
        >
        <Heading fontWeight={600} fontSize="24px">Create Form</Heading>
          <hr />
          {laoding ? (
            <CircularProgress value={30} size='120px'  />
          ) : (
            <Table>
              <Thead>
                <Tr>
                  <Th>Nom </Th>
                  <Th>Actions </Th>
                </Tr>
              </Thead>
              <Tbody>
                {forms.map((form, index) => (
                  <Tr key={index}>
                    <Td>{form.name}</Td>
                    <Td>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <FaEdit
                          onClick={() => {
                            displayForm(form);
                          }}
                          style={{
                            fontSize: "23px",
                            cursor: "pointer",
                            marginRight: "10px",
                          }}
                        />
                        < FaEye // Icône pour la mise à jour (remplacez 'FaEdit' par l'icône appropriée)
                          onClick={() => {
                            save(form);
                          }}
                          style={{ fontSize: "23px", cursor: "pointer" }}
                        />
                        <FaLink
                          onClick={() => {
                            openFormInBrowser(form._id);
                          }}
                          style={{ fontSize: "23px", cursor: "pointer" }}
                        />
                         <div>
      {/* Boucle sur vos formulaires et affichez les icônes de corbeille */}
      
        <div key={form._id}>
          {/* Afficher les détails du formulaire */}
          {/* Icône de la corbeille avec gestionnaire de clic */}
          <FaTrash
            onClick={() => handleDeleteForm(form._id)}
            style={{ fontSize: "23px", cursor: "pointer" }}
          />
        </div>
        
          </div>
                        {/* <FaTrash
                      onClick={() => {
                        deleteForm(form._id);
                      }}
                      style={{ fontSize: "23px", cursor: "pointer" }}
                    /> */}
                      </div>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
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
