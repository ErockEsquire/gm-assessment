import React, { useState, useEffect } from "react";
import { calculateTimesheets } from "../Utils/utils";

export default function TableRow({ project }) {
  const { name, client, timesheets } = project;
  const [openRow, setOpenRow] = useState(false);
  const totals = calculateTimesheets(timesheets);

  return (
    <>
      <tr className="project-row" onClick={() => {setOpenRow(!openRow)}}>
        <td>{name}</td>
        <td>{client.name}</td>
        <td className="project-row__hours">{totals.totalHours}</td>
        <td className="project-row__hours">{totals.totalBillableHours}</td>
        <td className="project-row__hours">${totals.totalBillableAmount}</td>
      </tr>
      {openRow && (
        <>
          <tr
            className="project-row__timesheets-head"
            onClick={() => setOpenRow(!openRow)}
          >
            <td>Date</td>
            <td>Name</td>
            <td>Hours</td>
            <td>Billable</td>
            <td>Billable Rate</td>
          </tr>
          {timesheets.map((timesheet) => (
            <tr className="project-row__timesheets-row">
              <td>{timesheet.date}</td>
              <td>{timesheet.first_name + " " + timesheet.last_name}</td>
              <td className="project-row__timesheets-row__hours">{timesheet.hours}</td>
              <td className="project-row__timesheets-row__hours">
                {timesheet.billable ? "Yes" : "No"}
              </td>
              <td className="project-row__timesheets-row__hours">{timesheet.billable_rate}</td>
            </tr>
          ))}
        </>
      )}
    </>
  );
};
