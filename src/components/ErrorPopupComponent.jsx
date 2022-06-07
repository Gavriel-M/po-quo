import "../style/errPopup.css";

const ErrorPopupComponent = (props) => {
  const editPopup = () => {
    props.setTrigger(false);
    console.log(props);
  };

  return props.trigger ? (
    <div className="err-popup" onClick={editPopup}>
      <div className="err-popup-inner">
        <div className="err-popup-children">{props.children}</div>
        {/* <button className="err-close-btn" onClick={editPopup}>
          CLOSE
        </button> */}
      </div>
    </div>
  ) : (
    ""
  );
};

export default ErrorPopupComponent;
