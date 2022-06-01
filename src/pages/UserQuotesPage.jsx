import { useState, useRef, useEffect } from "react";

import QuoteRowComponent from "../components/QuoteRowComponent";
import loadSvg from "../images/Loading.svg";
import axios from "axios";

import "../components/userQuotes.css";
import "../style/userQuotes.css";

const UserQuotesPage = () => {
  const [quotesArr, setQuotesArr] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [dataChanged, setDataChanged] = useState(false);

  useEffect(() => {
    console.log("Did the data change? :", dataChanged);
  }, [dataChanged]);

  useEffect(() => {
    setLoaded(false);
    setQuotesArr([]);
    axios
      .get("/quotes/myquotes")
      .then((res) => {
        setQuotesArr(res.data);
      })
      .catch((error) => {
        console.log("Error : ", error);
        setQuotesArr([
          {
            keyedBy: "No quotes yet",
            quote: "",
            createdAt: 0,
          },
        ]);
      });
  }, [, dataChanged]);

  useEffect(() => {
    if (quotesArr.length > 0) {
      setLoaded(true);
    }
  }, [quotesArr]);

  const renderQuotesArr = (quote, index) => {
    return (
      <QuoteRowComponent
        quote={quote.quote}
        keyedBy={quote.keyedBy}
        language={quote.language}
        source={quote.source}
        link={quote.link}
        mediaType={quote.mediaType}
        createdBy={quote.createdBy}
        createdAt={quote.createdAt}
        key={index}
        index={index}
        id={quote._id}
        likes={quote.likes}
        setDataChanged={setDataChanged}
        dataChanged={dataChanged}
      />
    );
  };

  return (
    <div className="my-quotes-page">
      <div className="my-quotes-box">
        <div className="my-quotes-header">
          <h2>My quotes</h2>
        </div>
        <div className="my-quotes-flex">
          {!loaded && <img src={loadSvg} alt="Loading..." />}
          {quotesArr.map(renderQuotesArr)}
        </div>
      </div>
    </div>
  );
};

export default UserQuotesPage;
