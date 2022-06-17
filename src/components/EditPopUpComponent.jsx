import Joi from "joi-browser";
import { useState } from "react";
import quoteSchema from "../validation/quote.validation";
import ErrorPopupComponent from "./ErrorPopupComponent";
import axios from "axios";
import "../style/style.css";
import "../style/userQuotes.css";
import "../style/mediaSpecifiedColors.css";

const EditPopUpComponent = (props) => {
  const [quote, setQuote] = useState(props.quote);
  const [keyedBy, setKeyedBy] = useState(props.keyedBy);
  const [source, setSource] = useState(props.source);
  const [link, setLink] = useState(props.link);
  const [_id, set_id] = useState(props.id);
  const [url, setUrl] = useState(`/quotes/${props.id}`);
  const [deleteVerification, setDeleteVerification] = useState("");
  const [deleteErr, setDeleteErr] = useState("");

  const [errTrigger, setErrTrigger] = useState(false);
  const [editPopupErr, setEditPopupErr] = useState("");

  const handleOnSubmit = (event) => {
    event.preventDefault();
    setEditPopupErr("");

    const validatedValue = Joi.validate(
      {
        quote,
        keyedBy,
        source,
        link,
      },
      quoteSchema,
      { abortEarly: false }
    );

    const { error } = validatedValue;
    if (error) {
      switch (error.details[0].context.label) {
        case "quote":
          setEditPopupErr("Quote field must contain at least 2 characters");
          break;
        case "keyedBy":
          setEditPopupErr("Keyed-by field is mendatory");
          break;
        case "source":
          setEditPopupErr("Source field must contain at least 2 characters");
          break;
        case "link":
          setEditPopupErr("Link field is mendatory");
          break;
      }
      setErrTrigger(true);
      return;
    } else {
      axios
        .put(url, {
          quote,
          keyedBy,
          source,
          link,
        })
        .then((res) => {
          
          props.setDataChanged(!props.dataChanged);
          props.setTrigger(false);
        })
        .catch((err) => {
          setEditPopupErr(
            `Server error : Please try again.`
          );
          setErrTrigger(true);
        });
    }
  };

  const handleOnDelete = (event) => {
    event.preventDefault();
    setDeleteErr("");
    const firstWord = quote.split(" ")[0];
    
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

          setDeleteErr(`Server error : Please try again`);
        });
    } else {
      
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
      <ErrorPopupComponent trigger={errTrigger} setTrigger={setErrTrigger}>
        {editPopupErr}
      </ErrorPopupComponent>
    </div>
  );
};

export default EditPopUpComponent;
