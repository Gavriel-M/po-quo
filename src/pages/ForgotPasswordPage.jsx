import { useState, useRef, useEffect } from "react";
import emailSchema from "../validation/email.validation";
import Joi from "joi-browser";
import axios from "axios";
import "../style/custom.css";
import "../style/forgotPassword.css";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
    const [btnClickResponse, setBtnClickResponse] = useState("");
    const [joiErr, setJoiErr] = useState("");

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
      setJoiErr("Invalid email")
      return console.error(error);
    } else {
      setBtnClickResponse("Email was sent successfully!");
      console.log("Joi ok");
      axios
        .post("/users/resetpassword", { email })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.error(err);
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
            readonly
            className=" "
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
