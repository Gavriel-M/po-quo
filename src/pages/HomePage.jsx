import pqimg from "../images/popular-quotes-trsp.png";
import mobileimg from "../images/popular-quotes-mobile.png";
import "../components/style.css";
import "../style/home.css";
import loadSvg from "../images/Loading.svg";

import popularImg from "../images/popular-home.png";
import quotesImg from "../images/quotes-home.png";
import homeSvg from "../images/home-vector.svg";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { latest } from "immer/dist/internal";

const HomePage = () => {
  const [latestQuote, setLatestQuote] = useState("");
  /*  */
  /*  */
  const [loadedLatest, setLoadedLatest] = useState(false);

  useEffect(() => {
    axios
      .get("/users/latestquote")
      .then((res) => {
        setLatestQuote(res.data[0].quote);
      })
      .catch((error) => {
        console.log("Error : ", error);
      });
  }, []);

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

        <div className="sign-up">
          <div className="blob-movement"></div>
          <NavLink to="/signup">
            <button className="sign-up-btn">sign-up</button>
          </NavLink>
        </div>
      </div>

      <div className="second-row">
        <div className="latest-quote-box">
          <div className="latest-quote-header">
            <h3>latest quote</h3>
          </div>
          <div className="latest-quote-content">
            {!loadedLatest && <img src={loadSvg} alt="Loading..." />}
            {latestQuote}
          </div>
        </div>
        <span className="line-divider"></span>
        <div className="news-box">
          <div className="news-header">
            <h3>news</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
