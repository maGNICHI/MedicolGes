import React, { useEffect, useState } from "react";
import axios from "axios";
import PostItem from "./PostItem";
import "./style.css";


const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from the backend
    axios
      .get("http://localhost:5000/api/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <>
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
  </>
  );
};

export default PostList;
