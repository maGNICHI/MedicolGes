import React, { useEffect, useState } from "react";
import AddResponse from './AddResponse'
import { Col, Row } from "react-bootstrap";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import UpdateQuestionnaire from "./UpdateQuestionnaire";

export default function EditQuestionnaire() {
    const [goUp, setGoUp] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      };
      useEffect(() => {
        const onPageScroll = () => {
          if (window.scrollY > 600) {
            setGoUp(true);
          } else {
            setGoUp(false);
          }
        };
        window.addEventListener("scroll", onPageScroll);
    
        return () => {
          window.removeEventListener("scroll", onPageScroll);
        };
      }, []);
  return (
    <div className="home-section">
      <Navbar />
      <div className="contentUser">
        <div className="container-fluid mt20 mb-5">
          <div className="row pl-10 mb-10">
            <h3 className="info-title pt-20">
              <span>Update Form</span>
            </h3>
          </div>
          <div className="row pb-24 px-10">
            <Row className="justify-content-center">
                <Col md={9} xs={12}>
                    <UpdateQuestionnaire />
                </Col>
            </Row>
          </div>
        </div>
      </div>
      <div onClick={scrollToTop}
        className={`scroll-up ${goUp ? "show-scroll" : ""}`}
      >
        <FontAwesomeIcon icon={faAngleUp} />
      </div>
      <Footer />
    </div>
  );
}
