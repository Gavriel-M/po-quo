import { useState, useEffect } from "react";

import updateUserSchema from "../validation/userupdate.validation";
import ErrorPopupComponent from "../components/ErrorPopupComponent";
import loadSvg from "../images/Loading.svg";
import axios from "axios";
import Joi from "joi-browser";
import "../style/style.css";
import "../style/profile.css";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [creatorAccount, setCreatorAccount] = useState(false);
  const [updatedCreatedAt, setUpdatedCreatedAt] = useState("");
const navigate = useNavigate();
  const [trigger, setTrigger] = useState(false);
  const [profileErr, setProfileErr] = useState("");

  useEffect(() => {
    axios
      .get("/users/userinfo")
      .then((res) => {
        setUserInfo(res.data);
      })
      .catch((error) => {
        setProfileErr("Server error : Please try to refresh the page.");
        setTrigger(true);
      });
  }, []);

  useEffect(() => {
    if (userInfo) {
      setLoaded(true);
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setUserName(userInfo.userName);
      setEmail(userInfo.email);
      setCreatorAccount(userInfo.creatorAccount);
      dateToString();
    }
  }, [userInfo]);


  const navWhenDone = () => {
    navigate("/quotes");
  };

  const dateToString = () => {
    let date = new Date(userInfo.createdAt);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }

    setUpdatedCreatedAt(`${day}/${month}/${year}`);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();

    setProfileErr("");

    const validatedValue = Joi.validate(
      {
        firstName,
        lastName,
        userName,
        email,
        creatorAccount,
      },
      updateUserSchema,
      { abortEarly: false }
    );

    const { error } = validatedValue;
    if (error) {
      switch (error.details[0].context.label) {
        case "firstName":
          setProfileErr("First name field must contain at least 2 characters");
          break;
        case "lastName":
          setProfileErr("Last name field must contain at least 2 characters");
          break;
        case "userName":
          setProfileErr("User name field must contain at least 2 characters");
          break;
        case "email":
          setProfileErr("Email field must be a valid email address");
          break;
      }
      setTrigger(true);
      return;
    } else {
      axios
        .put("/users/edituser", {
          firstName,
          lastName,
          userName,
          email,
          creatorAccount,
        })
        .then((res) => {
            setTimeout(navWhenDone, 2500);
        })
        .catch((err) => {
          setProfileErr("Server error : Please try again.");
          setTrigger(true);
        });
    }
  };

  const renderUserInfo = () => {
    return (
      <div className="profile-page">
        <div className="profile-box">
          <div className="profile-header">
            <h2>Profile Page</h2>
          </div>
          <form className="profile-form" onSubmit={handleOnSubmit}>
            <div className="profile-field">
              <label className="" htmlFor="firstName">
                First Name
              </label>

              <input
                type="text"
                id="firstName"
                className=""
                value={firstName}
                onChange={(event) => {
                  setFirstName(event.target.value);
                }}
              />
            </div>
            <div className="profile-field">
              <label className="" htmlFor="lastName">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className=""
                value={lastName}
                onChange={(event) => {
                  setLastName(event.target.value);
                }}
              />
            </div>
            <div className="profile-field">
              <label className="" htmlFor="userName">
                User Name
              </label>
              <input
                type="text"
                id="userName"
                className=""
                value={userName}
                onChange={(event) => {
                  setUserName(event.target.value);
                }}
              />
            </div>
            <div className="profile-field">
              <label className="" htmlFor="email">
                Email
              </label>
              <input
                type="text"
                id="email"
                className=""
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>
            <div className="created-at-field">
              <label className="">Created At : {updatedCreatedAt}</label>
            </div>

            <div className="profile-update-btn-container">
              <button className="profile-update-btn">Update</button>
            </div>
          </form>
        </div>
        <ErrorPopupComponent trigger={trigger} setTrigger={setTrigger}>
          {profileErr}
        </ErrorPopupComponent>
      </div>
    );
  };

  return (
    <div className="cust-container">
      {!loaded && <img src={loadSvg} alt="Loading..." />}
      {renderUserInfo()}
    </div>
  );
};

export default ProfilePage;
