import React, { useEffect, useState } from "react";
import IconButton from "../../../../components/Button/IconButton";
import { Button, Form, Modal } from "react-bootstrap";
import Title from "../../../../components/Title/Title";
import axios from "axios";
import Feed from "./Feed";

export default function Feedback({ projectId }) {
  const [showAddFeedBackModal, setShowAddFeedBackModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [feedbacks, setFeedbacks] = useState([]);
  const [userDetails, setUserDetails] = useState();
  const [sortOption, setSortOption] = useState("mostRecent");
  const [feedb, setFeedb] = useState({}); // Initialize feedb as an empty object
  const [displayedFeedbacks, setDisplayedFeedbacks] = useState([]);
  const [numDisplayedReviews, setNumDisplayedReviews] = useState(3);
  const user = JSON.parse(localStorage.getItem("userInfo"));

  const handleCloseAddFeedBackModal = () => setShowAddFeedBackModal(false);
  const handleShowAddFeedBackModal = () => setShowAddFeedBackModal(true);

  const fetchFeedbacks = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/feedback/project/${id}`
      );
      setFeedbacks(response.data.success.feedback);
      setDisplayedFeedbacks(response.data.success.feedback);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  const fetchUser = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/user/getUserById/${id}`
      );
      setUserDetails(response.data.success.user);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    if (projectId._id) {
      fetchFeedbacks(projectId._id);
    }
  }, [projectId]);

  useEffect(() => {
    feedbacks.forEach((feedback) => {
      setFeedb(feedback); // Update feedb for each feedback
      if (feedback.userId) {
        fetchUser(feedback.userId);
      }
    });
  }, [feedbacks]);

  const handleAddFeedback = async () => {
    try {
      await axios.post("http://localhost:5000/api/feedback/addFeedback", {
        title,
        description,
        rating,
        projectId: projectId._id,
        userId: user._id,
      });
      handleCloseAddFeedBackModal();
      fetchFeedbacks(projectId._id); // Fetch updated feedbacks after adding new feedback
    } catch (error) {
      console.error("Error adding feedback:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    const sorted = [...feedbacks].sort((a, b) => {
      if (e.target.value === "mostRecent") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (e.target.value === "ratings") {
        return b.rating - a.rating;
      }
    });
    setDisplayedFeedbacks(sorted);
  };

  const handleShowMoreReviews = () => {
    setNumDisplayedReviews(numDisplayedReviews + 3);
  };

  return (
    <div class="row mt-5">
      <div className="col-lg-12 col-md-12 col-12 px-5">
        <div className="mb-5">
          <h4 class="mb-2">
            Review this project &{" "}
            <span> Share your thoughts with other users.</span>
          </h4>
          <IconButton
            className="border-0 w-100"
            style={{
              background: "linear-gradient(-45deg, #1990aa 0%, #8ac2bb 100%)",
              color: "white",
              fontSize: "16px",
              fontWeight: 600,
              padding: "8px 16px",
              borderRadius: "20px",
            }}
            onClick={handleShowAddFeedBackModal}
          >
            Write A Review
          </IconButton>
        </div>
        <div className="d-flex align-items-center justify-content-between mb-5">
          <div>
            <h4 className="mb-0">Ratings &amp; Reviews</h4>
          </div>
          <div>
            <select
              className="custom-select"
              value={sortOption}
              onChange={handleSortChange}
            >
              <option value="mostRecent">Most Recent</option>
              <option value="ratings">Ratings</option>
            </select>
          </div>
        </div>
        {/* Display feedbacks */}
        {displayedFeedbacks
          .slice(0, numDisplayedReviews)
          .map(
            (feedback, index) =>
              feedback.isDeleted === false && (
                <Feed index={index} feedback={feedback} />
              )
          )}
        {/* Show more reviews button */}
        {numDisplayedReviews < displayedFeedbacks.length && (
          <Button variant="primary" onClick={handleShowMoreReviews}>
            Show More Reviews
          </Button>
        )}
      </div>

      <Modal show={showAddFeedBackModal} onHide={handleCloseAddFeedBackModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Your Review</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddFeedback}>
          <Modal.Body>
            {/* Feedback form */}
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter A Title For Your Review"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter a Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formRating">
              <Form.Label>Rate The Project</Form.Label>
              <div className="rating">
                {[5, 4, 3, 2, 1].map((star) => (
                  <React.Fragment key={star}>
                    <input
                      type="radio"
                      id={`star-${star}`}
                      name="star-radio"
                      value={star}
                      checked={rating === star}
                      onChange={() => setRating(star)}
                    />
                    <label htmlFor={`star-${star}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path
                          pathLength="360"
                          d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                        ></path>
                      </svg>
                    </label>
                  </React.Fragment>
                ))}
              </div>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleCloseAddFeedBackModal}>
              Cancel
            </Button>
            <Button type="submit" variant="secondary">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
