const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
  })
  .promise();
console.log(process.env.PASSWORD);

const register = async (fname, lname, email, contact, password) => {
  try {
    const [data] = await pool.query(
      `INSERT INTO users (FirstName, LastName, Email, ContactNo, Password) VALUES (?, ?, ?, ?, ?)`,
      [fname, lname, email, contact, password]
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

const authenticate = async (email, password) => {
  try {
    const [data] = await pool.query(
      `SELECT * FROM users WHERE Email = ? AND Password = ?`,
      [email, password]
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

const authenticateAdmin = async (email, password) => {
  try {
    const [data] = await pool.query(
      `SELECT * FROM Admins WHERE AdminEmail = ? AND Password = ?`,
      [email, password]
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

const changePassword = async (userID, oldPassword, newPassword) => {
  try {
    const [data] = await pool.query(
      `UPDATE users SET Password = ? WHERE PASSWORD = ? AND UserID = ?`,
      [newPassword, oldPassword, userID]
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getMaxRouteID = async () => {
  try {
    const [data] = await pool.query("SELECT MAX(RouteID) FROM Routes");

    return data;
  } catch (error) {
    console.log(error);
  }
};

const addTrain = async (name, runson, seats, startTime) => {
  try {
    const [data] = await pool.query(
      `INSERT INTO Trains (TrainName, RunsOn, TotalSeats, StartTime) VALUES(?, ?, ?, ?)`,
      [name, runson, seats, startTime]
    );
    const [trainID] = await pool.query("SELECT MAX(TrainID) FROM trains");
    return trainID;
  } catch (error) {
    console.log(error);
  }
};

const addRoute = async (trainID, station, seats, startTime, d1, routeID) => {
  try {
    const [data] = await pool.query(
      `INSERT INTO Routes (TrainID, CurrentStation, RemainingSeats, TimefromStart, CurrentDate, RouteID) VALUES(?, ?, ?, ?, ?, ?)`,
      [trainID, station, seats, startTime, d1, routeID]
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

const allTrains = async () => {
  try {
    const data = pool.query("SELECT * FROM trains");
    return data;
  } catch (error) {
    console.log(error);
  }
};

const deleteTrain = async (id) => {
  try {
    const data = await pool.query(`DELETE FROM trains WHERE TrainID = ?`, [id]);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const routeInfo = async (id) => {
  try {
    const data = pool.query(
      `SELECT DISTINCT CURRENTSTATION, TIMEFROMSTART FROM ROUTES WHERE TRAINID=? ORDER BY TIMEFROMSTART`,
      [id]
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getStStation = async (id) => {
  try {
    const data = await pool.query(
      `SELECT DISTINCT CURRENTSTATION FROM ROUTES WHERE TRAINID=? AND TIMEFROMSTART IN (SELECT MIN(TIMEFROMSTART) FROM ROUTES WHERE TRAINID=?);`,
      [id, id]
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

const getEndStation = async (id) => {
  try {
    const data = await pool.query(
      `SELECT DISTINCT CURRENTSTATION FROM ROUTES WHERE TRAINID=? AND TIMEFROMSTART IN (SELECT MAX(TIMEFROMSTART) FROM ROUTES WHERE TRAINID=?);`,
      [id, id]
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

const getTrain = async (id) => {
  try {
    const data = await pool.query(`SELECT * FROM TRAINS WHERE TrainID=?;`, [
      id,
    ]);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const searchTrain = async (departure, arrival, date) => {
  try {
    const data = await pool.query(
      `SELECT DEPARTURE.TRAINID AS TRAINID, DEPARTURE.ROUTEID AS ROUTEID, DEPARTURE.CURRENTSTATION  AS DEPT, ARRIVAL.CURRENTSTATION AS ARR, DEPARTURE.CURRENTDATE AS DEPARTUREDATE, ARRIVAL.CURRENTDATE AS ARRIVALDATE, ARRIVAL.TIMEFROMSTART-DEPARTURE.TIMEFROMSTART AS DURATION, ARRIVAL.TIMEFROMSTART AS ARRIVALTIME, DEPARTURE.TIMEFROMSTART AS DEPARTURETIME FROM ROUTES AS DEPARTURE INNER JOIN ROUTES AS ARRIVAL ON (DEPARTURE.ROUTEID=ARRIVAL.ROUTEID AND DEPARTURE.TRAINID=ARRIVAL.TRAINID) WHERE DEPARTURE.CURRENTSTATION=? AND ARRIVAL.CURRENTSTATION=? AND ARRIVAL.TIMEFROMSTART>DEPARTURE.TIMEFROMSTART AND DEPARTURE.CURRENTDATE=?;`,
      [departure, arrival, date]
    );
    console.log(data)
    return data;
  } catch (error) {
    console.log(error);
  }
};

const seats = async (trainid, routeid, departuretime, arrivaltime) => {
  try {
    const [data] = await pool.query(
      `SELECT MIN(REMAININGSEATS) AS Seats, WSeats FROM ROUTES WHERE TRAINID=? AND ROUTEID=? AND TIMEFROMSTART>=? AND TIMEFROMSTART<?;`,
      [trainid, routeid, departuretime, arrivaltime]
    );
    console.log("seats");
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
};

const BookTicket = async (
  userID,
  routeID,
  trainID,
  source,
  dest,
  price,
  email,
  contactno,
  len
) => {
  try {
    const data = pool.query(
      `INSERT INTO tickets (UserID, RouteID, TrainID, SourceStation, DestinationStation, Price, Email, ContactNo, NoOfPassenger) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [userID, routeID, trainID, source, dest, price, email, contactno, len]
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

const getTrainID = async () => {
  try {
    const [data] = await pool.query(
      `SELECT MAX(TicketID) as ticketID FROM tickets`
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

const addPassenger = async (ticketId, name, age, gender, status) => {
  try {
    pool.query(
      `INSERT INTO Passengers (TicketID, Name, Age, Gender, Status) VALUES(?,?,?,?,?);`,
      [ticketId, name, age, gender, status]
    );
  } catch (error) {
    console.log(error);
  }
};

const updateSeats = async (len, source, destination, routeID, trainID) => {
  try {
    const data1 = await pool.query(
      `SELECT * FROM routes
      WHERE RouteID = ?
        AND TrainID = ?
        AND TimefromStart >= (
          SELECT TimefromStart 
          FROM (SELECT * FROM routes) AS subquery 
          WHERE CurrentStation = ? AND RouteID = ? AND TrainID = ?
        )
        AND TimefromStart <= (
          SELECT TimefromStart 
          FROM (SELECT * FROM routes) AS subquery 
          WHERE CurrentStation = ? AND RouteID = ? AND TrainID = ?
        );
      `,
      [
        routeID,
        trainID,
        source,
        routeID,
        trainID,
        destination,
        routeID,
        trainID,
      ]
    );


    console.log(data1[0][0])
    for (let i = 0; i < data1[0].length; i++) {

      console.log(i)
      let len2 = data1[0][i].RemainingSeats;

      len2 -= len;
      let wlen = data1[0][i].WSeats;
      if (len2 < 0) {
        wlen += -1 * len2;
        len2 = 0;
      }
      console.log(len2, wlen)
      const data = await pool.query(
        `UPDATE routes SET RemainingSeats = ?, WSeats = ? WHERE RouteID = ? AND TrainID = ? AND CurrentStation = ? AND TimefromStart = ?;`, [len2, wlen, routeID, trainID, data1[0][i].CurrentStation, data1[0][i].TimefromStart]
      )
    }

    // const data = await pool.query(
    //   `UPDATE routes
    //   SET RemainingSeats = (RemainingSeats - ?)
    //   WHERE RouteID = ?
    //     AND TrainID = ?
    //     AND TimefromStart >= (
    //       SELECT TimefromStart 
    //       FROM (SELECT * FROM routes) AS subquery 
    //       WHERE CurrentStation = ? AND RouteID = ? AND TrainID = ?
    //     )
    //     AND TimefromStart <= (
    //       SELECT TimefromStart 
    //       FROM (SELECT * FROM routes) AS subquery 
    //       WHERE CurrentStation = ? AND RouteID = ? AND TrainID = ?
    //     );
    //   `,
    //   [
    //     len,
    //     routeID,
    //     trainID,
    //     source,
    //     routeID,
    //     trainID,
    //     destination,
    //     routeID,
    //     trainID,
    //   ]
    // );
    // console.log(data)
    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
};

const getTickets = async (id) => {
  try {
    const data = pool.query(
      `SELECT * FROM tickets WHERE UserID=?`,
      [id]
    );
    return data;

  } catch (error) {
    console.log(error);
  }
}

const getStationDetails = async (source, destination, routeID) => {
  try {
    const data = pool.query(
      `SELECT DEPARTURE.CURRENTDATE AS DEPARTUREDATE, ARRIVAL.CURRENTDATE AS ARRIVALDATE, ARRIVAL.TIMEFROMSTART-DEPARTURE.TIMEFROMSTART AS DURATION, ARRIVAL.TIMEFROMSTART AS ARRIVALTIME, DEPARTURE.TIMEFROMSTART AS DEPARTURETIME FROM ROUTES AS DEPARTURE INNER JOIN ROUTES AS ARRIVAL ON (DEPARTURE.ROUTEID=ARRIVAL.ROUTEID AND DEPARTURE.TRAINID=ARRIVAL.TRAINID) WHERE DEPARTURE.CURRENTSTATION=? AND ARRIVAL.CURRENTSTATION=? AND ARRIVAL.ROUTEID=?`,
      [source, destination, routeID]
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}

const deleteTicket = async (id) => {
  try {
    const data2 = await pool.query(
      "SELECT * FROM tickets WHERE TicketID=?;",
      [id]
    );


    const data1 = await pool.query(
      `SELECT * FROM routes
      WHERE RouteID = ?
      AND TrainID = ?
      AND TimefromStart >= (
        SELECT TimefromStart 
          FROM (SELECT * FROM routes) AS subquery 
          WHERE CurrentStation = ? AND RouteID = ? AND TrainID = ?
        )
        AND TimefromStart <= (
          SELECT TimefromStart 
          FROM (SELECT * FROM routes) AS subquery 
          WHERE CurrentStation = ? AND RouteID = ? AND TrainID = ?
        );
      `,
      [
        data2[0][0].RouteID,
        data2[0][0].TrainID,
        data2[0][0].SourceStation,
        data2[0][0].RouteID,
        data2[0][0].TrainID,
        data2[0][0].DestinationStation,
        data2[0][0].RouteID,
        data2[0][0].TrainID,
      ]
    );

    console.log("data1", data1)

    for (let i = 0; i < data1[0].length; i++) {

      // console.log(i)
      let len = data1[0][i].RemainingSeats;

      let len2 = data2[0][0].NoOfPassenger;
      let wlen = data1[0][i].WSeats;
      if (wlen > 0) {
        let init = wlen;
        wlen -= Math.min(len2, wlen);
        if (wlen == 0)
          len += len2 - init;
      }else{
        len += len2;
      }
      // console.log(len2, wlen)
      const data = await pool.query(
        `UPDATE routes SET RemainingSeats = ?, WSeats = ? WHERE RouteID = ? AND TrainID = ? AND CurrentStation = ? AND TimefromStart = ?;`, [len, wlen, data2[0][0].RouteID, data2[0][0].TrainID, data1[0][i].CurrentStation, data1[0][i].TimefromStart]
      )
    }

    // console.log(data1)

    const data = await pool.query(
      "DELETE FROM tickets WHERE TicketID=?;",
      [id]
    );

    return data;
  } catch (error) {
    console.log(error);
  }
}

const getAllBookings = async () => {
  try {
    const data = await pool.query(
      "SELECT * FROM tickets;"
    );

    return data;
  } catch (error) {
    console.log(error);
  }
}
const getPNR = async (tID) => {
  try {
    const data = await pool.query(
      "SELECT * FROM tickets as t inner join passengers as p on(t.TicketID = p.TicketID) WHERE t.TicketID = ?;", [tID]
    );
      console.log("tdata", data)
    return data;
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  register,
  authenticate,
  authenticateAdmin,
  changePassword,
  getMaxRouteID,
  addTrain,
  addRoute,
  allTrains,
  deleteTrain,
  routeInfo,
  getStStation,
  getEndStation,
  getTrain,
  searchTrain,
  seats,
  BookTicket,
  getTrainID,
  addPassenger,
  updateSeats,
  getTickets,
  getStationDetails,
  deleteTicket,
  getAllBookings,
  getPNR
};
