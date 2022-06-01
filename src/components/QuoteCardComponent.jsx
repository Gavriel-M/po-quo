import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import jwt from "jwt-decode";
import axios from "axios";

// import "./quoteCard2.css";
import "./style.css";
import "../style/mediaSpecifiedColors.css"
import "../style/quotes.css";
import { useEffect, useState } from "react";
import PopUpComponent from "./PopUpComponent";

const QuoteCardComponent = (props) => {
  const [randomCircle, setRandomCircle] = useState("");
  const [matchingButton, setMatchingButton] = useState("");
  const [likeButton, setLikeButton] = useState("");
  const [mtClassName, setMTClassName] = useState("");
  const [fontClassName, setFontClassName] = useState("");
  const [likeState, setLikeState] = useState("Like");
  const token = localStorage.getItem("tokenKey");
  const user = jwt(token);

  const [alreadyLiked, setAlreadyLiked] = useState("");
  const [likesAmount, setLikesAmount] = useState("");
  /* 
    const alreadyLiked = props.likes.find(
      (userWhoLiked) => userWhoLiked === userName
    ); */

  const [randomNum, setRandomNum] = useState(1);
  const [trigger, setTrigger] = useState(false);
  const [quote, setQuote] = useState("");
  const [keyedBy, setKeyedBy] = useState("");

  const [url, setUrl] = useState(`/quotes/like/${props.id}`);
  // const [alreadyLiked, setAlreadyLiked] = useState("");

  useEffect(() => {
    setRandomNum(Math.floor(Math.random() * 5) + 1);

    setAlreadyLiked(
      props.likes.find((userWhoLiked) => userWhoLiked == user.userName)
    );

    setLikesAmount(props.likes.length);
    setClassByMediaType(props.mediaType);
    setFont(props.language);
    setQuote(props.quote);
    setKeyedBy(props.keyedBy);
  }, []);

  useEffect(() => {
    handleLikeButtonStatus();
  }, [alreadyLiked]);

  useEffect(() => {
    setRandomCircle("circle circle" + randomNum);
    setMatchingButton("expand button button-" + randomNum);
  }, [randomNum]);

  const setFont = (language) => {
    switch (language) {
      case "japanese":
        setFontClassName("jap");
        break;
      case "hebrew":
        setFontClassName("heb");
        break;
      default:
        setFontClassName("eng");
    }
  };

  const setClassByMediaType = (mediaType) => {
    switch (mediaType) {
      case "music":
        setMTClassName("music-quote");
        break;
      case "video-games":
        setMTClassName("vg-quote");
        break;
      case "cinema-tv":
        setMTClassName("ctv-quote");
        break;
      case "proverbs":
        setMTClassName("proverbs-quote");
        break;
      case "literature":
        setMTClassName("literature-quote");
        break;
      default:
        setMTClassName("default-quote");
    }
  };

  const extendPopup = () => {
    setTrigger(true);
  };

  const handleLikeButtonStatus = () => {
    const userName = user.userName;

    if (alreadyLiked === userName) {
      setLikeState("Liked");
      return setLikeButton("like-btn liked-quote");
    } else {
      setLikeState("Like");
      return setLikeButton("like-btn like-quote");
    }
  };

  const handleLike = () => {
    // let url = `/quotes/like/${props.id}`

    axios
      .post(url /* , { params: { quoteId: props.id } } */)
      .then((res) => {
        if (res.data.status === "Liked") {
          setLikeState("Liked");
          setLikeButton("like-btn liked-quote");
        } else if (res.data.status === "Disliked") {
          setLikeState("Like");
          setLikeButton("like-btn like-quote");
        }
        setLikesAmount(res.data.likeCount);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {}, []);

  return (
    <div className={mtClassName}>
      <div className="quotes-box">
        <div className="keyed-by-header">
          <h2 className="keyed-by">{keyedBy}</h2>
        </div>
        <div className="quote-border">
          <h3 className={fontClassName}>"{quote}"</h3>
        </div>
        <button className="expand-btn" onClick={extendPopup}>
          Expand
        </button>

        <PopUpComponent trigger={trigger} setTrigger={setTrigger}>
          <div className="expand-quote-popup">
            <div className="expand-popup-header">
              <h2>More details</h2>
            </div>
            <div className="popup-row">
              <h4 className="popup-sec-header">Quote </h4>
              <span className="popup-content">{props.quote}</span>
            </div>
            <div className="popup-row">
              <h4 className="popup-sec-header">Keyed By </h4>
              <span className="popup-content">{props.keyedBy}</span>
            </div>
            <div className="popup-row">
              <h4 className="popup-sec-header">Quote link </h4>
              <span className="popup-content">{props.link}</span>
            </div>
            <div className="popup-row">
              <h4 className="popup-sec-header">Quote source </h4>
              <span className="popup-content">{props.source}</span>
            </div>
            <div className="popup-row">
              <h4 className="popup-sec-header">Media type</h4>

              <span className="popup-content">{props.mediaType}</span>
            </div>
            <div className="popup-row">
              <h4 className="popup-sec-header">Language </h4>
              <span className="popup-content">{props.language}</span>
            </div>
            <div className="popup-row">
              <h4 className="popup-sec-header">Uploaded by </h4>
              <span className="popup-content">{props.createdBy}</span>
            </div>
          </div>
        </PopUpComponent>

        <button type="button" className={likeButton} onClick={handleLike}>
          {likeState} {likesAmount}
        </button>

        {/* <div className={randomCircle}></div> */}
      </div>
    </div>
  );
};

export default QuoteCardComponent;

/* 
<div class="container">
  <div class="card">
    <div class="title">
      <h1>Umur Köse</h1>
      <h2>"Frontend Developer"</h2>
    </div>
    <div class="content">
      <div class="social">
        <i class="fab fa-codepen"></i>
        <a href="https://codepen.io/umurkose/" target="_blank">
          codepen.io/umurkose
        </a>
      </div>

      <div class="social">
        <i class="fab fa-linkedin"></i>
        <a href="https://www.linkedin.com/in/bada55-umurkose" target="_blank">
          linkedin.com/in/umurkose
        </a>
      </div>

      <div class="social">
        <i class="fas fa-globe-europe"></i>
        <a href="https://umurkose.com" target="_blank">
          umurkose.com
        </a>
      </div>
    </div>
    <div class="circle"></div>
  </div>
</div>;
 */

/* 

  return (
    <div className={randomColor}>
      <div className="quote_source">
        <a className="source_link" href={props.link} target="_blank">
          {props.source}
        </a>
      </div>
      <p className="media_type">{props.mediaType}</p>
      <h2 className="quote">{props.quote}</h2>
      <p className="extend_quote">
        <button className="card__link" onClick={extend}>
          Extend
        </button>
        <PopUpComponent trigger={trigger} setTrigger={setTrigger}>
          <h3>Quote details</h3>
          <h4>Quote : {props.quote}</h4>
          <h4>Keyed By : {props.keyedBy}</h4>
          <h4>Quote link : {props.link}</h4>
          <h4>Quote source : {props.source}</h4>
          <h4>Media type : {props.mediaType}</h4>
          <h4>Language : {props.language}</h4>
          <h4>Uploaded by : {props.createdBy}</h4>
        </PopUpComponent>
      </p>
    </div>
  ); */
