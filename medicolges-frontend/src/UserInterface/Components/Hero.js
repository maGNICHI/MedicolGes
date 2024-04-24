import React, { useEffect, useState } from "react";
import Doctor from "../Assets/doctor-picture.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";
import "../Styles/Hero.css";

function Hero() {
  const navigate = useNavigate();
  const [goUp, setGoUp] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBookAppointmentClick = () => {
    navigate("/appointment");
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
    <div className="section-container">
      <div className="hero-section ">
        <div className="text-section my-10">
          <h2 className="text-title">
            Empower Your Project, Uncover Vital Data, and Connect with Patients
          </h2>
          <p className="text-descritpion">
            Welcome to MediColGes – your all-in-one solution for medical data
            management and collaboration. Our platform empowers healthcare
            professionals, institutions, researchers, and patients with
            intuitive tools for streamlined workflows, enhanced patient care,
            and innovative healthcare solutions. Join us in revolutionizing the
            future of healthcare with MediColGes.
            If you are interested with our web application:
          </p>
          {/* <NavLink to="/signup">
          <button
            className="text-appointment-btn"
            type="button"
          >
            <i className="fa fa-sign-in" aria-hidden="true"></i> Create an account
          </button> */}
          {/* <div className="text-stats">
            <div className="text-stats-container">
              <p>145k+</p>
              <p>Receive Patients</p>
            </div>

            <div className="text-stats-container">
              <p>50+</p>
              <p>Expert Doctors</p>
            </div>

            <div className="text-stats-container">
              <p>10+</p>
              <p>Years of Experience</p>
            </div>
          </div> */}
          {/* </NavLink> */}
        </div>

        <div className="hero-image-section mt-5">
          <img className="hero-image1" src={Doctor} alt="Doctor" />
        </div>
      </div>

      <div
        onClick={scrollToTop}
        className={`scroll-up ${goUp ? "show-scroll" : ""}`}
      >
        <FontAwesomeIcon icon={faAngleUp} />
      </div>
    </div>
  );
}

export default Hero;
