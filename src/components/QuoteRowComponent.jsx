import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import "../style/userQuotes.css";
import "../style/editQuotePopup.css"
import "../style/mediaSpecifiedColors.css"

import { useEffect, useState } from "react";
import PopUpComponent from "./PopUpComponent";
import EditPopUpComponent from "./EditPopUpComponent";


const QuoteRowComponent = (props) => {
  const [updatedQuote, setUpdatedQuote] = useState("");
  const [updatedKeyedBy, setUpdatedKeyedBy] = useState("");
  const [updatedCreatedAt, setUpdatedCreatedAt] = useState("");
  const [mtClassName, setMTClassName] = useState("user-quote-box");
/*   const [updatedLanguage, setUpdatedLanguage] = useState("");
  const [updatedSource, setUpdatedSource] = useState("");
  const [updatedLink, setUpdatedLink] = useState("");
  const [updatedMediaType, setUpdatedMediaType] = useState(""); */

    
    const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    setUpdatedQuote(props.quote);
    setUpdatedKeyedBy(props.keyedBy);
    setClassByMediaType(props.mediaType);
    /* setUpdatedQuote(handleStringLength(props.quote, 50));
    setUpdatedKeyedBy(handleStringLength(props.keyedBy, 25)); */
    dateToString();
  }, []);


  
  const setClassByMediaType = (mediaType) => {
    switch (mediaType) {
      case "music":
        setMTClassName("user-quote-box music-quote");
        break;
      case "video-games":
        setMTClassName("user-quote-box vg-quote");
        break;
      case "cinema-tv":
        setMTClassName("user-quote-box ctv-quote");
        break;
      case "proverbs":
        setMTClassName("user-quote-box proverbs-quote");
        break;
      case "literature":
        setMTClassName("user-quote-box literature-quote");
        break;
      default:
        setMTClassName("user-quote-box default-quote");
    }
  };


  const dateToString = () => {
    let date = new Date(props.createdAt);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }

    setUpdatedCreatedAt(`${day}/${month}/${year}`);
  };

  const handleStringLength = (string, limit) => {
    if (string.length > limit) {
      let result = string.slice(0, limit);
      result = result + "...";
      return result;
    }
    return string;
  };

  const editPopup = () => {

        setTrigger(true);
  }

  return (
    <div className={mtClassName}>
      <div className="user-quote-header" data-title="">
        <h3>{updatedKeyedBy}</h3>
      </div>
      <div className="user-quote-flex" data-title="Keyed by">
        <div className="created-at">
          <h4>Created at : {updatedCreatedAt}</h4>
        </div>
        <div className="user-quote-container">
          <h4>Quote : {updatedQuote}</h4>
        </div>
      </div>

      <button className="user-quote-edit-btn" onClick={editPopup}>
        Edit
      </button>

      <PopUpComponent trigger={trigger} setTrigger={setTrigger}>
        <EditPopUpComponent
          quote={props.quote}
          keyedBy={props.keyedBy}
          language={props.language}
          source={props.source}
          link={props.link}
          mediaType={props.mediaType}
          createdBy={props.createdBy}
          createdAt={updatedCreatedAt}
          key={props.index}
          index={props.index}
          id={props.id}
          likes={props.likes}
          setTrigger={setTrigger}
          setDataChanged={props.setDataChanged}
          dataChanged={props.dataChanged}
        />
      </PopUpComponent>
    </div>
  );
};

export default QuoteRowComponent;
/* 

 <tr>
   <td scope="row" data-label="#">
     {props.index + 1}
   </td>
   <td data-label="Keyed by">{updatedKeyedBy}</td>
   <td data-label="Quote">
     <p className="word-wrap2">{updatedQuote}</p>
   </td>
   <td data-label="Upload date">{props.createdAt}</td>
 </tr>; */
