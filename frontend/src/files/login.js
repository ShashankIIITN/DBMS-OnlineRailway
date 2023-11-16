import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import trainImg from "./train2.jpg";
import "./files1.css";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Login(props) {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
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
      const response = await fetch("http://localhost:5050/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      let res = await response.json();
      if (!res.success) {
        handleClick({
          vertical: 'bottom',
          horizontal: 'right',
        });
      } else {
        sessionStorage.setItem("typeUser", "user");
        sessionStorage.setItem("userID", res.userId);
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
          <img src={trainImg} alt="Train" />
        </div>
        <div className="login_input" style={{"margin":"auto"}}>
          <div>
            <h3>Login</h3>
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
              <a style={{"margin" : "10px", "textDecoration" : "none", "color":"rgb(253, 135, 39)"}} href="/adminLogin">Admin Login</a>
            </form>
          </div>
        </div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            Login Failed! Try Again.
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}

export default Login;
