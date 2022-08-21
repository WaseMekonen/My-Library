import axios from "axios";
import "./Login.css";
import React from "react";
import { useState } from "react";
import { API_KEY } from "../../logic";
// import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function Login({ setAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const emailValid = JSON.parse(localStorage.getItem("email"));
  if (email == emailValid) {
    JSON.parse(localStorage.getItem("completdList"));
    JSON.parse(localStorage.getItem("readingList"));
  }

  function signIn() {
    const URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
    axios
      .post(URL, {
        email: email,
        password: password,
      })
      .then((response) => {
        setAuth(response.data);
      })
      .catch((err) => {
        setError(err);
      });
  }

  const redirectToRegister = <Link to="/Register">Register</Link>;

  return (
    <div>
      <form
        className="login"
        onSubmit={(e) => {
          e.preventDefault();
          signIn();
          e.target[0].value = "";
          e.target[1].value = "";
        }}
      >
        <div>
          <h2>Sign In</h2>
        </div>
        <div className="formInputs">
          <div className="formInputs-input">
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div>
            {error ? (
              <p style={{ color: "red" }}>Wrong password! try again</p>
            ) : (
              ""
            )}
          </div>
          <div>
            <input className="login-btn" type="submit" value="Log in" />
          </div>
        </div>
        <div></div>

        <div className="have-acount">
          Do not have an account? {redirectToRegister}{" "}
        </div>
      </form>
    </div>
  );
}
