// Navbar Component

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import "../Styles/Navbar.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { NavDropdown } from "react-bootstrap";

function Navbar() {
  const [nav, setNav] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

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
          <img
            src={process.env.PUBLIC_URL + "/images/logo/logoM.png"}
            alt="logo"
            style={{
              marginTop: "10px",
            }}
            height={"50px"}
            width={"80px"}
          />
        </Link>
      </h1>
      {/* Desktop */}
      <ul className="navbar-items mt-3">
        <li>
          <Link to="/" className="navbar-links">
            Home
          </Link>
        </li>
        <li>
          <a href="/#info" className="navbar-links">
            Informations
          </a>
        </li>
        <li>
          <a href="/#about" className="navbar-links">
            About Us
          </a>
        </li>
        <li>
          <a href="/projects" className="navbar-links">
            Projects
          </a>
        </li>
        <li>
          <div className="dropdown" onClick={toggleDropdown}>
            <p className="navbar-links">Organization</p>
            {dropdownOpen && (
              <ul className="dropdown-content">
                <li>
                  <a href="/organizationFront">Create Organization</a>
                </li>
                <li>
                  <a href="/organization/show">Show Organization</a>
                </li>
              </ul>
            )}
          </div>
        </li>
        <li>
          <a href="/post" className="navbar-links">
            Post
          </a>
        </li>
        <li>
          <a href="/login" className="navbar-links">
            Login
          </a>
        </li>
      </ul>

      <button
        className="navbar-btn"
        type="button"
        disabled={isButtonDisabled}
        onClick={handleChatBtnClick}
      >
        <FontAwesomeIcon icon={faCommentDots} /> Live Chat
      </button>

      {/* Mobile */}
      <div className={`mobile-navbar ${nav ? "open-nav" : ""} pt-4`}>
        <div onClick={openNav} className="mobile-navbar-close">
          <FontAwesomeIcon icon={faXmark} className="hamb-icon" />
        </div>

        <ul className="mobile-navbar-links pt-5">
          <li>
            <a onClick={openNav} href="/">
              Home
            </a>
          </li>
          <li>
            <a onClick={openNav} href="/#info">
              Information
            </a>
          </li>
          <li>
            <a onClick={openNav} href="/#about">
              About Us
            </a>
          </li>
          <li>
          <a href="/projects" onClick={openNav}>
            Projects
          </a>
        </li>
          <li>
            <a href="/organizationFront">Create Organization</a>
          </li>
          <li>
            <a href="/organization/show">Show Organization</a>
          </li>
          <li>
            <a onClick={openNav} href="/post">
              Posts
            </a>
          </li>
          <li>
            <a onClick={openNav} href="/chats">
              chats
            </a>
          </li>
          <li>
            <a onClick={openNav} href="/login">
              Login
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
          href="/chats"
        />
      </div>
    </div>
  );
}

export default Navbar;
