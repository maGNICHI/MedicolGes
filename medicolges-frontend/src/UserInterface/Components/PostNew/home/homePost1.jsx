
import Sidebar from "../sidebar/sidebar";
import Feed from "../feed/feed";

import Rightbar from "../rightbar/rightbar";
import Navbar from "../../Navbar";
import "./home.css";

export default function Home() {
  return (
    <>
  <Navbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </>
  );
}
