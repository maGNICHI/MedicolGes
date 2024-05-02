// Sidebar.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./sidebar.css";
import {
  RiRssLine as RssFeed,
  RiChatSmile3Line as Chat,
  RiPlayCircleFill as PlayCircleFilledOutlined,
  RiGroupLine as Group,
  RiBookmarkLine as Bookmark,
  RiInformationLine as HelpOutline,
  RiBriefcaseLine as WorkOutline,
  RiCalendarEventLine as Event,
  RiSchoolLine as School,
} from "react-icons/ri";

export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <div className="sidebar1">
      <div className="sidebar1Wrapper">
        <ul className="sidebar1List">
          <li className="sidebar1ListItem">
            <Link to="/feed" className="sidebar1Link"></Link>
            <span className="sidebar1ListItemText">
              <div className="d-flex justify-content-center mb-4">
                <div
                  className="rounded-circle ms-5 overflow-hidden"
                  style={{
                    width: "100px",
                    height: "100px",
                    border: "1px solid #ced4da",
                    cursor: "pointer",
                    position: "relative",
                  }}
                >
                  <img
                    src={user.pic}
                    alt={user.username}
                    style={{
                      width: "100%", // Changer la largeur en pourcentage
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                </div>
              </div>
            </span>
          </li>
          <li className="sidebar1ListItem">
            <span className="sidebar1ListItemText">
              <span class="username">Username: </span> {user.username}
            </span>
          </li>
          <li className="sidebar1ListItem">
            <span className="sidebar1ListItemText">
              <span class="username">First Name: </span>
              {user.firstName}{" "}
            </span>
          </li>
          <li className="sidebar1ListItem">
            <span className="sidebar1ListItemText">
              <span class="username">Last Name:</span> {user.lastName}{" "}
            </span>
          </li>
          <li className="sidebar1ListItem">
            <span className="sidebar1ListItemText">
              <span class="username">Email: </span>
              {user.email}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
