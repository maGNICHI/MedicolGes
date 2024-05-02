// Comment.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

const Comment = ({ comment, user, setPosts, postId }) => {
  const [commenter, setCommenter] = useState(null);
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(comment.text);
 
useEffect(() => {
  const fetchCommenterDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/user/${comment.commenterId}`
      );
      setCommenter(response.data);
    } catch (error) {
      console.error("Error fetching commenter details:", error);
    }
  };

  fetchCommenterDetails();
}, [comment.commenterId]);

  const handleDeleteComment = async () => {
    try {
      await axios.patch(
        `http://localhost:5000/api/posts/delete-comment-post/${postId}`,
        { commentId: comment._id }
      );
      try {
        const response = await axios.get("http://localhost:5000/api/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } 
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleEditComment = async () => {
    try {
      await axios.patch(
        `http://localhost:5000/api/posts/edit-comment-post/${postId}`,
        {  commentId: comment._id ,text }
      );
      try {
        const response = await axios.get("http://localhost:5000/api/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } 
      setEditing(false);
     } catch (error) {
      console.error("Error updating comment:", error);
      setEditing(false)
    }
  };

  return (
    <div className="comment-item d-flex justify-content-between ">
      <div className="comment-item">
        <div className="commenter-info">
          {commenter && (
            <img
              className="postProfileImg"
              src={commenter.pic}
              alt={commenter.username}
            />
          )}
          <p className="commenter-username">
            {commenter ? commenter.username : "Unknown User"}
          </p>
        </div>
        <div className="comment-text-container">
          {editing ? (
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          ) : (
            <p className="comment-text">{comment.text}</p>
          )}
        </div>
        <div className="button-container">
          <div className="icon-container">
            <MdDeleteOutline
              className="delete-icon"
              onClick={handleDeleteComment}
            />
          </div>
          <div className="icon-container">
            {editing ? (
              <CiEdit className="edit-icon" onClick={handleEditComment} />
            ) : (
              <CiEdit className="edit-icon" onClick={() => setEditing(true)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
