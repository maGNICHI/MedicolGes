import React from "react";
import CreatePost from "./CreatePost";
import PostItem from "./PostItem";
import Navbar from "../Navbar";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <CreatePost />
          </div>
          <div className="col-md-4">
            <PostItem />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
