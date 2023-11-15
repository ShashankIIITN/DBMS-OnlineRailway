import React from "react";
import ".././tickets.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function Tickets(props) {
    console.log(props)
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const months = {
        "01": "Jan",
        "02": "Feb",
        "03": "Mar",
        "04": "Apr",
        "05": "May",
        "06": "Jun",
        "07": "Jul",
        "08": "Aug",
        "09": "Sep",
        10: "Oct",
        11: "Nov",
        12: "Dec",
    };
    return (
        <div className="tickets-box">
            <div className="ticket-information">
                <div className="ticket-child">
                    <h3>{props.trainName}</h3>
                    <h3>{props.ticket.TrainID}</h3>
                    <h4>PNR: PNR{props.ticket.TicketID}</h4>
                    <h4>{props.ticket.NoOfPassenger} Passengers</h4>
                </div>
                <div className="ticket-child">
                    <h3>{props.ticket.SourceStation}</h3>
                    <h4>
                        {props.departureDate}{" "}
                        {months[props.departureDate]}
                    </h4>
                </div>
                <div className="ticket-child">
                    <h3>{props.ticket.DestinationStation}</h3>
                    <h4>{props.arrivalTime}</h4>
                    <h4>
                        {props.arrivalDate}{" "}
                        {months[props.arrivalDate]}
                    </h4>
                    {/* <h5>
                        {props.durationHours} Hrs {props.durationMinutes} Mins
                    </h5> */}
                    {/* <h5>Runs On</h5>
                    <h5>{props.runsOn}</h5> */}
                </div>
                <div className="ticket-child">
                    <h3>{props.ticket.Price} Rs</h3>
                    <h4>{props.ticket.ContactNo}</h4>
                    <h4>{props.ticket.Email}</h4>
                </div>
            </div>
            <div className="ticket-information-30">
                <Button variant="contained" style={{ backgroundColor: "#03A9F4" }}>
                    Print Ticket
                </Button>
            </div>

        </div>
    );
}

export default Tickets;
