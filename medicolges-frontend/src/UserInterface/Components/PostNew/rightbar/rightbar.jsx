import React, { useState, useEffect } from "react";
import axios from "axios";
import "./sidebar.css";
import {Divider} from "@chakra-ui/react";

export default function Sidebar() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const token = userInfo.token;

        const response = await axios.get("http://localhost:5000/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error loading users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="sidebar1" style={{padding:20}}>
     <div className="eight">
       <h3 className="title-user">Users </h3>
     </div>
      <Divider orientation='horizontal' />
      <ul className="sidebar1FriendList">
        {users.map((user) => (
          user.isDeleted ===false &&(
          <div key={user._id} className="userRow">
            <img
              className="postProfileImg"
              src={user.pic}
              alt={user.username}
            />
            <span className="username">{user.username}</span>
          </div>)
        ))}
      </ul>
    </div>
  );
}
