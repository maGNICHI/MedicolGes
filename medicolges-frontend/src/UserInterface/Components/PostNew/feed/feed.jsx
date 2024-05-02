import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";

export default function Feed({ inproject, projectId }) {
const [posts, setPosts] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
  useEffect(() => {
    fetchPosts();
  }, []); // Charge les posts au montage

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Ajoutez cette fonction pour interagir avec l'API Flask et récupérer les posts populaires
  const fetchPopularPosts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:1000/get_popular_posts"
      );
      setPosts(response.data); // Mise à jour des posts avec les posts populaires
    } catch (error) {
      console.error("Error fetching popular posts:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="feed mt-3">
      <div className="feedWrapper">
        {/* Bouton pour charger les posts populaires */}
        <button onClick={fetchPopularPosts} className="btnFetchPopular ml-6">
          Most popular posts
        </button>

        <Share project={projectId} setPosts={setPosts} />
        {projectId
          ? posts
              .filter((post) => post.project === projectId)
              .map((post) => (
                <Post key={post._id} post={post} setPosts={setPosts} />
              ))
          : posts
              .filter((post) => !post.project)
              .map((post) => (
                <Post key={post._id} post={post} setPosts={setPosts} />
              ))}
      </div>
    </div>
  );
}
