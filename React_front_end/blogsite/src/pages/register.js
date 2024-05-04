import React, { useState } from "react";
import "./register.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
     e.preventDefault();
    fetch("http:localhost:4000/register", {
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
      method: "POST",
      body: { username: name, userpassword: password, useremail: email },
    }).then((response) => {
      if (!response.ok) {
        throw new Error("network response was not ok");
      }
      return response.json();
    })
    .then((data)=>{
        alert(data);
        console.log(data);
    })
    .catch((error)=>{
    console.log(error); 
    }
)
  }
  return (
    <div>
      <div className="container">
        <h2>Create an Account</h2>
        <form
          action="/register"
          method="post"
          id="registrationForm"
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="useremail"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="userpassword"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="username"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <button type="submit">Register</button>
          <h5>
            Already have an account.{" "}
            <a id="haveAccount" href="/login">
              Log in
            </a>
          </h5>
        </form>
      </div>
    </div>
  );
}
