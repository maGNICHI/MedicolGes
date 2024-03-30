import React, { useState } from "react";
import axios from "axios";
import "./share.css";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";

export default function CreatePost({project}) {
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [showTagInput, setShowTagInput] = useState(false);
  const [tagSuggestions, setTagSuggestions] = useState([]);

  const handleTagClick = () => {
    setShowTagInput(!showTagInput);
  };

  const handleTagChange = (e) => {
    const input = e.target.value;
    setTagInput(input);

    // Filtrer les suggestions de tags basées sur l'entrée de l'utilisateur
    const filteredTags = tags.filter((tag) =>
      tag.toLowerCase().startsWith(input.toLowerCase())
    );
    setTagSuggestions(filteredTags);
  };

  const handleAddTag = () => {
    const newTag = tagInput.trim();
    if (newTag !== "" && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setTagInput("");
    }
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!content && !file) {
        console.error("Please enter content or select a file.");
        return;
      }

      const formData = new FormData();
      formData.append("posterId", "123"); // Remplacez '123' par l'ID réel du poster
      formData.append("message", content);
      formData.append("image", file);
      formData.append("tags", tags.join(",")); // Inclure les tags dans le formData
      if (project) {
        formData.append("project", project);
      }
      
      
      console.log("prooooooooject", formData);
      

      // Envoyer la requête POST à l'API backend
      const response = await axios.post(
        "http://localhost:5000/api/posts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      window.location.reload();

      console.log("Post créé :", response.data);
      // Vous pouvez ajouter d'autres actions en cas de création de poste réussie, par exemple une redirection ou l'affichage d'un message de succès
    } catch (error) {
      console.error("Erreur lors de la création du post :", error);
      // Gérer l'erreur : afficher un message d'erreur à l'utilisateur ou réessayer
    }
  };
  
  console.log("idddddddd", project);

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src="/assets/person/1.jpeg" alt="" />
          <input
            placeholder="Qu'est-ce qui vous passe par la tête ?"
            className="shareInput"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <form onSubmit={handleSubmit} className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo ou Vidéo</span>
              <input
                type="file"
                style={{ display: "none" }}
                id="file"
                accept=".png, .jpg, .jpeg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption" onClick={handleTagClick}>
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            {showTagInput && (
              <div className="shareOption">
                {tags.map((tag, index) => (
                  <div key={index} className="tagBubble">
                    #{tag}
                  </div>
                ))}
                <input
                  placeholder="Entrez les tags (appuyez sur Entrée pour ajouter)"
                  className="shareInput"
                  value={tagInput}
                  onChange={handleTagChange}
                  onKeyDown={handleTagKeyDown}
                />
                <div className="tagSuggestions">
                  {tagSuggestions.map((tag, index) => (
                    <div
                      key={index}
                      className="tagSuggestion"
                      onClick={() => {
                        setTagInput(tag);
                        handleAddTag();
                      }}
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Localisation</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Émotions</span>
            </div>
            <button type="submit" className="shareButton">
              Partager
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
