import React from 'react';
import './Dropdown.css';

export default function Dropdown({ showProfileSelect, showNotifSelect, showLanguageSelect }) {
  return (
    <>
      <div className={showProfileSelect ? "dropdown show" : "dropdown hide"}>
        <p>👋 Hey, Super Admin</p>
        <a href="/profile">Profile Settings</a>
        <a href="/newsletter">Newsletter Settings</a>
        <a href="/login">Log Out</a>
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
