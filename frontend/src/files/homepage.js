import React from "react";
import "./files1.css";
import Bookticket from "./components/bookticket";
import Trainsearch from "./components/trainsearch";
import Pnrsearch from "./components/pnrsearch";

function Homepage() {
  return (
    <>
      <Trainsearch />
      <Bookticket />
      <Pnrsearch />
    </>

  );
}

export default Homepage;
