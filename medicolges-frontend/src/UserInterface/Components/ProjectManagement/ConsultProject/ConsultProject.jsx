import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar";
import Footer from "../../Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import { FaDatabase, FaShareAlt } from "react-icons/fa";
import IconButton from "../../../../components/Button/IconButton";
import Details from "./Details";
import CreatePost from "../../Post/CreatePost";
import Feedback from "./Feedback";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Feed from "../../PostNew/feed/feed";

export default function ConsultProject({ onFollow }) {
  const [selectedName, setSelectedName] = useState("Consult Project");
  const [projectData, setProjectData] = useState({});
  const [organizationId, setOrganizationId] = useState({});
  const [posts, setPosts] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [showDetails, setShowDetails] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false); // State for showing Feedback component
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const { id } = useParams();
  const [goUp, setGoUp] = useState(false);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [following, setFollowing] = useState(false);

  console.log("followwwwwwww",following);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/project/${id}`
        );
        setProjectData(response.data.success.project);
        setFollowing(projectData?.followers?.includes(user?._id));
        setFollowersCount(response.data.success.project.numberFollowers);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    const fetchOrganization = async () => {
      try {
        if (projectData.organization) {
          const response = await axios.get(
            `http://localhost:5000/api/project/organization/${projectData.organization}`
          );
          setOrganizationId(response.data.success.organization);
        }
      } catch (error) {
        console.error("Error fetching organization data:", error);
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/posts");
        // Filter posts related to the project
        const postsRelatedToProject = response.data.filter(
          (post) => post.project === id
        );
        // Set the number of posts related to the project
        setPosts(postsRelatedToProject.length);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    const fetchFeedbacks = async (id) => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/feedback/project/${id}`
        );
        setFeedbacks(response.data.success.feedback); // Update to set feedbacks from response
        setFeedbackCount(response.data.success.feedback.length);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchData();
    fetchPosts();
    fetchOrganization();
    if (projectData._id) {
      // Add condition to ensure projectData._id is available
      fetchFeedbacks(projectData._id);
    }

    const onPageScroll = () => {
      if (window.scrollY > 600) {
        setGoUp(true);
      } else {
        setGoUp(false);
      }
    };
    window.addEventListener("scroll", onPageScroll);

    return () => {
      window.removeEventListener("scroll", onPageScroll);
    };

    onPageScroll();
  }, [id, projectData.organization]);

  // Calculate statistics
  const calculateStatistics = () => {
    const statistics = {
      totalRatings: feedbacks.length,
      ratings: [0, 0, 0, 0, 0], // Initialize array for star ratings count
    };

    // Count ratings
    feedbacks.forEach((feedback) => {
      statistics.ratings[feedback.rating - 1]++;
    });

    // Calculate percentages
    statistics.percentages = statistics.ratings.map(
      (count) => (count / statistics.totalRatings) * 100
    );

    return statistics;
  };

  const statistics = calculateStatistics();

  const handleFollow = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/project/${projectData?._id}/follow`,
        {
          userId: user._id,
        }
      );
      setFollowing(true);
      setFollowersCount((prevCount) => prevCount + 1);
      onFollow(response.data.project);
    } catch (error) {
      console.error("Error following project:", error);
    }
  };

  const handleUnfollow = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/project/${projectData?._id}/unfollow`,
        {
          data: {
            userId: user._id,
          },
        }
      );
      setFollowing(false);
      setFollowersCount((prevCount) => Math.max(0, prevCount - 1));
      onFollow(response.data.project);
    } catch (error) {
      console.error("Error unfollowing project:", error);
    }
  };

  return (
    <div className="home-section">
      <Navbar />
      <div className="contentUser">
        <div className="container-fluid mt20 mb-5">
          <div className="row pl-10 mb-10">
            <h3 className="info-title pt-20">
              <span>"{projectData.name}" Project Details:</span>
            </h3>
          </div>
          <div className="row pb-24 px-10">
            <Col md={3} xs={12}>
              <Row className="d-flex justify-content-center mt-5 mb-3">
                <div
                  className="icon"
                  style={{
                    background:
                      "linear-gradient(-45deg, rgb(25, 144, 170) 0%, rgb(138, 194, 187) 100%)",
                    borderRadius: "50%",
                    width: "100px",
                    height: "100px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ color: "white" }}>
                    <FaDatabase />
                  </span>
                </div>
              </Row>
              <Row>
                <div className="text-center">
                  <h4>{projectData.name}</h4>
                  <p style={{ color: "gray" }}>{organizationId.name}</p>
                </div>
              </Row>
              <Row className="text-center">
                <Col md={4} className="mt-2">
                  <p style={{ fontWeight: "bold", marginBottom: "5px" }}>
                    {followersCount}
                  </p>
                  <p
                    style={{ fontSize: "14px", color: "gray", marginTop: "0" }}
                  >
                    Followers
                  </p>
                </Col>
                <Col md={4} className="mt-2">
                  <p style={{ fontWeight: "bold", marginBottom: "5px" }}>
                    {posts}
                  </p>
                  <p
                    style={{ fontSize: "14px", color: "gray", marginTop: "0" }}
                  >
                    Posts
                  </p>
                </Col>
                <Col md={4} className="mt-2">
                  <p style={{ fontWeight: "bold", marginBottom: "5px" }}>
                    {feedbackCount}
                  </p>
                  <p
                    style={{ fontSize: "14px", color: "gray", marginTop: "0" }}
                  >
                    Reviews
                  </p>
                </Col>
              </Row>
              <hr />
              <Row>
                <div className="mb-6">
                  <h4 className="mb-3">User reviews</h4>
                  <span className="font-14">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <i
                        key={index}
                        className={`fas fa-star ${
                          index <
                          Math.floor(statistics.percentages[4 - index] / 20)
                            ? "fas fa-star text-warning"
                            : "far fa-star text-warning"
                        }`}
                      ></i>
                    ))}
                  </span>
                  <span className="h5">{statistics.totalRatings} out of 5</span>
                  <p className="font-14">
                    {statistics.totalRatings} user ratings
                  </p>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div className="row align-items-center mb-1" key={index}>
                      <div className="col-md-1 col-1 pr-0">
                        <div className="font-12 text-dark">{5 - index}</div>
                      </div>
                      <div className="col-md-9 col-9 pr-2">
                        <div className="progress" style={{ height: "8px" }}>
                          <div
                            className="progress-bar bg-warning"
                            role="progressbar"
                            style={{
                              width: `${statistics.percentages[4 - index]}%`,
                            }}
                            aria-valuenow={statistics.percentages[4 - index]}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                      <div className="col-md-2 col-2">
                        <div className="font-12 text-primary">
                          {isNaN(Math.round(statistics.percentages[4 - index]))
                            ? "0%"
                            : `${Math.round(
                                statistics.percentages[4 - index]
                              )}%`}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Row>
            </Col>
            <Col md={9} xs={12}>
              <nav className="navbar navbar-expand-lg d-flex justify-content-between">
                {" "}
                <ul className="navbar-nav">
                  {" "}
                  <li className="nav-item">
                    {" "}
                    <a
                      className="nav-link"
                      href="#details"
                      onClick={() => {
                        setShowDetails(true);
                        setShowFeedback(false);
                      }}
                    >
                      Details
                    </a>{" "}
                  </li>{" "}
                  <li className="nav-item">
                    {" "}
                    <a
                      className="nav-link"
                      href="#posts"
                      onClick={() => {
                        setShowDetails(false);
                        setShowFeedback(false);
                      }}
                    >
                      Posts
                    </a>{" "}
                  </li>{" "}
                  <li className="nav-item">
                    {" "}
                    <a
                      className="nav-link"
                      href="#feedback"
                      onClick={() => {
                        setShowFeedback(true);
                        setShowDetails(false);
                      }}
                    >
                      {" "}
                      {/* Update onClick to show feedback */}
                      Feedback
                    </a>{" "}
                  </li>{" "}
                </ul>
                {following ? (
                  <IconButton
                    className="border-0 w-100"
                    style={{
                      background:
                        "linear-gradient(-45deg, #ff7e5f 0%, #feb47b 100%)",
                      color: "white",
                      fontSize: "16px",
                      fontWeight: 600,
                      padding: "8px 16px",
                      borderRadius: "20px",
                    }}
                    onClick={handleUnfollow}
                  >
                    Unfollow
                  </IconButton>
                ) : (
                  <IconButton
                    className="border-0 w-100"
                    style={{
                      background:
                        "linear-gradient(-45deg, #1990aa 0%, #8ac2bb 100%)",
                      color: "white",
                      fontSize: "16px",
                      fontWeight: 600,
                      padding: "8px 16px",
                      borderRadius: "20px",
                    }}
                    onClick={handleFollow}
                  >
                    Follow
                  </IconButton>
                )}
              </nav>
              {/* Conditionally render Details, Posts, or Feedback component based on state */}
              {showDetails ? (
                <Details
                  projectData={projectData}
                  organization={organizationId}
                />
              ) : showFeedback ? (
                <Feedback projectId={projectData} /> // Pass feedbacks as props to Feedback component
              ) : (
                <Feed inproject={true} projectId={id} />
              )}
            </Col>
          </div>
        </div>
      </div>
      <div
        onClick={scrollToTop}
        className={`scroll-up ${goUp ? "show-scroll" : ""}`}
      >
        <FontAwesomeIcon icon={faAngleUp} />
      </div>
      <Footer />
    </div>
  );
}
