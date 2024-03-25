import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { BsCheckCircleFill, BsCircle } from "react-icons/bs";
import Navbar from "../../Navbar";
import Footer from "../../Footer";
import Step1 from "./Step1";
// import Step2 from "./Step2";
import Step3 from "./Step3";

export default function AddProject() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    organization: "",
    file: null,
    formId: null,
  });

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log(formData);
  };

  return (
    <div className="home-section">
      <Navbar />
      <div className="contentUser">
        <div className="container-fluid mt20 mb-5">
          <div className="row pl-10 mb-10">
            <h3 className="info-title pt-20">
              <span>Create New Project</span>
            </h3>
          </div>
          <div className="row pb-24 px-10">
            <Row className="justify-content-center mb-4">
              <Col xs={10}>
                <div className="d-flex justify-content-center">
                  <ul id="progressbar">
                    <li className={`step ${step === 1 && "active"}`}>
                      {step > 1 ? (
                        <BsCheckCircleFill size={24} />
                      ) : (
                        <BsCircle size={24} />
                      )}
                      <strong>Step 1</strong>
                    </li>
                    <li className={`step ${step === 2 && "active"}`}>
                      {step > 2 ? (
                        <BsCheckCircleFill size={24} />
                      ) : (
                        <BsCircle size={24} />
                      )}
                      <strong>Step 2</strong>
                    </li>
                    <li className={`step ${step === 3 && "active"}`}>
                      {step > 3 ? (
                        <BsCheckCircleFill size={24} />
                      ) : (
                        <BsCircle size={24} />
                      )}
                      <strong>Step 3</strong>
                    </li>
                  </ul>
                  <div>
                    <div></div>
                  </div>
                </div>
              </Col>
            </Row>
            {step === 1 && (
              <Step1
                formData={formData}
                setFormData={setFormData}
                onNext={handleNext}
              />
            )}
            {/* {step === 2 && (
          <Step2 formData={formData} setFormData={setFormData} onNext={handleNext} onPrev={handlePrev} />
        )}*/}
            {step === 3 && (
              <Step3
                formData={formData}
                onSubmit={handleSubmit}
                onPrev={handlePrev}
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
