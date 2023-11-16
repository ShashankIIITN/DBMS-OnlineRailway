import React from "react";
import "./Details.css";
import Button from '@mui/material/Button';
import {createSearchParams , useNavigate} from "react-router-dom";
function Details(props) {
    props=props.props;
    const months={"01": "Jan","02": "Feb","03": "Mar","04": "Apr","05": "May","06": "Jun","07": "Jul","08": "Aug","09": "Sep","10": "Oct","11": "Nov","12": "Dec"};
    const navigate=useNavigate();
    const bookTicket = (id) => {
        navigate({
            pathname: "/pd",
            search: createSearchParams({
                id : props.trainid,
                remainingSeats: props.remainingSeats,
                departure: props.departure,
                arrival: props.arrival,
                routeId: props.routeId,
                price: props.price
            }).toString()
        });
    };

    return (
        <div className="trainDetails">

            <div>
                <div className="information"> 
                    <div className="box">
                        <h4>{props.trainName}</h4>
                        <h4>{props.trainid}</h4>
                        <h5 style={{color: '#4CAF50'}}>{props.remainingSeats} Left <span style={{color:'red'}}>{props.WSeats} Waiting</span></h5>
                        <div style={{display: 'flex', gap: 30}}>
                            <Button onClick={bookTicket} variant="outlined" color="success">Book</Button>
                            <h4 style={{color: 'grey'}}>₹{props.price}</h4>
                        </div>
                    </div>
                    <div className="box">
                        <h4>{props.departure}</h4>
                        <h5>{props.departureTime}</h5>
                        <h5>{ props.departureDate } {months[props.departureDate]}</h5>
                    </div>
                    <div className="box">
                        <h5>{props.durationHours} Hrs {props.durationMinutes} Mins</h5>
                        <h5>Runs On</h5>
                        <h5>{props.runsOn}</h5>
                    </div>
                    <div className="box">
                        <h4>{props.arrival}</h4>
                        <h5>{props.arrivalTime}</h5>
                        <h5>{ props.arrivalDate } {months[props.arrivalDate]}</h5>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Details;