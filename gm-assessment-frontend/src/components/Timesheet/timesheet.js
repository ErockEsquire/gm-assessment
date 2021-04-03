import React, { useState, useEffect } from "react";
import "./stylesheet/timesheet.scss";

export default function Timesheet({ timesheets }) {
  const { id, date, client, project_name, project_code, hours } = timesheets;

  const TableRow = ({ date, client, projectName, projectCode, hours }) => {
    return (
      <tr>
        <td>{date}</td>
        <td>{client}</td>
        <td>{projectName}</td>
        <td>{projectCode}</td>
        <td>{hours}</td>
      </tr>
    );
  };

  const renderTimesheets = () => {
    return timesheets.map((timesheet) => (
      <TableRow
        key={timesheet.id}
        date={timesheet.date}
        client={timesheet.client}
        projectName={timesheet.project_name}
        projectCode={timesheet.project_code}
        hours={timesheet.hours}
      />
    ));
  };
  return (
    <section className="timesheet">
      <table>
        <tbody>{renderTimesheets()}</tbody>
      </table>
    </section>
  );
}
