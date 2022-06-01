import { useState } from "react";
import addImage from "../images/add-a-quote.png";
import quoteSchema from "../validation/quote.validation";
import Joi from "joi-browser";
import { useNavigate } from "react-router-dom";

import jwt from "jwt-decode";

/* import "../components/style.css"; */
import "../style/select.css";
import "../style/addQuote.css";
import axios from "axios";

const AddQuotePage = (props) => {
  const [keyedBy, setKeyedBy] = useState("");
  const [mediaType, setMediaType] = useState("Media type");
  const [source, setSource] = useState("");
  const [quote, setQuote] = useState("");
  const [link, setLink] = useState("");
  const [language, setLanguage] = useState("Language");
  const navigate = useNavigate();
  const token = localStorage.getItem("tokenKey");
  const user = jwt(token);

  // error
  const [mediaTypeErr, setMediaTypeErr] = useState("");
  const [languageErr, setLanguageErr] = useState("");
  const [quoteErr, setQuoteErr] = useState("");
  const [keyedByErr, setKeyedByErr] = useState("");
  const [linkErr, setLinkErr] = useState("");
  const [sourceErr, setSourceErr] = useState("");

  const handleKeyedBy = (event) => {
    setKeyedBy(event.target.value);
  };

  const handleMediaType = (event) => {
    setMediaType(event.target.value);
  };

  const handleLanguage = (event) => {
    setLanguage(event.target.value);
  };

  const handleSource = (event) => {
    setSource(event.target.value);
  };

  const handleQuote = (event) => {
    setQuote(event.target.value);
  };

  const handleLink = (event) => {
    setLink(event.target.value);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();

    setMediaTypeErr("");
    setLanguageErr("");
    setQuoteErr("");
    setLinkErr("");
    setSourceErr("");
    setKeyedByErr("");

    const createdBy = user.userName;

    if (mediaType === "Media type") {
      return setMediaTypeErr("please select the media type");
    }
    if (language === "Language") {
      return setLanguageErr("please select a language");
    }

    const validatedValue = Joi.validate(
      {
        quote,
        keyedBy,
        language,
        source,
        link,
        mediaType,
        createdBy,
      },
      quoteSchema,
      { abortEarly: false }
    );

    const { error } = validatedValue;
    if (error) {
      console.log(error.details);
      switch (error.details[0].context.label) {
        case "quote":
          setQuoteErr("Quote field must contain at least 2 characters");
          console.log("Quote field must contain at least 2 characters");
          break;
        case "keyedBy":
          setKeyedByErr("Keyed-by field is mendatory");
          console.log("Keyed-by field is mendatory");
          break;
        case "source":
          setSourceErr("Source field must contain at least 2 characters");
          console.log("Source field must contain at least 2 characters");
          break;
        case "link":
          setLinkErr("Link field is mendatory");
          console.log("Link field is mendatory");
          break;
      }
      return;
    } else {
      console.log("Joi ok");
      axios
        .post("/quotes/newquote", {
          quote,
          keyedBy,
          language,
          source,
          link,
          mediaType,
          createdBy,
        })
        .then((res) => {
          console.log("res", res.data.msg);
          console.log("res::", res.data);
          navigate("/quotes");
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data);
          }
        });
    }
  };

  return (
    <div className="add-quote-page">
      <div className="add-quote-box">
        <form className="add-quote-form" onSubmit={handleOnSubmit}>
          <div className="add-quote-header">
            <h2>Create a quote</h2>
          </div>
          <div className="add-quote-flex">
            <div className="add-quote-field">
              <label className="" htmlFor="quote">
                "Quote"
              </label>
              <input
                type="text"
                id="quote"
                className=""
                value={quote}
                onChange={handleQuote}
              />
              {quoteErr ? (
                <span className="cust-error">{quoteErr}</span>
              ) : (
                <br />
              )}
            </div>

            <div className="add-quote-field">
              {mediaTypeErr ? (
                <span className="cust-error">{mediaTypeErr}</span>
              ) : (
                <span>
                  <br />
                </span>
              )}
              <div className="box">
                <div className="select">
                  <select
                    name="mediaType"
                    id="format"
                    defaultValue={mediaType}
                    onChange={handleMediaType}
                  >
                    <option disabled>Media type</option>
                    <option value="music">Music</option>
                    <option value="video-games">Video Games</option>
                    <option value="cinema-tv">Cinema / TV</option>
                    <option value="proverbs">Proverbs</option>
                    <option value="literature">Literature</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="add-quote-field">
              {languageErr ? (
                <span className="cust-error">{languageErr}</span>
              ) : (
                <span>
                  <br />
                </span>
              )}

              <div className="box">
                <div className="select">
                  <select
                    name="format"
                    id="format"
                    defaultValue={language}
                    onChange={handleLanguage}
                    /* defaultValue={language} */
                  >
                    <option disabled>Language</option>
                    <option value="english">English</option>
                    <option value="japanese">Japanese</option>
                    <option value="hebrew">Hebrew</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="add-quote-field">
              <label className="" htmlFor="keyedBy">
                Keyed by
              </label>

              <input
                type="text"
                id="keyedBy"
                className=""
                value={keyedBy}
                onChange={handleKeyedBy}
              />
              {keyedByErr ? (
                <span className="cust-error">{keyedByErr}</span>
              ) : (
                <br />
              )}
            </div>

            <div className="add-quote-field">
              <label className="" htmlFor="source">
                Quote source
              </label>

              <input
                type="text"
                id="source"
                className=""
                value={source}
                onChange={handleSource}
              />
              {sourceErr ? (
                <span className="cust-error">{sourceErr}</span>
              ) : (
                <br />
              )}
            </div>

            <div className="add-quote-field">
              <label className="" htmlFor="link">
                Link to quote source
              </label>
              <input
                type="text"
                id="link"
                className=""
                value={link}
                onChange={handleLink}
              />
              {linkErr ? <span className="cust-error">{linkErr}</span> : <br />}
            </div>

            <div className="add-quote-btn-container">
              <button className="add-quote-btn">Add quote</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddQuotePage;

/* 

*/
