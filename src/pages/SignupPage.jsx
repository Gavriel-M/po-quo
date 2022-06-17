import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import "../style/style.css";
import "../style/signup.css";

import axios from "axios";
import Joi from "joi-browser";

import signupSchema from "../validation/signup.validation";
import ErrorPopupComponent from "../components/ErrorPopupComponent";
import {logout } from "../store/authSlice";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setReapetPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [creatorAccount, setCreatorAccount] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const emailRef = useRef(null);

  const [signupErr, setSignupErr] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* 
  useEffect(() => {
    emailRef.current.focus();
  }, [emailRef]); */

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleRepeatPassword = (event) => {
    setReapetPassword(event.target.value);
  };

  const handleFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastName = (event) => {
    setLastName(event.target.value);
  };

  const handleUserName = (event) => {
    setUserName(event.target.value);
  };

  const handleCreatorAccount = () => {
    setCreatorAccount(!creatorAccount);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    setSignupErr("");

    const validatedValue = Joi.validate(
      {
        email,
        password,
        repeatPassword,
        firstName,
        lastName,
        userName,
        creatorAccount,
      },
      signupSchema,
      { abortEarly: false }
    );

    const { error } = validatedValue;
    if (error) {
      switch (error.details[0].context.label) {
        case "firstName":
          setSignupErr("Please enter a valid first name");
          break;
        case "lastName":
          setSignupErr("Please enter a valid last name");
          break;
        case "userName":
          setSignupErr("User name must contain at least 2 characters");
          break;
        case "email":
          setSignupErr("Invalid email address");
          break;
        case "password":
          setSignupErr(
            "Password must contain at least one lowercase character, uppercase character as well as a number. and be 8+ characters long"
          );
          break;
        case "repeatPassword":
          setSignupErr("The passwords does not match");
          break;
      }
      setTrigger(true);
      dispatch(logout());
    } else {
      console.log("Joi ok");
      axios
        .post("/users/register", {
          email,
          password,
          firstName,
          lastName,
          userName,
          creatorAccount,
        })
        .then((res) => {
          console.log(res.data.msg);
          navigate("/login", {
            state: {
              signupEmail: email,
              signupPassword: password,
            },
          });
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data);
          }
          setSignupErr("unknown error, Please try again.");
          setTrigger(true);
          localStorage.clear();
          dispatch(logout());
        });
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-box">
        <div className="signup-header">
          <h2>Sign up</h2>
        </div>
        <form onSubmit={handleOnSubmit} className="signup-form">
          <div className="left-column">
            <div className="signup-item">
              <label className="" htmlFor="firstName">
                First Name
              </label>

              <input
                type="text"
                id="firstName"
                className=""
                value={firstName}
                onChange={handleFirstName}
              />
            </div>
            <div className="signup-item">
              <label className="" htmlFor="lastName">
                Last Name
              </label>

              <input
                type="text"
                id="lastName"
                className=""
                value={lastName}
                onChange={handleLastName}
              />
            </div>
            <div className="signup-item">
              <label className="" htmlFor="userName">
                User Name
              </label>

              <input
                type="text"
                id="userName"
                className=""
                value={userName}
                onChange={handleUserName}
              />
            </div>
          </div>
          <div className="right-column">
            <div className="signup-item">
              <label className="" htmlFor="email">
                Your Email
              </label>

              <input
                ref={emailRef}
                type="email"
                id="email"
                className=""
                value={email}
                onChange={handleEmail}
              />
            </div>

            <div className="signup-item">
              <label className="" htmlFor="password">
                Password
              </label>

              <input
                type="password"
                id="password"
                className=""
                value={password}
                onChange={handlePassword}
              />
            </div>

            <div className="signup-item">
              <label className="" htmlFor="repeatPW">
                Repeat your password
              </label>

              <input
                type="password"
                id="repeatPW"
                className=""
                value={repeatPassword}
                onChange={handleRepeatPassword}
              />
            </div>
          </div>
          <div className="checkbox-container">
            <label className="creator-checkbox-label">
              <input
                className="creator-checkbox"
                type="checkbox"
                value={creatorAccount}
                onChange={handleCreatorAccount}
                id="form2Example3c"
              />
              Creator Account
            </label>
          </div>

          <div className="signup-btn-container">
            <button className="signup-btn">Sign-Up</button>
          </div>
        </form>
      </div>

      <ErrorPopupComponent trigger={trigger} setTrigger={setTrigger}>
        {signupErr}
      </ErrorPopupComponent>
    </div>
  );
};

export default SignupPage;
