import React from 'react';
import './Dropdown.css';
import {   Navigate , useNavigate} from "react-router-dom";
 
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useLogout } from '../../userScreens/useLogout'
import { useAuthContext } from "../../userScreens/useAuthContext";
export default function Dropdown({ showProfileSelect, showNotifSelect, showLanguageSelect }) {

  const { logout } = useLogout()
  const navigate = useNavigate();
    const handleClick = () => {
      navigate("/login");
      logout()}

  return (
    <>
      <div className={showProfileSelect ? "dropdown show" : "dropdown hide"}>
        <p>👋 Hey, Super Admin</p>
        <a href="/AdminProfile">Profile </a> 
        {/* <a href="/newsletter">Newsletter Settings</a> */}
        <a  onClick={handleClick}  > <FaSignOutAlt size="13px" />logout  </a>
      </div>
      <div className={showNotifSelect ? "dropdown show" : "dropdown hide"}>
        <hr />
      </div>
      <div className={showLanguageSelect ? "dropdown show" : "dropdown hide"}>
        <a href="">English</a>
        <a href="">French</a>
      </div>
    </>
  );
}
