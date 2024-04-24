// Comment.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

const Comment = ({ comment, user, setPosts, postId }) => {
  const [commenter, setCommenter] = useState(null);
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(comment.text);
 

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
      <div className="d-flex align-items-center">
        {user && (
          <img
            className="postProfileImg"
            src={user.pic}
            alt={user.username}
          />
        )}
        <div>

        <p className="commenter-username mt-2">
          {user ? user.username : "Unknown User"}
        </p>
        {editing ? (
          <div className="d-flex justify-content-between  ">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
                 
          </div>
      ) : <p>{comment.text}</p>}
        
        </div>
      </div>
    
      <div className="button-container">
        <div className="icon-container">
          <MdDeleteOutline
            className="delete-icon"
            onClick={() =>handleDeleteComment()}
          />
        </div>
        <div className="icon-container">
          {editing ? (
            <CiEdit className="edit-icon" onClick={() => setEditing(false)} />
          ) : (
            <CiEdit className="edit-icon" onClick={() => setEditing(true)} />
          )}
        </div>
        <div>
        {editing && <button className="btn btn-primary mt-3"  onClick={handleEditComment} >Update </button>}

        </div>
      </div>
    </div>
  );
};

export default Comment;
