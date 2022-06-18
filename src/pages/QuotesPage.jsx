import { useState, useEffect } from "react";
import QuoteCardComponent from "../components/QuoteCardComponent";

import loadSvg from "../images/Loading.svg";
import axios from "axios";
import "../style/quotes.css";

const QuotesPage = () => {
  const [quotesArr, setQuotesArr] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .get("/quotes/allquotes")
      .then((res) => {
        setQuotesArr(res.data.reverse());
      })
      .catch((error) => {
        setQuotesArr([
          
          {
            _id: "404",
            quote: "Server error : Please try to refresh the page.",
            keyedBy: "Server Error!",
            language: "Error",
            source: "Server",
            link: "Please refresh the page",
            mediaType: "Error",
            createdBy: "Admin",
            likes: [],
            createdAt: "The dawn of time.",
            __v: 0,
          },
        ]);
      });
  }, []);

  useEffect(() => {
    if (quotesArr.length > 0) {
      setLoaded(true);
    }
  }, [quotesArr]);

  const renderQuotesArr = (quote) => {
    return (
      <QuoteCardComponent
        quote={quote.quote}
        keyedBy={quote.keyedBy}
        language={quote.language}
        source={quote.source}
        link={quote.link}
        mediaType={quote.mediaType}
        createdBy={quote.createdBy}
        createdAt={quote.createdAt}
        key={quote._id}
        id={quote._id}
        likes={quote.likes}
      />
    );
  };

  return (
    <div className="quotes-page">
      <div className="quotes-flex">
        {!loaded && <img src={loadSvg} alt="Loading..." />}
        {quotesArr.map(renderQuotesArr)}
      </div>
    </div>
  );
};

export default QuotesPage;
