import React from "react";
import Button from "@mui/material/Button";
import "../files1.css";
import "./navbar.css";
import logo from ".././logo3.png";
import FadeMenu from "./matMenu";

function Navbar() {
  let typeUser = sessionStorage.getItem("typeUser");

  function logOut() {
    sessionStorage.setItem("typeUser", "");
    sessionStorage.removeItem("userID");
    window.location.href = "/";
  }

  return (
    <>
      <>
        {(typeUser === null || typeUser === "") && (
          <div className="navbar_main">
            <div className="iror">
              <h3>
                <a
                  href="/"
                  className="a-link"
                  style={{ textDecoration: "none" }}
                >
                  <img src={logo} className="tlogo"></img>
                </a>
              </h3>
            </div>
            <div className="nav_buttons_C">
              <div>
                <Button variant="outlined" color="success" href="./login">
                  LOGIN
                </Button>
              </div>
              <div>
                <Button variant="outlined" color="success" href="./register">
                  REGISTER
                </Button>
              </div>
            </div>
          </div>
        )}
      </>
      <>
        {typeUser === "user" && (
          <div className="navbar_main">
            <div className="iror">
              <h3>
                <a
                  href="/"
                  className="a-link"
                  style={{ textDecoration: "none" }}
                >
                  <img src={logo}></img>
                </a>
              </h3>
            </div>
            <div className="nav_buttons_C">
              <div>
                <Button onClick={logOut} variant="outlined" color="error">
                  LOGOUT
                </Button>
              </div>
              <FadeMenu type={typeUser} />
            </div>
          </div>
        )}
      </>
      <>
        {typeUser === "admin" && (
          <div className="navbar_main">
            <div className="iror">
              <h3>
                <a
                  href="/"
                  className="a-link"
                  style={{ textDecoration: "none" }}
                >
                  <img src={logo}></img>
                </a>
              </h3>
            </div>
            <div className="nav_buttons_C">
              <div>
                <Button onClick={logOut} variant="outlined" color="success">
                  LOGOUT
                </Button>
              </div>
              <FadeMenu type={typeUser} />
            </div>
          </div>
        )}
      </>
    </>
  );
}

export default Navbar;
