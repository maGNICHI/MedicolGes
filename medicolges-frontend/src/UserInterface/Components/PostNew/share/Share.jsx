import React, { useState, useEffect } from "react";
import axios from "axios";
import "./share.css";
import {
  MdPermMedia as PermMedia,
  MdLabel as Label,
  MdRoom as Room,
  MdEmojiEmotions as EmojiEmotions,
} from "react-icons/md";

export default function CreatePost({ project, setPosts }) {
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [showTagInput, setShowTagInput] = useState(false);
  const [tagSuggestions, setTagSuggestions] = useState([]);
  const [userPic, setUserPic] = useState("");
  const [sentimentEmoji, setSentimentEmoji] = useState("");
  const [projectName, setProjectName] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userInfo"));
    if (userData && userData.pic) {
      setUserPic(userData.pic);
    }
  }, []);

  const handleTagClick = () => {
    setShowTagInput(!showTagInput);
  };

  const handleTagChange = (e) => {
    const input = e.target.value;
    setTagInput(input);
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

  const undesirableWords = ["badword", "badword1", "badword2","fuck", "shit"]; // Ajoutez plus de mots selon le besoin

  const handleInputChange = async (e) => {
    const newText = e.target.value;
    const words = newText.split(" ");
    const containsUndesirable = words.some((word) =>
      undesirableWords.includes(word.toLowerCase())
    );

    if (containsUndesirable) {
      alert("Your message contains words that are not allowed.");
      // Vous pouvez aussi choisir de ne pas mettre à jour setContent si vous ne voulez pas afficher le texte
      // return; // Décommentez cette ligne si vous ne voulez pas que le contenu soit mis à jour
    }

    setContent(newText);

    if (newText === "") {
      setSentimentEmoji(""); // Clear the emoji if the input is cleared
    } else {
      analyzeSentimentBeforePosting(newText);
    }
  };

  const analyzeSentimentBeforePosting = async (text) => {
    try {
      const response = await axios.post(
        "http://localhost:1000/analyze_sentiment",
        { text: text }
      );
      if (response.data && response.data.polarity !== undefined) {
        const emoji = getSentimentEmoji(response.data.polarity);
        setSentimentEmoji(emoji); // Update emoji based on sentiment
      }
    } catch (error) {
      console.error("Error analyzing sentiment:", error);
    }
  };

const getSentimentEmoji = (polarity) => {
  if (polarity > 0.5) return "😊";
  else if (polarity > 0.3) return "😄";
  else if (polarity > -0.3) return "😐";
  else if (polarity > -0.5) return "😞";
  else return "😢";
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content && files.length === 0) {
      console.error("Please enter content or select a file.");
      return;
    }

    await analyzeSentimentBeforePosting(content);
    try {
      const userData = JSON.parse(localStorage.getItem("userInfo"));
      const posterId = userData ? userData._id : null;
      const formData = new FormData();
      formData.append("posterId", posterId);
      formData.append("message", content);
      files.forEach((file) => formData.append("image", file));
      formData.append("tags", tags.join(","));
      if (project) {
        formData.append("project", project);
      }
      const response = await axios.post(
        "http://localhost:5000/api/posts",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      try {
        const projectResponse = await axios.get(
          `http://localhost:5000/api/project/${project}`
        );
        setProjectName(projectResponse.data.success.project.name);
        // Create notification for the creator of the project
        const creatorNotification = await axios.post(
          "http://localhost:5000/api/notification/addNotification",
          {
            userAction: posterId,
            action: `${userData.username} have written a post on the project ${projectResponse.data.success.project.name}`,
            project,
            owner: projectResponse.data.success.project.creator,
            isOpened: false,
            isDeleted: false,
          }
        );
        console.log(
          "Notification created for project creator:",
          creatorNotification.data
        );
      } catch (error) {
        console.error(
          "Error creating notification for project creator:",
          error
        );
      }
      
      setPosts((prevPosts) => [response.data, ...prevPosts]);
      setContent("");
      setFiles([]);
      setTags([]);
      setSentimentEmoji(""); // Clear emoji after posting
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="share" style={{ padding: "8px 10px" }}>
      <div className="shareTop">
        <img className="shareProfileImg" src={userPic} alt="User Profile" />
        <input
          placeholder="What's going through your mind?"
          className="shareInput"
          value={content}
          onChange={handleInputChange}
          style={{ width: "100%" }}
        />
        {sentimentEmoji && (
          <div style={{ fontSize: "24px" }}>{sentimentEmoji}</div>
        )}
      </div>
      <hr className="shareHr" />
      <form onSubmit={handleSubmit} className="shareOptions">
        <label htmlFor="file" className="shareOption">
          <PermMedia htmlColor="tomato" className="shareIcon" />
          <span className="shareOptionText">Photo & Video</span>
          <input
            type="file"
            style={{ display: "none" }}
            id="file"
            accept=".png, .jpg, .jpeg"
            multiple
            onChange={(e) => setFiles([...files, ...e.target.files])}
          />
        </label>
        <div className="shareOption" onClick={handleTagClick}>
          <Label htmlColor="blue" className="shareIcon" />
          <span className="shareOptionText">Tag</span>
        </div>
        {showTagInput && (
          <div className="shareOption">
            {tags.map((tag, index) => (
              <div key={index} className="tagBadge">
                #{tag}
              </div>
            ))}
            <input
              placeholder="Enter tags (press Enter to add)"
              className="shareInput"
              value={tagInput}
              onChange={handleTagChange}
              onKeyDown={handleTagKeyDown}
            />
          </div>
        )}
        <div className="shareOption">
          <Room htmlColor="green" className="shareIcon" />
          <span className="shareOptionText">Location</span>
        </div>
        <div className="shareOption">
          <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
          <span className="shareOptionText">Emotions</span>
        </div>
        <button type="submit" className="shareButton">
          Share
        </button>
      </form>
    </div>
  );
}
