import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import menuItem from "./MenuItem";
import '../Dashboard.css'

const Footer = () => {
  const currentDate = new Date().getFullYear(); // Get the current year

  return (
    <footer className="footer" style={{ textAlign: "center", bottom: 0}}>
      Credits to DevUp © {currentDate}
    </footer>
  );
};

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <div style={{width: isOpen ? "270px" : "50px", display: "flex", flexDirection: "column", justifyContent: "space-between" }} className="sidebar">
        <div>
          <div className="top_section">
            <img
              src={process.env.PUBLIC_URL + "/images/logo/logo.png"}
              alt="logo"
              style={{
                display: isOpen ? "block" : "none",
                marginLeft: "25px",
                marginBottom: "10px", // Add space between logo and line
              }}
              height={"120px"}
              width={"160px"}
            />
            <div style={{ marginLeft: isOpen ? "30px" : "0px" }} className="bars">
              <FaBars color="#0236be" onClick={toggle} />
            </div>
          </div>
          <div
            className="mx-4"
            style={{
              borderBottom: isOpen ? `1px solid #80808073` : "none",
              width: "210px",
              marginTop: "-28px",
            }}
          />
          {!isOpen && <hr />}
          <div className="mt-3">
            {menuItem.map((item, index) => (
              <NavLink
                to={item.path}
                key={index}
                className={`link ${
                  window.location.pathname === item.path ? "active" : ""
                }`}
              >
                <div className="icon mt-2">{item.icon}</div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text"
                >
                  {item.name}
                </div>
              </NavLink>
            ))}
          </div>
        </div>
        <Footer />
      </div>
      
      <main>{children}</main>
    </>
  );
};

export default Sidebar;
