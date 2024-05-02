import React, { useState, useEffect } from "react";
import axios from "axios";
import Comment from "./Comment";

const CommentList = ({ postId, post, setPosts}) => {
  const [comments, setComments] = useState(post.comments);
  const [user, setUser] = useState();

 useEffect(() => {
    const fetchComments = async  () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/posts/ShowComments/${postId}`
        );

        const commentsWithDetails = await Promise.all(
          response.data.map(async (comment) => {
            try {
              if (comment.commenterId) {
                const commenterResponse = await axios.get(
                  `http://localhost:5000/api/user/${comment.commenterId}`
                );
                const commenter = commenterResponse.data;
                return { ...comment, commenter };
              } else {
                console.error("Commenter ID is undefined:", comment);
                return comment;
              }
            } catch (error) {
              console.error("Error fetching commenter details:", error);
              return comment;
            }
          })
        );

        setComments(commentsWithDetails.reverse());
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    const intervalId = setInterval(fetchComments, 10000);

    return () => clearInterval(intervalId);
  }, [postId]);


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
