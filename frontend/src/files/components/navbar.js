import React from "react";
import Button from "@mui/material/Button";
import "../files1.css";
import "./navbar.css";
import logo from "./logo3.png";

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
                  <img src={logo}></img>
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
              <a
                href="./changepassword"
                className="a-link margin-auto"
                style={{ textDecoration: "none" }}
              >
                <div>Change Password</div>
              </a>
              <a
                href="./mybookings"
                className="a-link margin-auto"
                style={{ textDecoration: "none" }}
              >
                <div>Bookings</div>
              </a>
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
                <Button onClick={logOut} variant="outlined">
                  LOGOUT
                </Button>
              </div>
              <a href="/allBookings" className="a-link margin-auto" style={{ textDecoration: "none" }}>
                <div>View All Bookings</div>
              </a>
              <a href="/allTrains" className="a-link margin-auto" style={{ textDecoration: "none" }}>
                <div>View All Trains</div>
              </a>
              <a href="/deleteTrain" className="a-link margin-auto" style={{ textDecoration: "none" }}>
                <div>Delete Train</div>
              </a>
              <a href="/addTrain" className="a-link margin-auto" style={{ textDecoration: "none" }}>
                <div>Add Train</div>
              </a>
            </div>
          </div>
        )}
      </>
    </>
  );
}

export default Navbar;
