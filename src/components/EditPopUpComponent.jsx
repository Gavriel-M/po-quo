import Joi from "joi-browser";
import { useState } from "react";
import quoteSchema from "../validation/quote.validation";
import axios from "axios";
import "../style/style.css";
import "../style/userQuotes.css";
import "../style/mediaSpecifiedColors.css";

const EditPopUpComponent = (props) => {
  const [quote, setQuote] = useState(props.quote);
  const [keyedBy, setKeyedBy] = useState(props.keyedBy);
  const [language, setLanguage] = useState(props.language);
  const [source, setSource] = useState(props.source);
  const [link, setLink] = useState(props.link);
  const [mediaType, setMediaType] = useState(props.mediaType);
  const [_id, set_id] = useState(props.id);
  const [url, setUrl] = useState(`/quotes/${props.id}`);
  const [deleteVerification, setDeleteVerification] = useState("");
  const [deleteErr, setDeleteErr] = useState("");

  const handleOnSubmit = (event) => {
    event.preventDefault();
    console.log(props.id);
    const validatedValue = Joi.validate(
      {
        quote,
        keyedBy,
        language,
        source,
        link,
        mediaType,
      },
      quoteSchema,
      { abortEarly: false }
    );

    const { error } = validatedValue;
    if (error) {
      return console.log(error);
    } else {
      console.log("Joi ok");
      axios
        .put(url, {
          quote,
          keyedBy,
          language,
          source,
          link,
          mediaType,
        })
        .then((res) => {
          console.log(res);
          props.setDataChanged(!props.dataChanged);
          props.setTrigger(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleOnDelete = (event) => {
    event.preventDefault();
    setDeleteErr("");
    const firstWord = quote.split(" ")[0];
    console.log(firstWord);
    if (deleteVerification == firstWord) {
      axios
        .delete(url)
        .then((res) => {
          if (res.data.deleted) {
            props.setDataChanged(!props.dataChanged);
            props.setTrigger(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Please enter the first word correctly");
      setDeleteErr("Please enter the first word correctly");
    }
  };

  return (
    <div className="edit-quote-body">
      <div className="edit-quote-header">
        <h3>Edit quote</h3>
      </div>
      <form className="edit-quote-form" onSubmit={handleOnSubmit}>
        <div className="edit-quote-field">
          <label className="" htmlFor="quote">
            Quote
          </label>
          <input
            type="text"
            id="quote"
            className=""
            value={quote}
            onChange={(event) => {
              setQuote(event.target.value);
            }}
          />
        </div>
        <div className="edit-quote-field">
          <label className="" htmlFor="keyedBy">
            Keyed By
          </label>
          <input
            type="text"
            id="keyedBy"
            className=""
            value={keyedBy}
            onChange={(event) => {
              setKeyedBy(event.target.value);
            }}
          />
        </div>
        <div className="edit-quote-field">
          <label className="" htmlFor="link">
            Link
          </label>
          <input
            type="text"
            id="link"
            className=""
            value={link}
            onChange={(event) => {
              setLink(event.target.value);
            }}
          />
        </div>
        <div className="edit-quote-field">
          <label className="" htmlFor="source">
            Source
          </label>
          <input
            type="text"
            id="source"
            className=""
            value={source}
            onChange={(event) => {
              setSource(event.target.value);
            }}
          />
        </div>
        <div className="edit-quote-field">
          <label className="" htmlFor="mediaType">
            Media type
          </label>
          <input
            type="text"
            id="mediaType"
            className=""
            value={mediaType}
            onChange={(event) => {
              setMediaType(event.target.value);
            }}
          />
        </div>
        <div className="edit-quote-field">
          <label className="" htmlFor="language">
            Language
          </label>
          <input
            type="text"
            id="language"
            className=""
            value={language}
            onChange={(event) => {
              setLanguage(event.target.value);
            }}
          />
        </div>
        <div className="edit-quote-field">
          <label className="">Created At : {props.createdAt}</label>
        </div>
        <div className="edit-quote-field">
          <label className="">Likes : {props.likes.length}</label>
        </div>
        <button className="edit-quote-update-btn">Update</button>
      </form>

      <form className="delete-quote-form" onSubmit={handleOnDelete}>
        <label className="delete-quote-label" htmlFor="delete">
          Enter the first word of the quote in order to delete it :
        </label>

        <input
          type="text"
          id="delete"
          className=""
          onChange={(event) => {
            setDeleteVerification(event.target.value);
          }}
        />
        {deleteErr ? (
          <span className="delete-quote-err">{deleteErr}</span>
        ) : (
          <span>
            <br />

          </span>
        )}

        <button className="delete-quote-btn">Delete</button>
      </form>
    </div>
  );
};

export default EditPopUpComponent;
