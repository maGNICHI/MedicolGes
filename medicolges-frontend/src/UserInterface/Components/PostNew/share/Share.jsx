import React, { useState, useEffect } from "react";
import axios from "axios";
import "./share.css";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";

export default function CreatePost({ project }) {
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [showTagInput, setShowTagInput] = useState(false);
  const [tagSuggestions, setTagSuggestions] = useState([]);
  const [userPic, setUserPic] = useState(""); // State to store user's profile picture

  // Fetch user's profile picture from local storage when component mounts
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

    // Filter tag suggestions based on user input
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
      if (!content && files.length === 0) {
        console.error("Please enter content or select a file.");
        return;
      }

      const userData = JSON.parse(localStorage.getItem("userInfo"));
      const posterId = userData ? userData._id : null; // Get the user's ID from localStorage

      const formData = new FormData();
      formData.append("posterId", posterId);
      formData.append("message", content);
      for (let i = 0; i < files.length; i++) {
        formData.append("image", files[i]);
      }
      formData.append("tags", tags.join(","));
      if (project) {
        formData.append("project", project);
      }

      // Send the POST request to the backend API
      const response = await axios.post(
        "http://localhost:5000/api/posts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Fetch user details after successfully creating the post
      const userResponse = await axios.get(
        `http://localhost:5000/api/user/${posterId}`
      );

      // Update state with user's details
      setUserPic(userResponse.data.pic);

      // Reload the page or perform other actions as needed
      window.location.reload();

      console.log("Post created:", response.data);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={userPic} alt="User Profile" />{" "}
          {/* Display user's profile picture */}
          <input
            placeholder="What's going through your mind? "
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
              <span className="shareOptionText">Photo & Video</span>
              <input
                type="file"
                style={{ display: "none" }}
                id="file"
                accept=".png, .jpg, .jpeg"
                multiple // Allow selecting multiple files
                onChange={(e) => setFiles([...files, ...e.target.files])} // Add new files to the files list
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
      </div>
    </div>
  );
}
