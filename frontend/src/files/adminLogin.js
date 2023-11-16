import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import trainImg from "./train2.jpg";
import "./files.css";

function AdminLogin(props) {
  const [user, setUser] = useState({
    email: "",
    Password: "",
  });

  function handleChange(event) {
    const newValue = event.target.value;
    const inputname = event.target.name;
    setUser((prevValue) => {
      if (inputname === "email") {
        return {
          email: newValue,
          Password: prevValue.Password,
        };
      } else {
        return {
          email: prevValue.email,
          Password: newValue,
        };
      }
    });
  }

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://192.168.106.194:5050/adminLogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      let res = await response.json();
      if(!res.success){
        alert("Login Failed");
      }
      else{
        sessionStorage.setItem("typeUser", "admin");
        sessionStorage.setItem("userID", res.userId);
        alert("Successfully Logged In");
        window.location.href = "/";
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login_page">
      <div className="login_main">
        <div className="train_image">
          <img src={trainImg} alt="Train"/>
        </div>
        <div className="login_input" style={{"margin":"auto"}}>
          <div>
            <h3>Admin Login</h3>
            <br />
            <form onSubmit={onSubmitForm}>
              <TextField
                sx={{ width: 319 }}
                required
                id="outlined-required"
                name="email"
                label="Email"
                value={user.email}
                onChange={handleChange}
                color="warning"
              />
              <br />
              <br />
              <TextField
                sx={{ width: 319 }}
                id="outlined-password-input"
                required
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={user.Password}
                onChange={handleChange}
                color="warning"
              />
              <br /> <br />
              <Button type="submit" variant="outlined" color="warning">
                Login
              </Button>
              <a style={{"margin" : "10px", "textDecoration" : "none", "color":"rgb(253, 135, 39)"}} href="/login">User Login</a>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
