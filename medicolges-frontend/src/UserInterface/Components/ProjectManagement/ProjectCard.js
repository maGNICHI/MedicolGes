import React, { useState } from "react";
import { Col } from "react-bootstrap";
import { FaArrowRight, FaDatabase } from "react-icons/fa";
import IconButton from "../../../components/Button/IconButton";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default function ProjectCard({ project, onFollow }) {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [following, setFollowing] = useState(project.followers.includes(user?._id));
  const [followersCount, setFollowersCount] = useState(project.numberFollowers);

  const truncateDescription = (text, maxLength) => {
    if (text && text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    } else {
      return text;
    }
  };
  
  const handleFollow = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/project/${project._id}/follow`,
        {
          userId: user._id,
        }
      );
      setFollowing(true);
      setFollowersCount((prevCount) => prevCount + 1);
      onFollow(response.data.project);
    } catch (error) {
      console.error("Error following project:", error);
    }
  };

  const handleUnfollow = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/project/${project._id}/unfollow`,
        {
          data: {
            userId: user._id,
          },
        }
      );
      setFollowing(false);
      setFollowersCount((prevCount) => Math.max(0, prevCount - 1));
      onFollow(response.data.project);
    } catch (error) {
      console.error("Error unfollowing project:", error);
    }
  };

  return (
    <div className="box">
      <div className="our-services settings">
        <div
          className="icon"
          style={{
            background: `linear-gradient(-45deg, #1990aa 0%, #8ac2bb 100%)`,
            borderRadius: "50%",
            width: "80px",
            height: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ color: "white" }}>
            <FaDatabase />
          </span>
        </div>
        <h4>{project.name}</h4>
        <p className="py-4 inline-content">
          {truncateDescription(project.description, 90)}
        </p>
        <NavLink
          className={"text-center"}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textDecoration: "none",
          }}
          to={`/projects/consult/${project._id}`}
        >
          <p style={{ fontWeight: "bold" }}>
            <span style={{ display: "flex", alignItems: "center" }}>
              <FaArrowRight style={{ marginRight: "5px" }} />
              Click Here To See More Details.
            </span>
          </p>
        </NavLink>
        <div className="row mt-4">
          <Col md={6} className="mt-2">
            <p style={{ fontWeight: "bold" }}>{followersCount} Followers</p>
          </Col>
          <Col md={6}>
            {following ? (
              <IconButton
                className="border-0 w-100"
                style={{
                  background:
                    "linear-gradient(-45deg, #ff7e5f 0%, #feb47b 100%)",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: 600,
                  padding: "8px 16px",
                  borderRadius: "20px",
                }}
                onClick={handleUnfollow}
              >
                Unfollow
              </IconButton>
            ) : (
              <IconButton
                className="border-0 w-100"
                style={{
                  background:
                    "linear-gradient(-45deg, #1990aa 0%, #8ac2bb 100%)",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: 600,
                  padding: "8px 16px",
                  borderRadius: "20px",
                }}
                onClick={handleFollow}
              >
                Follow
              </IconButton>
            )}
          </Col>
        </div>
      </div>
    </div>
  );
}
