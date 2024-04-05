import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import Info from "../Components/Info";
import About from "../Components/About";
import Footer from "../Components/Footer";

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    const userInformation = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInformation) navigate("/");
  }, [navigate]);

  return (
    <div className="home-section">
      <Navbar />
      <div className="contentUser">
        <Hero/>
        <Info />
        <About />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
