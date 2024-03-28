import React from 'react';
import './HeaderDash.css';
import { FaBell, FaGlobeAmericas, FaSearch } from 'react-icons/fa';
import Title from '../Title/Title';

import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { Link, Navigate , useNavigate} from "react-router-dom";
import { useLogout } from '../../userScreens/useLogout'
export default function HeaderDash({ toggleProfileSelect, toggleNotifSelect, toggleLanguageSelect,  selectedName}) {
  
  const { logout } = useLogout()
  const navigate = useNavigate();
  
    const handleClick = () => {
      navigate("/login");
      logout()}
      const handleClickk = () => {
        navigate("/profile");
          }
  return (
    <nav className="topbar">
      <div className="menu-icon">
        <i className='bx bx-menu'></i>
      </div>
      <Title title={selectedName} fontSize={"16px"} fontWeight={600} />
      <form action="#" className="search-form">
        <div className="form-input">
          <input type="search" placeholder="Search..." />
          <button type="submit" className="search-btn"><FaSearch /></button>
        </div>
      </form>
      <div className="icon-link mx-3" onClick={toggleLanguageSelect}>
        <FaGlobeAmericas size={24} />
      </div>
      <div className="icon-link mr-2" onClick={toggleNotifSelect}>
        <FaBell size={24} />
        <span className="num">0</span>
      </div>
      <div className="profile" onClick={toggleProfileSelect}>
        <img src={process.env.PUBLIC_URL + "/images/avatar/useravatar.jpg"} alt="Profile" />
      </div>
<button   onClick={handleClickk}  >
          Profile
             </button>
      <a   onClick={handleClick} className="navbar-links">
          
          <FaSignOutAlt />logout  </a>
    </nav>
  );
  }