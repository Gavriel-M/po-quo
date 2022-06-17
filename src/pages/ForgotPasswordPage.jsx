import { useState } from "react";
import emailSchema from "../validation/email.validation";
import Joi from "joi-browser";
import axios from "axios";
import "../style/forgotPassword.css";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [btnClickResponse, setBtnClickResponse] = useState("");
  const [joiErr, setJoiErr] = useState("");

  const navWhenDone = () => {
    navigate("/home");
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const validatedValue = Joi.validate(
      {
        email,
      },
      emailSchema,
      { abortEarly: false }
    );

    const { error } = validatedValue;
    if (error) {
      setJoiErr("Invalid email");
      return;
    } else {
      setBtnClickResponse("Email was sent successfully!");
      axios
        .post("/users/resetpassword", { email })
        .then((res) => {
          setTimeout(navWhenDone, 2500);
        })
        .catch((err) => {
          setTimeout(navWhenDone, 2500);
        });
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-box">
        <div className="forgot-password-header">
          <h3>Password Reset</h3>
        </div>

        <form onSubmit={handleOnSubmit} className="forgot-password-form">
          <label htmlFor="email" className="">
            Please enter your account's email in order to recieve a password
            reset link:
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />

          <div className="msg-container">
            {btnClickResponse ? (
              <span className="success-msg"> {btnClickResponse}</span>
            ) : (
              <span className="cust-error"> {joiErr}</span>
            )}
          </div>

          <div className="forgot-password-btn-container">
            <button type="submit" className="forgot-password-btn">
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
