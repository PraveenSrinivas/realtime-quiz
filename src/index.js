import React from "react";
import ReactDOM from "react-dom";
import firebase from "firebase/app";
import "firebase/analytics";
import { BrowserRouter } from "react-router-dom";

import "./index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const firebaseConfig = {
  apiKey: "AIzaSyDoZxWPlx5ih9NwhdgUpCLxqcT9tC4xkf8",
  authDomain: "travi-realtime-quiz.firebaseapp.com",
  databaseURL: "https://travi-realtime-quiz.firebaseio.com",
  projectId: "travi-realtime-quiz",
  storageBucket: "travi-realtime-quiz.appspot.com",
  messagingSenderId: "727240384685",
  appId: "1:727240384685:web:e9615083a7e896a98e2624",
  measurementId: "G-F8NH7CFBJR",
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
