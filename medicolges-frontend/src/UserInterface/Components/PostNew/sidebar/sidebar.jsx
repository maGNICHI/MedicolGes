import React, { useState, useEffect } from "react";
import axios from "axios";
import "./sidebar.css";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@material-ui/icons";

export default function Sidebar() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="sidebar1">
      <div className="sidebar1Wrapper">
        <ul className="sidebar1List">
          <li className="sidebar1ListItem">
            <RssFeed className="sidebar1Icon" />
            <span className="sidebar1ListItemText">Feed</span>
          </li>
          <li className="sidebar1ListItem">
            <Chat className="sidebar1Icon" />
            <span className="sidebar1ListItemText">Chats</span>
          </li>
          <li className="sidebar1ListItem">
            <PlayCircleFilledOutlined className="sidebar1Icon" />
            <span className="sidebar1ListItemText">Videos</span>
          </li>
          <li className="sidebar1ListItem">
            <Group className="sidebar1Icon" />
            <span className="sidebar1ListItemText">Groups</span>
          </li>
          <li className="sidebar1ListItem">
            <Bookmark className="sidebar1Icon" />
            <span className="sidebar1ListItemText">Bookmarks</span>
          </li>
          <li className="sidebar1ListItem">
            <HelpOutline className="sidebar1Icon" />
            <span className="sidebar1ListItemText">Questions</span>
          </li>
          <li className="sidebar1ListItem">
            <WorkOutline className="sidebar1Icon" />
            <span className="sidebar1ListItemText">Jobs</span>
          </li>
          <li className="sidebar1ListItem">
            <Event className="sidebar1Icon" />
            <span className="sidebar1ListItemText">Events</span>
          </li>
          <li className="sidebar1ListItem">
            <School className="sidebar1Icon" />
            <span className="sidebar1ListItemText">Courses</span>
          </li>
        </ul>
        <button className="sidebar1Button">Show More</button>
        <hr className="sidebar1Hr" />
        {/* <ul className="sidebar1FriendList">
          {users.map((user) => (
            <li key={user._id} className="sidebar1Friend">
              <img
                className="sidebar1FriendImg"
                src={user.profilePicture}
                alt={user.username}
              />
              <span className="sidebar1FriendName">{user.username}</span>
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  );
}
