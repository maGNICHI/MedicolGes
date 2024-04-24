import React, { useState, useEffect, useRef } from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { BsCheckCircleFill } from "react-icons/bs";
import "../../Dashboard/Dashboard.css";
import axios from "axios";
import Layout from "../../SuperAdminLayout/Layout";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import '../../../UserInterface/Components/ProjectManagement/ListProject';
import Title from "../../../components/Title/Title";

export default function AddProject() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  });
  const stepRef = useRef([]);

  useEffect(() => {
    setMargins({
      marginLeft: stepRef.current[0]?.offsetWidth / 2,
      marginRight: stepRef.current[stepRef.current.length - 1]?.offsetWidth / 2,
    });
  }, [stepRef]);

  const stepsConfig = [
    { name: "Step 1", Component: Step1 },
    { name: "Step 2", Component: Step2 },
    { name: "Step 3", Component: Step3 }
  ];

  const handleNext = () => {
    setCurrentStep((prevStep) => {
      if (prevStep === stepsConfig.length) {
        setIsComplete(true);
        return prevStep;
      } else {
        return prevStep + 1;
      }
    });
  };

  const calculateProgressBarWidth = () => {
    return ((currentStep - 1) / (stepsConfig.length - 1)) * 100;
  };

  const ActiveComponent = stepsConfig[currentStep - 1]?.Component;

  // Define formDataProject state and setformDataProject function
  const [formDataProject, setformDataProject] = useState({});
  const [projectId, setprojectId] = useState("");
  const [selectedName, setSelectedName] = useState("Add New Project");

  // Define onNext function to handle moving to the next step
  const onNext = () => {
    handleNext(); // Call handleNext to move to the next step
  };

  return (
    <Layout selectedName={selectedName}>
      <div className="contentUser">
        <div className="container-fluid mb-5">
          <div className="row mb-10">
          <Title
              title={"Create New Project"}
              fontWeight={600}
              fontSize={"24px"}
            />
          </div>
          <div className=" row pb-24 px-10">
            <Row className="card shadow pt-3 raduis ms-1 justify-content-center mb-4">
              <Col xs={10 } >
                <div className="d-flex justify-content-center stepper">
                  {stepsConfig.map((step, index) => (
                    <div
                      key={step.name}
                      ref={(el) => (stepRef.current[index] = el)}
                      className={`step ${
                        currentStep > index + 1 || isComplete ? "complete" : ""
                      } ${currentStep === index + 1 ? "activated" : ""} `}
                      style={{ margin: "0 20px" }} // Add margin between circles
                    >
                      {currentStep > index + 1 || isComplete ? (
                        <BsCheckCircleFill className="step-number" size={40} /> // Increase size of circle
                      ) : (
                        <div style={{ height:"50px", width: "50px" }} className="step-number">{index + 1}</div>
                      )}
                      <div className="step-name">{step.name}</div>
                    </div>
                  ))}
                  <div className="progresses-bar"
                    style={{
                      width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
                      marginLeft: margins.marginLeft,
                      marginRight: margins.marginRight,
                    }}
                  >
                    <div className="progress"
                      style={{width: `${calculateProgressBarWidth()}%`, background:"#1990aa"}}
                    ></div>
                  </div>
                </div>
              </Col>
            </Row>
            {/* Render the active component with required props */}
            <ActiveComponent formDataProject={formDataProject} setformDataProject={setformDataProject} projectId={projectId} setprojectId={setprojectId} onNext={onNext} />
            {console.log("fooooooooooooorm data",formDataProject)}
          </div>
        </div>
      </div>
    </Layout>
  );
}
