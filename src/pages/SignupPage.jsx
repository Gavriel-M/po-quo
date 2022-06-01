import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import "../components/style.css";
import "../style/signup.css";
import signupImg from "../images/signup-transp.png";

import axios from "axios";
import Joi from "joi-browser";

import pqLogo from "../images/transp-po-quo.png";

import signupSchema from "../validation/signup.validation";
import { login, logout, updateToken } from "../store/authSlice";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setReapetPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [creatorAccount, setCreatorAccount] = useState(false);
  const emailRef = useRef(null);

  //errors

  const [firstNameErr, setFirstNameErr] = useState("");
  const [lastNameErr, setLastNameErr] = useState("");
  const [userNameErr, setUserNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [repeatPWErr, setRepeatPWErr] = useState("");

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

    setFirstNameErr("");
    setLastNameErr("");
    setUserNameErr("");
    setEmailErr("");
    setPasswordErr("");
    setRepeatPWErr("");

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
          setFirstNameErr("Please enter a valid name");
          console.log("Please enter a valid name");
          break;
        case "lastName":
          setLastNameErr("Please enter a valid name");
          console.log("Please enter a valid name");
          break;
        case "userName":
          setUserNameErr("User name must contain at least 2 characters");
          console.log("User name must contain at least 2 characters");
          break;
        case "email":
          setEmailErr("Invalid email address");
          console.log("Invalid email address");
          break;
        case "password":
          setPasswordErr(
            "Password must contain both lowercase and uppercase letters, as well as a number. and be at least 8 characters long"
          );
          console.log(
            "Password must contain both lowercase and uppercase letters, as well as a number. and be at least 8 characters long"
          );
          break;
        case "repeatPassword":
          setRepeatPWErr("The password does not match");
          console.log("The password does not match");
          break;
      }
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
          {/* <span className="vertical-line"></span> */}
          <div className="left-column">
            <div className="signup-item">
              <label className="" htmlFor="firstName">
                First Name
              </label>

              {firstNameErr ? (
                <span className="cust-error">{firstNameErr}</span>
              ) : (
                <span></span>
              )}
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

              {lastNameErr ? (
                <span className="cust-error">{lastNameErr}</span>
              ) : (
                <span></span>
              )}
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

              {userNameErr ? (
                <span className="cust-error">{userNameErr}</span>
              ) : (
                <span></span>
              )}
              <input
                type="text"
                id="userName"
                className=""
                value={userName}
                onChange={handleUserName}
              />
            </div>
          </div>
          {/* <span className="vertical-line"></span> */}
          <div className="right-column">
            <div className="signup-item">
              <label className="" htmlFor="email">
                Your Email
              </label>

              {emailErr ? (
                <span className="cust-error">{emailErr}</span>
              ) : (
                <span></span>
              )}
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
              {passwordErr ? (
                <span className="cust-error">{passwordErr}</span>
              ) : (
                <span></span>
              )}
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

              {repeatPWErr ? (
                <span className="cust-error">{repeatPWErr}</span>
              ) : (
                <span></span>
              )}
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
    </div>
  );
};

export default SignupPage;
