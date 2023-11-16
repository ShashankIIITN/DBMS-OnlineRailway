import React from "react";
import { useState } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import "./files.css";

function DeleteTrain() {
  const [trainId, setTrainId] = useState({trainId : ""});

  const deleteTrain = async () => {
    try {
        const response = await fetch("http://localhost:5050/deleteTrain", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(trainId),
        });
        let res = await response.json();
        console.log(res.success);
        if(res.success===true){
          alert("Train succesfully deleted.");
          window.location.href = "/allTrains";
        }
        else{
          alert("Train was not deleted.");
        }
      } catch (err) {
        console.log(err);
    }
    
  }


  const handleOnChange = (e) => {
    const v = e.target.value;
    setTrainId({trainId: v});
  };
  return (
    <div className="delete_train" style={{textAlign:"center"}}>
      <div className="delete_train_input">
        <h3>Delete Train</h3>
        <br />
        <TextField
          id="outlined-basic"
          label="Train ID"
          variant="outlined"
          onChange={handleOnChange}
          color="warning"
        />
        <br /> <br />
        <Button variant="outlined" onClick={deleteTrain} color="error">
          Delete Train
        </Button>
      </div>
    </div>
  );
};


export default DeleteTrain;
