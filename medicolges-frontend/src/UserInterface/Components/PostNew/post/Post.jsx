import React, { useState, useEffect } from "react";
import axios from "axios";
import { MoreVert } from "@material-ui/icons";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import "./post.css";
import likeIcon from "./like.png";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likers.length);
  const [isLiked, setIsLiked] = useState(
    post.likes ? post.likes.includes(localStorage.getItem("userInfo")) : false
  );
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [poster, setPoster] = useState(null);
  const userData = JSON.parse(localStorage.getItem("userInfo"));
  const posterId = userData ? userData._id : null;

  useEffect(() => {
    const fetchPosterDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/${post.posterId}`
        );
        setPoster(response.data);
      } catch (error) {
        console.error("Error fetching poster details:", error);
      }
    };

    fetchPosterDetails();
  }, [post.posterId]);

  const likeHandler = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.error("User ID not found in local storage");
        return;
      }

      const url = `http://localhost:5000/api/posts/${
        isLiked ? "unlike-post" : "like-post"
      }/${post._id}`;

      await axios.patch(url, {}, { headers: { "user-id": userId } });

      // Toggle like state
      setIsLiked(!isLiked);

      // Update like count
      setLike((prevLike) => (isLiked ? prevLike - 1 : prevLike + 1));
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

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            {poster && (
              <img
                className="postProfileImg"
                src={poster.pic}
                alt={poster.username}
              />
            )}
            <span className="postUsername">
              {poster ? poster.username : "Unknown User"}
            </span>
            <span className="postDate">{formatDate(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.message}</span>
          {post.image && (
            <div
              className={`postImages ${
                post.image.length > 1 ? "multipleImages" : "singleImage"
              }`}
            >
              {post.image.map((image, index) => (
                <img
                  key={index}
                  className={`postImg ${
                    post.image.length > 1 ? "multiImg" : ""
                  }`}
                  src={image}
                  alt={`Image ${index}`}
                />
              ))}
            </div>
          )}
          <div className="postTags">
            {post.tags.map((tag, index) => (
              <span key={index} className="postTag">
                #{tag}
              </span>
            ))}
          </div>
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={likeIcon}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">
              {like} likers
            </span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText" onClick={toggleComments}>
              Comments {post.comments.length}
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
