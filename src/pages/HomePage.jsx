import pqimg from "../images/popular-quotes-trsp.png";
import mobileimg from "../images/popular-quotes-mobile.png";
import "../components/style.css";
import "../style/home.css";
import loadSvg from "../images/Loading.svg";

import popularImg from "../images/popular-home.png";
import quotesImg from "../images/quotes-home.png";
import homeSvg from "../images/home-vector.svg";
import pqLogo from "../images/pq-logo.png";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const HomePage = () => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const [latestQuote, setLatestQuote] = useState("");
  const [blobBtnLink, setBlobBtnLink] = useState("")
  const [blobBtnText, setBlobBtnText] = useState("");
  const [loadedLatest, setLoadedLatest] = useState(false);

  useEffect(() => {
    if (loggedIn) {
      setBlobBtnLink("/addquote");
      setBlobBtnText("Upload");
    } else {
      setBlobBtnLink("/signup");
      setBlobBtnText("Sign-Up");
    }

    axios
      .get("/users/latestquote")
      .then((res) => {
        setLatestQuote(res.data[0]);
      })
      .catch((error) => {
        console.log("Error : ", error);
      });
  }, [loggedIn, ]);

  useEffect(() => {
    console.log(latestQuote);
    if (latestQuote) {
      setLoadedLatest(true);
    }
  }, [latestQuote]);

  return (
    <div className="home-page">
      <div className="first-row">
        <div className="text">
          <h2 className="home-big-txt">Welcome to</h2>

          <img src={popularImg} alt="popular" className="popular-img" />
          <img src={quotesImg} alt="quotes" className="quotes-img" />

          <h2 className="home-big-txt">A place to share your </h2>
          <h2 className="home-big-txt">favourite quotes</h2>
        </div>

        <div className="home-blob">
          <div className="blob-movement"></div>
          <NavLink to={blobBtnLink}>
            <button className="home-blob-btn">{blobBtnText}</button>
          </NavLink>
        </div>
      </div>

      <div className="second-row">
        <div className="latest-quote-box">
          <div className="latest-quote-header">
            <h3>latest quote</h3>
          </div>
          <div className="home-boxes-content">
            "{!loadedLatest && <img src={pqLogo} alt="Loading..." />}
            {latestQuote.quote}"
            <span>Created by : {latestQuote.createdBy}</span>
          </div>
        </div>
        <span className="line-divider"></span>
        <div className="news-box">
          <div className="news-header">
            <h3>news</h3>
          </div>
          <div className="home-boxes-content">
            Our first version is finally out! 
            <br />
            Check out more information in the 'about us' page.
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
