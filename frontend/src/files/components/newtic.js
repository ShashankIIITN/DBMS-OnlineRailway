import React, { useRef } from "react";
import ".././tickets.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useReactToPrint } from "react-to-print";

function Tickets(props) {
    console.log("props", props)
    const [open, setOpen] = React.useState(false);
    const compReff = useRef(null)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handlePrint = useReactToPrint({
        content: () => compReff.current
        ,
        documentTitle: "SunTic" + props.ticketId,
        onAfterPrint: () => alert("Print Success!")

    })

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
        <>
            <div className="tickets-box" >
                <div className="ticket-information">
                    <div className="ticket-child">
                        <h4>{props.trainName}</h4>
                        <h5>Train Id: {props.ticket.TrainID}</h5>
                        <h5>PNR: {props.ticket.TicketID}</h5>
                        {/* <h5>{props.ticket.NoOfPassenger} Passengers</h5> */}
                        {/* <h5 style={{}}>Passenger ID {props.ticket.PassengerID }</h5> */}
                    </div>
                    <div className="ticket-child">
                        <h4>{props.ticket.SourceStation}</h4>
                        <h5>
                            {props.departureDate}{" "}
                            {months[props.departureDate]}
                        </h5>
                    </div>
                    <div className="ticket-child">
                        <h4>{props.ticket.DestinationStation}</h4>
                        <h5>{props.arrivalTime}</h5>
                        <h5>
                            {props.arrivalDate}{" "}
                            {months[props.arrivalDate]}
                        </h5>
                        {/* <h5>
                        {props.durationHours} Hrs {props.durationMinutes} Mins
                    </h5> */}
                        {/* <h5>Runs On</h5>
                    <h5>{props.runsOn}</h5> */}
                    </div>
                    <div className="ticket-child">
                        <h4>{props.ticket.Name}</h4>
                    </div>
                    {/* <div className="ticket-child">
                    <h5>{props.ticket.ContactNo}</h5>
                    <h5>{props.ticket.Email}</h5>
                </div> */}
                    <div className="ticket-child">
                        {(props.ticket.Status == "C") ? <h5 style={{ color: 'green' }}>CNF</h5> : <h5 style={{ color: 'red' }}>WL</h5>}
                    </div>
                </div>
                <div className="ticket-information-30">
                    <Button variant="contained" color="success" onClick={handlePrint}>
                        Print Status
                    </Button>
                </div>

            </div>
            <div style={{display:"none", textAlign:"center"}}>

                <div className="tickets-box" ref={compReff} style={{ textAlign:"center"}}>
                    <h1>Sunset Railways</h1>
                    <h4>PNR STATUS</h4>
                    <div className="ticket-information">
                        <div className="ticket-child">
                            <h4>{props.trainName}</h4>
                            <h5>Train Id: {props.ticket.TrainID}</h5>
                            <h5>PNR: {props.ticket.TicketID}</h5>
                            {/* <h5>{props.ticket.NoOfPassenger} Passengers</h5> */}
                            {/* <h5 style={{}}>Passenger ID {props.ticket.PassengerID }</h5> */}
                        </div>
                        <div className="ticket-child">
                            <h4>{props.ticket.SourceStation}</h4>
                            <h5>
                                {props.departureDate}{" "}
                                {months[props.departureDate]}
                            </h5>
                        </div>
                        <div className="ticket-child">
                            <h4>{props.ticket.DestinationStation}</h4>
                            <h5>{props.arrivalTime}</h5>
                            <h5>
                                {props.arrivalDate}{" "}
                                {months[props.arrivalDate]}
                            </h5>
                            {/* <h5>
                        {props.durationHours} Hrs {props.durationMinutes} Mins
                    </h5> */}
                            {/* <h5>Runs On</h5>
                    <h5>{props.runsOn}</h5> */}
                        </div>
                        <div className="ticket-child">
                            <h4>{props.ticket.Name}</h4>
                        </div>
                        {/* <div className="ticket-child">
                    <h5>{props.ticket.ContactNo}</h5>
                    <h5>{props.ticket.Email}</h5>
                </div> */}
                        <div className="ticket-child">
                            {(props.ticket.Status == "C") ? <h5 style={{ color: 'green' }}>CNF</h5> : <h5 style={{ color: 'red' }}>WL</h5>}
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Tickets;
