// Navbar Component

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faBars,
  faXmark,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import "../Styles/Navbar.css";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { NavDropdown } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useLogout } from '../../userScreens/useLogout'
import { useAuthContext } from "../../userScreens/useAuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
function Navbar() {
  const [nav, setNav] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const sortedNotifications = [...notifications].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        setUser(userInfo);
        setIsLoggedIn(!!userInfo);
        if (!userInfo) return;
        const response = await axios.get(`http://localhost:5000/api/notification/byowner/${userInfo._id}`);
        console.log(response);
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  console.log(notifications);
  const handleNotificationClick = async (notificationId) => {
    try {
      // Make a PUT request to mark the notification as opened
      await axios.put(`/api/notifications/markAsOpened/${notificationId}`);

      // Update the state to reflect the change in isOpened
      const updatedNotifications = notifications.map((notification) =>
        notification._id === notificationId
          ? { ...notification, isOpened: true }
          : notification
      );
      setNotifications(updatedNotifications);
    } catch (error) {
      console.error("Error marking notification as opened:", error);
    }
  };


  const handleDeleteAllNotifications = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      await axios.delete(`/api/notifications/deleteAll/${userInfo._id}`);
      setNotifications([]);
    } catch (error) {
      console.error("Error deleting notifications:", error);
    }
  };

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useLogout()
  const handleClick = () => {
    navigate("/login");
    setIsLoggedIn(false);
    logout()
  }
  const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

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
          <Link
            to="/"
            className="navbar-links"
            onClick={() => handleScrollToSection("hero")}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/"
            className="navbar-links"
            onClick={() => handleScrollToSection("info")}
          >
            Informations
          </Link>
        </li>
        <li>
          <Link
            to="/"
            className="navbar-links"
            onClick={() => handleScrollToSection("about")}
          >
            About Us
          </Link>
        </li>
        <li>
          <Link to="/projects" className="navbar-links">
            Projects
          </Link>
        </li>
        <li>
          <div className="dropdown" onClick={toggleDropdown}>
            <p className="navbar-links cursor-pointer">Organization</p>
            {dropdownOpen && (
              <ul className="dropdown-content">
                {user.role !== "Patient" && (<li>
                  <Link to="/organizationFront">Create Organization</Link>
                </li>)}
                <li>
                  <Link to="/organizationShow">Show Organization</Link>
                </li>
              </ul>
            )}
          </div>
        </li>
        <li>
          <Link to="/disease" className="navbar-links">
            Disease
          </Link>
        </li>
        {isLoggedIn ? (
          <>
            <li>
              <Link to="/homeNew" className="navbar-links">
                Post
              </Link>
            </li>
            <li>
              <Link to="/Profile" className="navbar-links">
                Profile
              </Link>
            </li>
            <li className="dropdown" onClick={() => setDropdownOpen(!dropdownOpen)}>
              <div className="navbar-links cursor-pointer icon-link mr-2">
                <FontAwesomeIcon icon={faBell} size={24} />
                <span className="num">{notifications.filter(notification => !notification.isOpened).length}</span>
              </div>
              {dropdownOpen && (
                <ul className="dropdown-content" style={{ maxHeight: "500px", width: "300px", overflowY: "auto" }}>
                  {sortedNotifications.map(notification => (
                    <li key={notification._id} style={{ fontWeight: notification.isOpened ? "normal" : "bold", backgroundColor: notification.isOpened ? "transparent" : "#e0e0e0" }}>
                      <div onClick={() => handleNotificationClick(notification._id)}>
                        {notification.action}
                      </div>
                    </li>
                  ))}
                  <li>
                    <button onClick={handleDeleteAllNotifications}>Delete All</button>
                  </li>
                </ul>

              )}
            </li>
            <li>
              <Link onClick={handleClick} to="/login" className="navbar-links">
                Logout
              </Link>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login" className="navbar-links">
              Login
            </Link>
          </li>
        )}
        {/* <li>
          <Link to="/login" className="navbar-links">
            Login
          </Link>
        </li> */}
      </ul>

      <button
        className="navbar-btn"
        type="button"

      >
        <a href="/chats" className="navbar-links">


          <FontAwesomeIcon icon={faCommentDots} /> Live Chat</a>
      </button>

      {/* Mobile */}
      <div className={`mobile-navbar ${nav ? "open-nav" : ""} pt-4`}>
        <div onClick={openNav} className="mobile-navbar-close">
          <FontAwesomeIcon icon={faXmark} className="hamb-icon" />
        </div>

        <ul className="mobile-navbar-links pt-5">
          <li>
            <Link
              onClick={() => {
                openNav();
                handleScrollToSection("hero");
              }}
              to="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              onClick={() => {
                openNav();
                handleScrollToSection("info");
              }}
              to="/"
            >
              Information
            </Link>
          </li>
          <li>
            <Link
              onClick={() => {
                openNav();
                handleScrollToSection("about");
              }}
              to="/"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link to="/projects" onClick={openNav}>
              Projects
            </Link>
          </li>
          <li>
            <Link href="/organizationFront">Create Organization</Link>
          </li>
          <li>
            <Link href="/organizationShow">Show Organization</Link>
          </li>
          <li>
            <Link to="/disease">
              Disease
            </Link>
          </li>
          <li>
            <a onClick={openNav} href="/chats">
              chats
            </a>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <Link onClick={openNav} to="/homeNew">
                  Posts
                </Link>
              </li>
              <li>
                <Link onClick={openNav} to="/Profile" >
                  Profile
                </Link>
              </li>
              <li>
                <Link onClick={handleClick} to="/login">
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link onClick={openNav} to="/login">
                Login
              </Link>
            </li>
          )}
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
    </div >
  );
}

export default Navbar;
