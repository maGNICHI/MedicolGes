import Sidebar from "../sidebar/sidebar";
import Feed from "../feed/feed";

import Rightbar from "../rightbar/rightbar";
import Navbar from "../../Navbar";
import "./home.css";
import Footer from "../../Footer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleUp} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

export default function Home() {
    const [goUp, setGoUp] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: "smooth"});
    };
    return (
        <div className="home-section">
            <Navbar/>
            <div className="homeContainer">
                <div className=" mt-20 mb-5" style={{width:"100%",padding:"0"}}>

<div style={{display:"flex",flexDirection:"row",padding:"0"}}>
    <Sidebar/>
    <div style={{display:"flex",flexDirection:"column",width:"60%" ,padding:"20px"}} >
        <div className="col-md-12 col-xs-12">
            <h3 className="info-title ml-10">
                <span>Our Feed</span>
            </h3>
        </div>
        <div style={{width:"80%", padding:"20px 0px 0px 30px"}}>
            <Feed/>
        </div>
    </div>
    <Rightbar/>
</div>
                    {/*<div className="col-12 pt-10 mb-10">*/}
                    {/*    <Sidebar/>*/}
                    {/*    <div>*/}
                    {/*        <div className="col-md-12 col-xs-12">*/}
                    {/*            <h3 className="info-title ml-10">*/}
                    {/*                <span>Our Feed</span>*/}
                    {/*            </h3>*/}
                    {/*        </div>*/}
                    {/*        <Feed/>*/}
                    {/*    </div>*/}
                    {/*    <Rightbar/>*/}
                    {/*</div>*/}
                </div>

            </div>
            <div onClick={scrollToTop}
                 className={`scroll-up ${goUp ? "show-scroll" : ""}`}
            >
                <FontAwesomeIcon icon={faAngleUp}/>
            </div>
            <Footer/>
        </div>
    );
}
