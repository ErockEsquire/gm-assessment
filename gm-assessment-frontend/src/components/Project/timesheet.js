import React, { useState, useEffect } from "react";

export default function Timesheets({
  openProject,
  openTimesheets,
  setOpenTimesheets,
}) {
  const { timesheets } = openProject;
  return (
    <table className="project-timesheetsContainer">
      <thead>
        <tr className="project-row__timesheets-head">
          <td>Date</td>
          <td>Name</td>
          <td>Hours</td>
          <td>Billable</td>
          <td>Billable Rate</td>
        </tr>
      </thead>
      <tbody>
        {timesheets.map((timesheet) => (
          <tr className="project-row__timesheets-row">
            <td>{timesheet.date}</td>
            <td>{timesheet.first_name + " " + timesheet.last_name}</td>
            <td className="project-row__timesheets-row__hours">
              {timesheet.hours}
            </td>
            <td className="project-row__timesheets-row__hours">
              {timesheet.billable ? "Yes" : "No"}
            </td>
            <td className="project-row__timesheets-row__hours">
              {timesheet.billable_rate}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
