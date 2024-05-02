import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post"; // Assurez-vous d'avoir un composant Post séparé pour afficher chaque post individuel

const PostList = () => {
  const [posts, setPosts] = useState([]); // État pour stocker tous les posts

  // Charger tous les posts au montage du composant
  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des posts: ", error);
      }
    };

    fetchAllPosts();
  }, []);

  // Cette fonction sera appelée lorsque le bouton est cliqué
  const fetchPopularPosts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:1000/get_popular_posts"
      );
      setPosts(response.data); // Mettre à jour l'état des posts avec les posts les plus populaires
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des posts populaires: ",
        error
      );
    }
  };

  return (
    <div>
      <button onClick={fetchPopularPosts}>Afficher les posts populaires</button>
      {posts.map((post) => (
        <Post key={post._id} post={post} setPosts={setPosts} />
      ))}
    </div>
  );
};

export default PostList;
