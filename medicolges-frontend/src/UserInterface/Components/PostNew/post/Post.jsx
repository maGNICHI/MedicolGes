import React, { useState } from "react";
import axios from "axios";
import { MoreVert } from "@material-ui/icons";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import "./post.css";
import likeIcon from "./like.png";
import heartIcon from "./heart.png";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]); // Add state for comments

  const likeHandler = async () => {
    try {
      if (isLiked) {
        await axios.patch(
          `http://localhost:5000/api/posts/unlike-post/${post._id}`
        );
        setLike(like - 1);
      } else {
        await axios.patch(
          `http://localhost:5000/api/posts/like-post/${post._id}`
        );
        setLike(like + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleCommentAdded = (newComment) => {
    setComments([...comments, newComment]);
  };

  const handleCommentDeleted = async (commentId) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/posts/delete-comment-post/${post._id}`,
        { commentId }
      );
      setComments(comments.filter((comment) => comment._id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleCommentUpdated = async (commentId, updatedText) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/posts/edit-comment-post/${post._id}`,
        {
          commentId,
          text: updatedText,
        }
      );
      const updatedComment = response.data;
      setComments(
        comments.map((comment) =>
          comment._id === updatedComment._id ? updatedComment : comment
        )
      );
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            {/* <img
              className="postProfileImg"
              src={post.posterId.profilePicture}
              alt=""
            /> */}
            <img className="postProfileImg" src={process.env.PUBLIC_URL + "/images/avatar/useravatar.jpg"} alt="Profile" />
            <span className="postUsername">
              {/* {post.posterId.username || */}
               "Emna" {/* Nom par défaut "Emna" */}
            </span>
            <span className="postDate">{post.createdAt}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.message}</span>
          {post.image && <img className="postImg" src={post.image} alt="" />}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={likeIcon}
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src={heartIcon}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText" onClick={toggleComments}>
              Comments
            </span>
          </div>
        </div>
        {showComments && (
          <div>
            <CommentForm
              postId={post._id}
              onCommentAdded={handleCommentAdded}
            />
            <CommentList
              postId={post._id}
              comments={comments}
              onDeleteComment={handleCommentDeleted}
              onUpdateComment={handleCommentUpdated}
            />
          </div>
        )}
      </div>
    </div>
  );
}
