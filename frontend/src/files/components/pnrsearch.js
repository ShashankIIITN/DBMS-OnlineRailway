import React, { useState, useRef } from "react";
import "../files.css";
import "./pnrsearch.css";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PNRLst from "./prnlist";

function Pnrsearch() {
  const reff = useRef(null)

  const [Bookings, setBookings] = useState(null)
  const getTickets = async (e) => {
    e.preventDefault();
    const pr = reff.current.value;

    console.log(pr)
    let userId = { id: sessionStorage.getItem("userID") };

    console.log(userId);
    try {
      const response = await fetch("http://localhost:5050/getPNR", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tid: pr }),
      });
      let res = await response.json();
      console.log(res.length);
      if (res.length == 0) {
        setBookings(null)
      } else {

        setBookings(res);
      }
      //console.log(bookings);
    } catch (err) {
      console.log(err);
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    getTickets(e)
  }

  // const handleChange =(e)=>{
  //   e.preventDefault();
  //   const val  = e.target.value;
  //   setpnr(()=>{
  //     return parseInt(val);
  //   })

  // }
  return (
    <div className="pnrsearch">
      <div className="flex-child" style={{margin:"auto", textAlign:"center"}}>
        <h2>Find My PNR</h2>
        <form onSubmit={handleSubmit}>
          <div className="pnr-for-flex">
            <div className="pnr-for-flex-child-1">
              <TextField required id="outlined-required" label="PNR Enquiry" inputRef={reff}  color="warning" sx={{width:"200px"}}/>
            </div>
            <div className="pnr-for-flex-child-3">
              <Button style={{ width: 100 }} type="submit" variant="contained" color="success">
                ENQUIRE
              </Button>
            </div>
          </div>
        </form>
      </div>
      <div className="flex-child" style={{margin:"auto", textAlign:"center"}}>{Bookings !== null ? <PNRLst Bookings={Bookings} /> : "Not Found"}</div>
    </div>
  );
}

export default Pnrsearch;
