import React from "react";
import Doctor from "../Assets/doctor-group.png";
import SolutionStep from "./SolutionStep";
import "../Styles/About.css";
import { Link, NavLink } from "react-router-dom";

function About() {
  return (
    <div className="about-section" id="about">
      <div className="about-image-content">
        <img src={Doctor} alt="Doctor Group" className="about-image1" />
      </div>

      <div className="about-text-content my-20">
        <h3 className="about-title">
          <span>About Us</span>
        </h3>
        <p className="about-description">
          Welcome to MediColGes, We pride ourselves on offering a tailored
          solution designed to meet the specific needs of healthcare
          professionals and researchers in Algeria. Through our partnership with
          MISC Laboratory and ESPIRIT University, we've combined cutting-edge
          technology with expert insights to create a platform that streamlines
          medical data management, facilitates collaborative research projects,
          and enhances healthcare delivery in Algeria. With a focus on
          innovation and collaboration, we are committed to driving advancements
          in medical research, improving patient care, and ultimately,
          contributing to the overall well-being of individuals in Algeria and
          beyond. Join us on this journey as we revolutionize healthcare with
          technology and expertise.
        </p>
        <div className="flex justify-items-center justify-content-center gap-20">
          <Link to="https://www.misc-lab.org/fr/">
            <img
              src={process.env.PUBLIC_URL + "/images/logo/misc.png"}
              alt="logo"
              style={{
                marginTop: "10px",
              }}
              height={"160px"}
              width={"180px"}
            />
          </Link>
          <Link to="https://esprit.tn/">
            <img
              src={process.env.PUBLIC_URL + "/images/logo/esprit.png"}
              alt="logo"
              style={{
                marginTop: "10px",
              }}
              height={"160px"}
              width={"180px"}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
