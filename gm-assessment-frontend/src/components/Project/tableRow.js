import React, { useState } from "react";
import { calculateTimesheets, calculatePercent, prettierNumber } from "../Utils/utils";

export default function TableRow({ project }) {
  const { name, client, timesheets } = project;
  const [openRow, setOpenRow] = useState(false);
  const [startClose, setStartClose] = useState(false);
  const totals = calculateTimesheets(timesheets);
  const percent = calculatePercent(
    totals.totalHours,
    totals.totalBillableHours
  );

  const handleOpen = () => {
    if (openRow) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setStartClose(true);
      setTimeout(() => setOpenRow(false), 1200);
      setTimeout(() => setStartClose(false), 1200);
    } else {
      setOpenRow(true);
    }
  };

  return (
    <>
      <tr
        className={openRow ? "project-row opened" : "project-row"}
        onClick={() => {
          handleOpen();
        }}
      >
        <td>{name}</td>
        <td>{client.name}</td>
        <td className="project-row__hours">{totals.totalHours}</td>
        <td className="project-row__hours">
          {prettierNumber((totals.totalBillableHours.toFixed(2)))} ({percent}%)
        </td>
        <td className="project-row__hours">{totals.totalBillableAmount > 0 ? `$${prettierNumber(totals.totalBillableAmount)}`:"-"}</td>
      </tr>
      {openRow && (
        <>
          <tr
            className={
              startClose
                ? "project-row__timesheets-head close"
                : "project-row__timesheets-head open"
            }
            onClick={() => handleOpen()}
          >
            <td>Date</td>
            <td>Name</td>
            <td>Hours</td>
            <td>Billable</td>
            <td>Billable Rate</td>
          </tr>
          {timesheets.map((timesheet) => (
            <tr
              className={
                startClose
                  ? "project-row__timesheets-row close"
                  : "project-row__timesheets-row open"
              }
            >
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
        </>
      )}
    </>
  );
}
