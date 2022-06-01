import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { login, logout, updateToken } from "./store/authSlice";


import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";

import store from "./store/store";

import axios from "axios";

axios.defaults.baseURL = "http://localhost:8181/api";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("tokenKey");
  if (token) {
    config.headers["token"] = token;
  }
  config.headers["Content-Type"] = "application/json";
  return config;
});

axios.interceptors.response.use((res) => res, (err) => {
  console.log("err = ", err.response);
  if(err.response.status === 503){
    store.dispatch(logout());
    throw "Token has expired";
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
