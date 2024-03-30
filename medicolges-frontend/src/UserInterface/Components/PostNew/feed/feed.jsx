import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";

export default function Feed({inproject, projectId}) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="feed mt-20">
      <div className="feedWrapper">
        <Share project={projectId}/>
        {projectId ?posts.map(
          (post) => (
          <Post key={post._id} post={post} />
        )): posts.map(
          (post) => (
          post.projet === projectId &&
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
