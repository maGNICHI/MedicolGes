import React, { useState } from "react";
import HeaderDash from "../../components/HeaderDash/HeaderDash";
import Dropdown from "../../components/HeaderDash/Dropdown";
import Sidebar from "../SideBar/SideBar";
import '../Dashboard.css'

const Layout = ({ children, selectedName }) => {
    const [showProfileSelect, setShowProfileSelect] = useState(false);
  const [showNotifSelect, setShowNotifSelect] = useState(false);
  const [showLanguageSelect, setShowLanguageSelect] = useState(false);
    
  const toggleProfileSelect = () => {
    setShowProfileSelect(!showProfileSelect);
    setShowLanguageSelect(false);
    setShowNotifSelect(false);
  };

  const toggleNotifSelect = () => {
    setShowNotifSelect(!showNotifSelect);
    setShowProfileSelect(false);
    setShowLanguageSelect(false);
  };

  const toggleLanguageSelect = () => {
    setShowLanguageSelect(!showLanguageSelect);
    setShowProfileSelect(false);
    setShowNotifSelect(false);
  };
  return (
    <div style={{ display: 'flex', background:"#a3bee3"}}>
      <Sidebar />
      <main style={{ flex: 1, marginLeft:"30px" }}>
        <HeaderDash selectedName={selectedName} toggleProfileSelect={toggleProfileSelect}
          toggleNotifSelect={toggleNotifSelect}
          toggleLanguageSelect={toggleLanguageSelect} />
        <Dropdown
        showProfileSelect={showProfileSelect}
        showNotifSelect={showNotifSelect}
        showLanguageSelect={showLanguageSelect}
      />
        {children}
      </main> 
    </div>
  );
}

export default Layout;
