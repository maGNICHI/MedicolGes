import React, { useState, useEffect } from "react";
import axios from "axios";

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch comments initially
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/posts/ShowComments/${postId}`
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/posts/delete-comment-post/${postId}`,
        { commentId }
      );
      // Fetch comments again after deletion
      fetchComments();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <div key={comment._id} className="comment-item">
          <p>{comment.text}</p>
          {/* Render other comment details as needed */}
          <button
            className="btn btn-primary"
            onClick={() => handleDeleteComment(comment._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
