import React, { useState } from "react";

import "../files1.css";
import "./trainsearch.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Schedule from "../Schedule";
function Trainsearch() {
  const [ID, setID] = useState({
    tID: "",
  });

  const [flag, setFlag] = useState(false);

  const [trainSchedule, setTrainSchedule] = useState([]);
  let sNo=0;
  function showSchedule(station) {
    sNo++;
    station.sNo=sNo;
    return <Schedule props={ station }/>;
  }

  function handleChange(event) {
    const newValue = event.target.value;
    setID((prevValue) => {
      return {
        tID: newValue,
      };
    });
  }

  const onSubmitForm = async (e) => {
    e.preventDefault();
    console.log(ID);
    try {
      const response = await fetch("http://192.168.106.194:5050/getRoute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ID),
      });
      let res = await response.json();
      setTrainSchedule((prevValue) => {
        return res;
      });
      setFlag(true);
      console.log(trainSchedule);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="trainsearch">
      <div className="flex-child" style={{margin:"auto", textAlign:"center", backgroundColor:"rgba(0, 0, 0, 0.34)", padding:"1%", borderRadius:"10px"}}>
        <h2>Search Train</h2>
        <form onSubmit={onSubmitForm} >
          <div className="search-for-flex" >
            <div className="search-for-flex-child-1">
              <TextField 
                className="white-button"
                required
                id="outlined-required"
                label="Train Number"
                onChange={handleChange}
                color="warning"
                sx={{width:"250px"}}
              />
            </div>
            <div className="search-for-flex-child-3">
              <Button style={{ width: 100 }} type="sumbit" variant="contained" color="success">
                FIND
              </Button>
            </div>
          </div>
        </form>
      </div>
      <div className="flex-child margin-10-10">
          {flag === false ? (
            " "
          ) : (
            <div>
              {trainSchedule.flag === false ? (
                <div className="margin-10-10">"No Result found"</div>
              ) : (
                <div className="trainSchedule margin-10-10">
                  <span className="H1"><h1>Train Schedule</h1></span>
                  <div className="info">
                      <div>
                          <h3>Train Number</h3>
                          <p>{trainSchedule.trainId}</p>
                      </div>
                      <div>
                          <h3>Train Name</h3>
                          <p>{trainSchedule.trainName}</p>   
                      </div>
                      <div>
                          <h3>Start Station</h3>
                          <p>{trainSchedule.startStation}</p>
                      </div>
                      <div>
                          <h3>Destination Station</h3>
                          <p>{trainSchedule.destinationStation}</p>
                      </div>
                      <div>
                          <h3>Runs On</h3>
                          <p>{trainSchedule.runsOn}</p>
                      </div>
                  </div>
                  <div className="margin-10-10">
                      <table className="content">
                          <thead>
                              <tr>
                                  <th>Serial No.</th>
                                  <th>Station Name</th>
                                  <th>Arrival Time</th>
                                  <th>Departure Time</th>
                              </tr>
                          </thead>
                          <tbody>
                              {trainSchedule.stations.map(showSchedule)}  
                          </tbody>
                      </table>
                  </div>
              </div>
                // <div>
                //   {trainSchedule.statio  ns.map(showSchedule)}
                // </div>
              )}
            </div>
          )}
        </div>
    </div>
  );
}

export default Trainsearch;
