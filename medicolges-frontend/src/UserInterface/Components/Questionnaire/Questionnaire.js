import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import IconButton from "../../../components/Button/IconButton";
import { FaEdit } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchForm } from "../../../Dashboard/Dashboard/compnents/api";
import ResponseList from "./ResponseList";

export default function Questionnaire({ formId }) {
  const [form, setForm] = useState({});
  const [nbrResponse, setNbrResponse] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  console.log("🚀 ~ Questionnaire ~ location:", formId)

  const displayForm = (form) => {
    console.log(form);
    if (form && form.questions) {
      navigate("/updateForm", {
        state: {
          case: "update",
          formData: {
            _id: form._id,
            name: form.name,
            questions: JSON.parse(form.questions),
          },
        },
      });
    } else {
      console.error("Form or form questions are undefined.");
    }
  };
  
  console.log("🚀 ~ Questionnaire ~ location:", location)
  useEffect(() => {
    fetchForm()
      .then((res) => {
        console.log("API Response:", res.data); // Log the API response
        const forms = res.data;
        const projectForm = forms.find((f) => f._id === formId);
        if (projectForm && projectForm.questions) {
          setForm(projectForm);
        } else {
          console.error("Form or form questions are undefined.");
        }
      })
      .catch((error) => {
        console.error("Error fetching forms:", error);
      });
  }, [formId]);
  

  return (
    <Container className="my-3 ">
      <Row>
        <Col md={9} xs={12} className="mb-2 pt-2">
          <h4>If you want to update the questionnaire</h4>
        </Col>
        <Col md={3} xs={12}> 
          { location.pathname.search("consultProject") !=1  && <IconButton
            className="border-0 w-100 me-3"
            style={{
              background: "linear-gradient(-45deg, #1990aa 0%, #8ac2bb 100%)",
              color: "white",
              fontSize: "16px",
              fontWeight: 600,
              padding: "8px 16px",
              borderRadius: "20px",
            }}
            startIcon={<FaEdit />}
            onClick={() => {
              displayForm(form);
            }}
          >
            Update Form
          </IconButton>}
        </Col>
      </Row>
      <hr />
      <Row>
        <h4 className="mb-2">
          There are {nbrResponse} responses to the questionnaire of this project
        </h4>
      </Row>
      <Row>
        <ResponseList formId={formId} setNbrResponse={setNbrResponse} />
      </Row>
    </Container>
  );
}
