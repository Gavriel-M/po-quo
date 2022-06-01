import "../style/popup.css";

const PopUpComponent = (props) => {

    const editPopup = () => {
      props.setTrigger(false);
      console.log(props);
    };

    return props.trigger ? (
      <div className="popup">
        <div className="popup-inner">
          <div className="popup-children">{props.children}</div>
          <button className="close-btn" onClick={editPopup}>
            CLOSE
          </button>
        </div>
      </div>
    ) : (
      ""
    );

}

export default PopUpComponent;