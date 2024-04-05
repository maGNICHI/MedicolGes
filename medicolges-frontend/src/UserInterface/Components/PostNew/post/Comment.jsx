// Comment.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

const Comment = ({ comment, onDelete, onUpdate }) => {
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
        `http://localhost:5000/api/posts/delete-comment-post/${comment.postId}`,
        { commentId: comment._id }
      );
      onDelete(comment._id);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleEditComment = async () => {
    try {
      await axios.patch(
        `http://localhost:5000/api/posts/edit-comment-post/${comment._id}`,
        { text }
      );
      onUpdate(comment._id, text);
      setEditing(false);
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  return (
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
      {editing ? (
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      ) : (
        <p>{comment.text}</p>
      )}
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
  );
};

export default Comment;
