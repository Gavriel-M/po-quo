import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";

import "../style/style.css";
import "../style/login.css"
import loginImg from "../images/login-transp.png";
import axios from "axios";
import Joi from "joi-browser";
import jwt from "jwt-decode";

import pqLogo from "../images/popular-quotes-mobile.png";

import loginSchema from "../validation/login.validation";
import { login, logout, updateToken } from "../store/authSlice";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [serverErr, setServerErr] = useState("");
  const emailRef = useRef(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const loggedInRedux = useSelector((state) => state.auth.loggedIn);
  const location = useLocation();

  useEffect(() => {
    console.log("Location hook : ", location);
    if (location.state) {
      if (location.state.signupEmail && location.state.signupPassword) {
        setEmail(location.state.signupEmail);
        setPassword(location.state.signupPassword);
      }
    }
  }, []);

  useEffect(() => {
    emailRef.current.focus();
  }, [emailRef]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    setEmailErr("");
    setPasswordErr("");
    const validateValue = Joi.validate({ email, password }, loginSchema, {
      abortEarly: false,
    });

    const { error } = validateValue;
    if (error) {
      dispatch(logout());
      if (error.details[0].path[0] === "email") {
        return setEmailErr("Invalid email");
      } else if (error.details[0].path[0] === "password") {
        return setPasswordErr("Invalid password");
      }

      let joiInvalidField = error.details[0].path[0];
      console.log(
        `${joiInvalidField} field does not follow the specified rules.`
      );
    } else {
      axios
        .post("/users/login", {
          email,
          password,
        })
        .then((res) => {
          const token = res.data.token;
          const user = jwt(token);
          dispatch(login());
          console.log("Logged in successfully! ", user);
          localStorage.clear();

          localStorage.setItem("tokenKey", token);
          if (location.state && location.state.previousPath) {
            navigate(location.state.previousPath);
          } else {
            navigate("/home");
          }
        })
        .catch((error) => {
          localStorage.clear();
          dispatch(logout());
          console.log("redux : ", loggedInRedux);
          if (!error.response) {
            return setServerErr("Email and password do not match");
          }
          if (error.response.data === "email") {
            return setEmailErr("Invalid email");
          } else if (error.response.data === "password") {
            return setPasswordErr("Invalid password");
          }
        });
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-header">
          <h2>log in</h2>
        </div>
        {serverErr ? (
          <span className="cust-error">{serverErr}</span>
        ) : (
          <span></span>
        )}
        <span className="side-line"></span>
        <form className="" onSubmit={handleOnSubmit}>
          <div className="email-row">
            <label className="email-label" htmlFor="emailInput">
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
              id="emailInput"
              className="email-input"
              value={email}
              onChange={handleEmailChange}
            />
          </div>

          <div className="password-row">
            <label className="password-label" htmlFor="passwordInput">
              Password
            </label>

            {passwordErr ? (
              <span className="cust-error"> {passwordErr}</span>
            ) : (
              <span></span>
            )}

            <input
              type="password"
              id="passwordInput"
              className="password-input"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>

          <div className="forgot-pw">
            <Link to="/forgotpassword" className="forgot-pw-link">
              Forgot password?
            </Link>
          </div>

          <div className="login-btn-container">
            <button className="login-btn">Log-in</button>
          </div>
        </form>
      </div>
      <div className="blob-container">
        <div className="blob"></div>
      </div>
    </div>
  );

};

export default LoginPage;
