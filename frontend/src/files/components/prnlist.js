import React, { useState } from "react";
import Tickets from "./newtic";
import ".././mybookings.css";

function PNRLst(props) {

    function showBookings(ticket) {
        return <Tickets ticket = {ticket[0]} />
    }
    
    return (
       props.Bookings &&  <div className="mybookings">
            <div className="mybookings-child"><h1>Your Bookings</h1></div>
            <div>
                {props.Bookings === null ? "Not Found" : <div>
                    <div className="information">
                        <div className="data">
                            <h3>Train Name</h3>
                        </div>
                        <div className="data">
                            <h3>Departure</h3>
                        </div>
                        <div className="data">
                            <h3>Destination</h3>
                        </div>
                        <div className="data">
                            <h3>User Info</h3>
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