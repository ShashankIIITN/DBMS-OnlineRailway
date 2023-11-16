import React, { useState } from "react";
import Tickets from "./newtic";
import ".././mybookings.css";

function PNRLst(props) {

    function showBookings(ticket) {
        return <Tickets ticket = {ticket[0]} />
    }
    
    return (
       props.Bookings &&  <div className="mybookings">
            <div className="mybookings-child"><h2>Your Bookings</h2></div>
            <div>
                {props.Bookings === null ? "Not Found" : <div>
                    <div className="information" style={{width:"110%"}}>
                        <div className="data">
                            <h4>Train Name</h4>
                        </div>
                        <div className="data">
                            <h4>Departure</h4>
                        </div>
                        <div className="data">
                            <h4>Destination</h4>
                        </div>
                        <div className="data">
                            <h4>User Info</h4>
                        </div>
                    </div>
                </div>
                }
                {props.Bookings && showBookings(props.Bookings)}
            </div>
        </div>
    );
}

export default PNRLst;