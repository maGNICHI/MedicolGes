import React, { useState, useEffect } from "react";
import axios from "axios";
import Comment from "./Comment";

const CommentList = ({ postId, post, setPosts}) => {
  const [comments, setComments] = useState(post.comments);
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(  `http://localhost:5000/api/user/${post.posterId}`  );
 
        console.log("🚀 ~ fetchComments ~ response:", response.data)
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments()
 
   },[] );
 

  return (
    <div className="comment-list">
      <h6>All comments:</h6>
      {post.comments.length > 0 ? (
        post.comments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            user={user}
            setPosts={setPosts}
            postId={post._id}
          />
        ))
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
};

export default CommentList;
