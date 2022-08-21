import axios from "axios";
import React, { useState } from "react";
import { API_KEY } from "../../logic";
import styles from "./Register.module.css";
import { Link } from "react-router-dom";

export default function Register({ setAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState("");
  const [wrongPass, setWrongPass] = useState(false);

  function signUp() {
    const URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
    axios
      .post(URL, {
        email,
        password,
      })
      .then((response) => {
        console.log(response);
        setAuth(response.data);
      })
      .catch((err) => {
        console.log(err);
        setError(err.response);
      });
  }

  function isValidPassword() {
    if (validPassword == password) {
      signUp();
    } else {
      setWrongPass(true);
      alert("password doesn't match!");
    }
  }

  const redirectToLogIn = <Link to="/Login">Sign In</Link>;

  return (
    <div>
      <form
        className={styles.registerform}
        onSubmit={(e) => {
          isValidPassword();
          e.preventDefault();
          e.target[0].value = "";
          e.target[1].value = "";
          e.target[2].value = "";
        }}
      >
        <div className={styles.registeruserInputs}>
          <h2>Sign up</h2>
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
          <input
            type="Password"
            placeholder="Confirm Password"
            onChange={(e) => {
              setValidPassword(e.target.value);
            }}
          />
        </div>
        <div className={styles.registerBtn}>
          <input type="submit" value="Register" />
        </div>
        <p>Already have an acount? {redirectToLogIn}</p>
      </form>
      {wrongPass ? (
        <p style={{ color: "red" }}>password doesn't match</p>
      ) : null}
    </div>
  );
}
