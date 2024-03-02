import React, { useState } from "react";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.css";
import "./style.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

const LikeButton = ({ postId, initialLikes, userLiked }) => {
  // Use likeCount to handle potential undefined or null values
  const likeCount = initialLikes || 0;

  const [likes, setLikes] = useState(likeCount);
  const [isLiked, setIsLiked] = useState(userLiked);

  const handleLike = async () => {
    try {
      if (isLiked) {
        // Unlike the post
        await axios.patch(
          `http://localhost:8000/api/posts/unlike-post/${postId}`
        );
        setLikes((prevLikes) => prevLikes - 1);
      } else {
        // Like the post
        await axios.patch(
          `http://localhost:8000/api/posts/like-post/${postId}`
        );
        setLikes((prevLikes) => prevLikes + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <div className="like-button">
      <button
        onClick={handleLike}
        className="btn btn-primary f-s-12 rounded-corner blue-button"
      >
        {isLiked ? (
          <i className="fas fa-heart"></i>
        ) : (
          <i className="far fa-heart"></i>
        )}
      </button>
      <span>{likes}</span>
    </div>
  );
};

export default LikeButton;
