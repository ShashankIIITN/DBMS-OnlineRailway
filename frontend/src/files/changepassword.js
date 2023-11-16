import React, {useState} from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import './files.css'

function ChangePassword() {
    let userID=sessionStorage.getItem("userID");
    const [passwords, setPasswords] = useState({
      userId: userID,
      newPassword: "",
      oldPassword: ""
    });

    const onSubmitForm = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch("http://localhost:5050/changePasswords", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(passwords),
        });
        let res = await response.json();
        console.log(res);
        if(!res.success){
          alert("Password Change Failed.");
        }
        else{
          alert("Password Changed Succesfully.");
          window.location.href = "/";
        }
      } catch (err) {
        console.log(err);
      }
    };

    function handleChange(event) {
      const newValue = event.target.value;
      const inputname = event.target.name;
      setPasswords((prevValue) => {
        if (inputname === "oldPassword") {
          return {
            userId: userID,
            oldPassword: newValue,
            newPassword: prevValue.newPassword,
          };
        } else {
          return {
            userId: userID,
            oldPassword: prevValue.oldPassword,
            newPassword: newValue,
          };
        }
      });
    }

    return (
        <div className="change_password" style={{color:"rgb(187, 43, 43)", textAlign:"center"}}>
        <div style={{border:"2px solid red", padding:"2%", boxShadow:"0px 0px 10px 7px #888888"}}>
        <h3>Change Password</h3>
            <br />
            <form onSubmit={onSubmitForm} >
              <TextField
                sx={{ width: 319 }}
                required
                id="outlined-required"
                name="oldPassword"
                label="Old Password"
                type="password"
                onChange={handleChange}
                color="warning"
              />
              <br />
              <br />
              <TextField
                sx={{ width: 319 }}
                id="outlined-password-input"
                required
                label="New Password"
                name="newPassword"
                type="password"
                autoComplete="current-password"
                onChange={handleChange} 
                color="warning"
              />
              <br /> <br />
              <Button type="submit" variant="outlined" color="warning">
                CHANGE PASSWORD
              </Button>
            </form>
        </div>
    </div>
    );
}

export default ChangePassword;