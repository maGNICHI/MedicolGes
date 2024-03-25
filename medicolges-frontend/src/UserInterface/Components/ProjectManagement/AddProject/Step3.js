import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

export default function Step3({ formData, onSubmit, onPrev }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    onSubmit();
  };

  const handleBack = () => {
    onPrev();
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* Step 3 content */}
      <Row>
        <Col>
          {/* Your step 3 UI */}
        </Col>
      </Row>
      {/* Navigation buttons */}
      <Row className="justify-content-center mt-4">
        <Col xs={6} md={4}>
          <Button type="button" className="border-0 w-100" onClick={handleBack}>
            Back
          </Button>
        </Col>
        <Col xs={6} md={4}>
          <Button type="submit" className="border-0 w-100">
            Create Project
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
