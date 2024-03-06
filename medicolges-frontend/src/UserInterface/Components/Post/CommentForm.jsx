import React, { useState } from "react";
import axios from "axios";
import { FaRegCommentDots } from "react-icons/fa";

const CommentForm = ({ postId, onCommentAdded }) => {
  const [comment, setComment] = useState({});
  const handleChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };
  console.log(postId);
  const handleCommentSubmit = async () => {
    try {
      await axios.patch(
        `http://localhost:8000/api/posts/comment-post/${postId}`,

        comment
      );
      setComment({ text: "" });
      // Trigger the parent component to reload posts after adding a comment
      // onCommentAdded();
      // Clear the comment text after submission
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  console.log(comment);

  return (
    <div className="comment-form">
      <textarea
        className="com"
        value={comment.text}
        placeholder="Leave a comment"
        onChange={handleChange}
        name="text"
      />
      <button className="btn btn-primary" onClick={handleCommentSubmit}>
        <FaRegCommentDots />
      </button>
    </div>
  );
};

export default CommentForm;
