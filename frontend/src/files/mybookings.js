import React, {useState} from "react";
import Tickets from "./Tickets.jsx";
import "./mybookings.css";

function Mybookings () {
    const [bookings, setBookings] = useState([]);
    function showBookings(ticket) {
        return <Tickets props={ ticket }/>;
    }

    const getTickets = async () => {
        let userId = {id: sessionStorage.getItem("userID")};

        console.log(userId);
        try {
            const response = await fetch("http://localhost:5050/getBookings", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(userId),
            });
            let res = await response.json();
            console.log(res);
            setBookings(res);
            //console.log(bookings);
          } catch (err) {
            console.log(err);
        }
    }

    React.useEffect(() => {
        getTickets();
    }, []);


    return (
        <div className="mybookings">
            <div className="mybookings-child"><h2>Your Bookings</h2></div>
            <div >
                { bookings.lenght===0 ? " " : <div >
                    <div className="information" style={{border:"none", textAlign:"center", backgroundColor:"#888"}}>
                      <div className="data">
                        <h4>Train Name</h4>
                      </div>
                      <div className="data">
                        <h4>Departure</h4>
                      </div>
                      <div className="data">
                        <h4>Duration</h4>
                      </div>
                      <div className="data">
                        <h4>Arrival</h4>
                      </div>
                    </div>
                    </div>
                }
                {bookings.map(showBookings)}
            </div>
        </div>
    );
}

export default Mybookings;