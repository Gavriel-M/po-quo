import jwt from "jwt-decode";
import axios from "axios";

import "../style/style.css";
import "../style/mediaSpecifiedColors.css"
import "../style/quotes.css";
import { useEffect, useState } from "react";
import PopUpComponent from "./PopUpComponent";

const QuoteCardComponent = (props) => {
  const [likeButton, setLikeButton] = useState("");
  const [mtClassName, setMTClassName] = useState("");
  const [fontClassName, setFontClassName] = useState("");
  const [likeState, setLikeState] = useState("Like");
  const token = localStorage.getItem("tokenKey");
  const user = jwt(token);

  const [alreadyLiked, setAlreadyLiked] = useState("");
  const [likesAmount, setLikesAmount] = useState("");


  const [trigger, setTrigger] = useState(false);
  const [quote, setQuote] = useState("");
  const [keyedBy, setKeyedBy] = useState("");

  const [url, setUrl] = useState(`/quotes/like/${props.id}`);

  useEffect(() => {

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

/*   useEffect(() => {
    setRandomCircle("circle circle" + randomNum);
    setMatchingButton("expand button button-" + randomNum);
  }, [randomNum]); */

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

    axios
      .post(url)
      .then((res) => {
        if (res.data.status === "Liked") {
          setLikeState("Liked");
          setLikeButton("like-btn liked-quote");
        } else if (res.data.status === "Disliked") {
          setLikeState("Like");
          setLikeButton("like-btn like-quote");
        }
        setLikesAmount(res.data.likeCount);
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
              <a className="popup-content" href={props.link} target="_blank">
                {props.link}
              </a>
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
      </div>
    </div>
  );
};

export default QuoteCardComponent;
