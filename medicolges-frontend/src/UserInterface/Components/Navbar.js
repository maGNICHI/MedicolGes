import React, { useState, useEffect  } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import "../Styles/Navbar.css";
import { Link, Navigate , useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useLogout } from '../../userScreens/useLogout'
import { useAuthContext } from "../../userScreens/useAuthContext";
function Navbar() {
  const [nav, setNav] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);


  
  
  // const {user}  = useAuthContext()
 
 
 


const { logout } = useLogout()
const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
    logout()}

  const openNav = () => {
    setNav(!nav);
  };

  const handleChatBtnClick = () => {
    if (!isButtonDisabled) {
      toast.info("Experiencing high traffic, Please wait a moment.", {
        position: toast.POSITION.TOP_CENTER,
        onOpen: () => setIsButtonDisabled(true),
        onClose: () => setIsButtonDisabled(false),
      });
    }
  };

  return (
    <div className="navbar-section">
      <h1 className="navbar-title">
        <Link to="/">
          MediColGes <span className="navbar-sign"></span>
        </Link>
      </h1>
      {/* Desktop */}
      <ul className="navbar-items">
        <li>
          <Link to="/" className="navbar-links">
            Home
          </Link>
        </li>
        
          <li>
            <Link to="/" className="navbar-links">
              Organisation
            </Link>
            <ul className="dropdown">
              <li>
                <Link to="/organizationFront">Create Organization</Link>
              </li>
              <li>
                <Link to="/organization/show">Show Organization</Link>
              </li>
            </ul>
          </li>
        <li>
          <a href="#about" className="navbar-links">
            Form
          </a>
        </li>
        <li>
          <a href="/post" className="navbar-links">
            Post
          </a>
        </li>

        <li>
          
        </li> 
        {/* <li>
          <a href="#doctors" className="navbar-links">
            Doctors
          </a>
        </li> */}
       
        
      </ul>

      
      <a href="/Profile" className="navbar-links">
          Profile
          </a>
      <a  onClick={handleClick} className="navbar-links">
          
          <FaSignOutAlt />logout  </a>
      <button
        className="navbar-btn"
        type="button"
        disabled={isButtonDisabled}
        onClick={handleChatBtnClick}
      >
        <FontAwesomeIcon icon={faCommentDots} /> Live Chat
      </button>

      {/* Mobile */}
      <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
        <div onClick={openNav} className="mobile-navbar-close">
          <FontAwesomeIcon icon={faXmark} className="hamb-icon" />
        </div>

        <ul className="mobile-navbar-links">
          <li>
            <Link onClick={openNav} to="/">
              Home
            </Link>
          </li>
          <li>
            <a onClick={openNav} href="#services">
              Services
            </a>
          </li>
          <li>
            <a onClick={openNav} href="#about">
              About
            </a>
          </li>
          <li>
            <a onClick={openNav} href="#reviews">
              Reviews
            </a>
          </li>
          <li>
            <a onClick={openNav} href="#doctors">
              Doctors
            </a>
          </li>
          <li>
            <a onClick={openNav} href="#contact">
              Contact
            </a>
          </li>
        </ul>
      </div>
      
      {/* Hamburger Icon */}
      <div className="mobile-nav">
        <FontAwesomeIcon
          icon={faBars}
          onClick={openNav}
          className="hamb-icon"
        />
      </div>
    </div>
  );
}

export default Navbar;
