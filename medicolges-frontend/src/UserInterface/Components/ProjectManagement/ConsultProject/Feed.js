import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Feed({ index, feedback }) {
    const [userDetails, setUserDetails] = useState();

    const fetchUser = async (id) => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/user/getUserById/${id}`
          );
          setUserDetails(response.data.success.user);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };
      useEffect(() => {
            fetchUser(feedback.userId);
      }, [feedback]);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      };
  return (
    <div key={index} className="mb-4 pb-4 border-bottom">
      {/* User avatar and name */}
      <div className="d-flex mb-3 align-items-center">
        {/* Avatar */}
        {userDetails ? (
          <img
            src={userDetails.pic}
            width={"50px"}
            height={"50px"}
            alt="Profile"
            className="rounded-circle avatar-lg"
          />
        ) : (
          <img
            src={process.env.PUBLIC_URL + "/images/avatar/useravatar.jpg"}
            width={"50px"}
            height={"50px"}
            alt="Profile"
            className="rounded-circle avatar-lg"
          />
        )}
        {/* User name */}
        <div className="ml-2">
          <h5 className="mb-1">
            {userDetails ? userDetails.username : "unknown"}
            <img src="../assets/images/verified.svg" alt="" />
          </h5>
          <p className="font-12 mb-0">
            {/* Date */}
            <span>{formatDate(feedback.createdAt)}</span>
          </p>
        </div>
      </div>
      {/* User rating */}
      <div className="mb-2">
        {[...Array(5)].map((_, starIndex) => (
          <span key={starIndex} className="font-14 mr-2">
            {starIndex < feedback.rating ? (
              <i className="fas fa-star text-warning"></i>
            ) : (
              <i className="far fa-star text-warning"></i>
            )}
          </span>
        ))}
        {/* Review title */}
        <span className="h5">{feedback.title}</span>
      </div>
      {/* Review description */}
      <p>{feedback.description}</p>
      {/* Helpful and Report abuse links */}
      {/* <a href="#!" className="btn btn-light btn-sm mr-2">
                Helpful
              </a>
              <a href="#!" className="text-inherit font-14">
                Report abuse
              </a> */}
    </div>
  );
}
