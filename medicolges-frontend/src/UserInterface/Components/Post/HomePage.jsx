import React from "react";
import CreatePost from "./CreatePost";
import PostItem from "./PostItem";
import Navbar from "../Navbar";
import "./style.css";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="container contentUser">
        <div className="row">
          <div className="col-md-8">
            <CreatePost />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
