import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import PostList from "./PostList";
import Navbar from "../Navbar";
import Footer from "../Footer";

const CreatePost = () => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [post, setPost] = useState({ posterId: "1" });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      // Send a POST request to create a new post
      const response = await axios.post(
        "http://localhost:5000/api/posts",
        post
      );
      console.log("Post created successfully:", response.data);
      window.location.reload(true);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <>
    {/* <Navbar /> */}

      <div className="container-fluid gedf-wrapper ">
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="card gedf-card">
              <div className="card-header">
                <ul
                  className="nav nav-tabs card-header-tabs"
                  id="myTab"
                  role="tablist"
                >
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="posts-tab"
                      data-toggle="tab"
                      href="#posts"
                      role="tab"
                      aria-controls="posts"
                      aria-selected="true"
                    >
                      Make a publication
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="images-tab"
                      data-toggle="tab"
                      href="#images"
                      role="tab"
                      aria-controls="images"
                      aria-selected="false"
                    >
                      Images
                    </a>
                  </li>
                </ul>
              </div>
              <div className="card-body">
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="posts"
                    role="tabpanel"
                    aria-labelledby="posts-tab"
                  >
                    <div className="form-group">
                      <label className="sr-only" htmlFor="message">
                        post
                      </label>
                      <textarea
                        className="form-control"
                        id="message"
                        rows="5"
                        placeholder="What are you thinking?"
                        onChange={handleChange}
                        name="message"
                      ></textarea>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="images"
                    role="tabpanel"
                    aria-labelledby="images-tab"
                  >
                    <div className="form-group">
                      <div className="custom-file">
                        <input
                          type="file"
                          className="custom-file-input"
                          id="customFile"
                          onChange={handleFileChange}
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="customFile"
                        >
                          Upload image
                        </label>
                      </div>
                    </div>
                    <div className="py-4"></div>
                  </div>
                </div>
                <div className="btn-toolbar justify-content-between">
                  <div className="btn-group">
                    <button
                      type="submit"
                      className="btn btn-lg btn-primary"
                      onClick={handleSubmit}
                    >
                      Share{" "}
                      {/* Utilisation de btn-lg pour un bouton plus grand */}
                    </button>
                  </div>
                  <div className="btn-group">
                    <button
                      id="btnGroupDrop1"
                      type="button"
                      className="btn btn-link dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fa fa-globe"></i>
                    </button>
                    <div
                      className="dropdown-menu dropdown-menu-right"
                      aria-labelledby="btnGroupDrop1"
                    >
                      <a className="dropdown-item" href="#">
                        <i className="fa fa-globe"></i> Public
                      </a>
                      <a className="dropdown-item" href="#">
                        <i className="fa fa-users"></i> Friends
                      </a>
                      <a className="dropdown-item" href="#">
                        <i className="fa fa-user"></i> Just me
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div
            className="col-lg-3"
            style={{
              backgroundImage: `url('/dd.png')`,
              backgroundSize: "cover",

              overflow: "hidden", // Masque tout contenu débordant de l'élément
            }}
          >
          </div> */}
        </div>
      </div>
      
      <PostList />
    </>
  );
};

export default CreatePost;
