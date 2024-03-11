import React from "react";
import InformationCard from "./InformationCard";
import {
  faDatabase,
  faComment,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import "../Styles/Info.css";

function Info() {
  return (
    <div className="info-section -mt-16" id="info">
      <div className="info-title-content ">
        <h3 className="info-title pt-24">
          <span>What We Do</span>
        </h3>
        <p className="info-description">
          At MediColGes, we specialize in providing a cutting-edge platform
          tailored to the unique needs of the healthcare industry. Our platform
          facilitates seamless collaboration, efficient data collection, and
          secure communication among healthcare professionals, institutions, and
          researchers. From project creation to data management and analysis, we
          offer intuitive tools and resources designed to streamline workflows
          and enhance patient care. With a focus on innovation and
          accessibility, we empower our users to drive advancements in medical
          research, improve healthcare delivery, and ultimately, enhance patient
          outcomes. Join us in transforming the landscape of healthcare with
          MediColGes.
        </p>
      </div>

      <div className="info-cards-content">
        <InformationCard
          title="Data Management Solutions"
          description="We provide comprehensive data 
          management solutions tailored to the needs 
          of healthcare professionals and institutions. 
          From organizing patient records to securely storing 
          and sharing medical data, our platform streamlines 
          data management processes, ensuring efficiency, accuracy, 
          and compliance with regulatory standards."
          icon={faDatabase}
        />

        <InformationCard
          title="Collaborative Project Creation"
          description="With our collaborative project creation feature, 
          users can easily initiate and manage medical research projects, 
          clinical trials, and collaborative initiatives. Our platform 
          facilitates seamless communication and coordination among healthcare 
          professionals, researchers, and institutions, fostering collaboration 
          and driving innovation in healthcare."
          icon={faComment}
        />

        <InformationCard
          title="Patient Engagement Tools"
          description="Our patient engagement tools empower healthcare providers 
          to enhance patient care and communication. From interactive forms for 
          collecting patient data to secure messaging features for facilitating 
          doctor-patient communication, we enable healthcare professionals to 
          engage with patients effectively, promote shared decision-making, and 
          improve overall patient outcomes."
          icon={faUser}
        />
      </div>
    </div>
  );
}

export default Info;
