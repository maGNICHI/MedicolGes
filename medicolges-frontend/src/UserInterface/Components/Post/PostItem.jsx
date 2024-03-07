import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment"; 
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import LikeButton from "./LikeButton";
import "./style.css";

const PostItem = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [posterName, setPosterName] = useState("");
  const [commentCount, setCommentCount] = useState(0);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    if (post) { // Vérification de nullité sur post
      axios
        .get(`http://localhost:5000/api/users/${post.posterId}`)
        .then((response) => {
          setPosterName(response.data.username);
        })
        .catch((error) => {
          console.error("Error fetching poster's name:", error);
        });

      axios
        .get(`http://localhost:5000/api/posts/comment-count/${post._id}`)
        .then((response) => {
          setCommentCount(response.data.count);
        })
        .catch((error) => {
          console.error("Error fetching comment count:", error);
        });

      axios
        .get(`http://localhost:5000/api/posts/comment-post/${post._id}`)
        .then((response) => {
          setComments(response.data);
        })
        .catch((error) => {
          console.error("Error fetching comments:", error);
        });
    }
  }, [post]); // Ne pas spécifier post._id ou post.posterId ici


  const getFormattedTime = (createdAt) => {
    return moment(createdAt).format("MMMM Do YYYY, h:mm:ss a");
  };
  const handleCommentAdded = () => {
    if (post) { // Vérification de nullité sur post
      axios
        .get(`http://localhost:5000/api/posts/comment-post/${post._id}`)
        .then((response) => {
          setComments(response.data);
        })
        .catch((error) => {
          console.error("Error fetching comments:", error);
        });

      axios
        .get(`http://localhost:5000/api/posts/comment-count/${post._id}`)
        .then((response) => {
          setCommentCount(response.data.count);
        })
        .catch((error) => {
          console.error("Error fetching comment count:", error);
        });
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  if (!post) {
    return null; // Si post est null, ne rien afficher
  }

  return (
    <div className="row justify-content-left">
      <div className="post-item-container">
        <div className="profile-content">
          <div className="tab-content">
            <div className="tab-pane fade active show">
              <ul className="timeline">
                <li>
                  <div className="timeline-time">
                    <small>
                      <span className="date">{}</span>
                      <br />
                      <span className="time">
                        {getFormattedTime(post.createdAt)}
                      </span>
                    </small>
                  </div>

                  <div className="timeline-icon">
                    <a href="javascript:;"> </a>
                  </div>
                  <div className="timeline-body">
                    <div className="timeline-header">
                      <span className="userimage">
                        <img
                          src="https://bootdey.com/img/Content/avatar/avatar3.png"
                          alt=""
                        />
                      </span>
                      <span className="username">
                        <a href="javascript:;">{posterName}Emna</a>{" "}
                        <small></small>
                      </span>
                    </div>
                    <div className="timeline-content">
                      <p>{post.message}</p>
                    </div>
                    <div className="timeline-likes">
                      <div className="stats-right">
                        <span className="stats-text">259 Shares</span>
                        <span
                          className="stats-text"
                          style={{ cursor: "pointer" }}
                          onClick={toggleComments}
                        >
                          {commentCount} Comments
                        </span>
                      </div>
                      <LikeButton postId={post._id} initialLikes={post.likes} />
                    </div>
                    <div className="timeline-footer">
                      <CommentForm
                        postId={post._id}
                        onCommentAdded={handleCommentAdded}
                      />
                    </div>
                    {showComments && <CommentList postId={post._id} />}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
