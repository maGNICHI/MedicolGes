// CommentForm.jsx
import React, { useState } from "react";
import axios from "axios";
import { FaRegCommentDots } from "react-icons/fa";

const CommentForm = ({ postId, onCommentAdded }) => {
  const [comment, setComment] = useState({ text: "" });

  const handleChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const handleCommentSubmit = async () => {
    try {
      await axios.patch(
        `http://localhost:5000/api/posts/comment-post/${postId}`,
        comment
      );
      setComment({ text: "" });
      // Trigger the parent component to reload comments after adding a comment
      onCommentAdded();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="comment-form">
      <textarea
        className="form-control"
        value={comment.text}
        placeholder="Leave a comment"
        onChange={handleChange}
        name="text"
      />
      <button className="btn btn-primary" onClick={handleCommentSubmit}>
        <FaRegCommentDots /> Add Comment
      </button>
    </div>
  );
};

export default CommentForm;
