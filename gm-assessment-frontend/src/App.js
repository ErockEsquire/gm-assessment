import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/header";
import Timesheet from "./components/Timesheet/timesheet";
import axios from "axios";

function App() {
  const [timesheets, setTimesheets] = useState(null);
  const [page, setPage] = useState(1);

  const url = "http://localhost:3000/timesheets";
  useEffect(() => {
    const fetchTimesheets = async () => {
      const response = await axios.get(url + "?page" + page);
      setTimesheets(response.data.timesheets);
    };
    fetchTimesheets();
  }, []);
  console.log(timesheets);

  return (
    <div className="App">
      <Header />
      <Timesheet timesheets={timesheets}/>
    </div>
  );
}

export default App;
