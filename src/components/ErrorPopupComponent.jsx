import "../style/errPopup.css";

const ErrorPopupComponent = (props) => {
  const editPopup = () => {
    props.setTrigger(false);
  };

  return props.trigger ? (
    <div className="err-popup" onClick={editPopup}>
      <div className="err-popup-inner">
        <div className="err-popup-children">{props.children}</div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default ErrorPopupComponent;
