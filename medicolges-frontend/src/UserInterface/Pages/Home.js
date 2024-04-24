import React, { useEffect, useLayoutEffect } from "react";
import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import Info from "../Components/Info";
import About from "../Components/About";
import Footer from "../Components/Footer";
import { useLocation, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const userInformation = JSON.parse(localStorage.getItem("userInfo"));
    const isLoginPage = location.pathname === "/login";
    const isSignupPage = location.pathname === "/signup";

    // Allow access to login and signup pages when the user is not logged in
    if (!userInformation && !isLoginPage && !isSignupPage) {
      navigate("/login");
    }
  }, [navigate, location]);

  return (
    <div className="home-section">
      <Navbar />
      <div className="contentUser">
        <Hero id="hero" />
        <Info id="info" />
        <About id="about" />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
