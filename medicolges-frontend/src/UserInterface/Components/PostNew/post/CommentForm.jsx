import React, { useState, useEffect } from "react";
import axios from "axios";
import "./post.css";

const CommentForm = ({ postId, onCommentAdded }) => {
  const userData = JSON.parse(localStorage.getItem("userInfo"))
  const [comment, setComment] = useState({ text: "", commenterId: userData._id });
  const [userPic, setUserPic] = useState(""); // State to store user's profile picture
  const [username, setUsername] = useState(""); // State to store user's username

  // Fetch user's profile picture and username from local storage when component mounts
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userInfo"));
    if (userData && userData.pic) {
      setUserPic(userData.pic);
      setUsername(userData.username);
    }
  }, []);

  const handleChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const handleCommentSubmit = async () => {
    try {
      await axios.patch(
        `http://localhost:5000/api/posts/comment-post/${postId}`,
        { ...comment, username } // Include username in the comment data sent to the backend
      );
      setComment({ text: "" });
      // Trigger the parent component to reload comments after adding a comment
      onCommentAdded();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="bg-white border border-slate-100 grid grid-cols-3 gap-2 rounded-xl p-2 text-sm">
     
      {/* Display user's profile picture */}
      <img className="postProfileImg grid grid-cols-1" src={userPic} alt="User Profile" />
      <textarea
        placeholder="Your comment..."
        className="bg-slate-100 text-slate-600  placeholder:text-slate-600 placeholder:opacity-50 border border-slate-200 col-span-4 resize-none outline-none rounded-lg p-2 duration-300 focus:border-slate-600 mr-12"
        value={comment.text}
        onChange={handleChange}
        name="text"
      ></textarea>

      <button className="shareButton " onClick={handleCommentSubmit}>
       Comment
      </button>
    </div>
  );
};

export default CommentForm;
