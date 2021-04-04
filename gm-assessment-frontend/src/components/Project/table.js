import React, { useState, useEffect } from "react";
import TableRow from "./tableRow";
import {
  sortName,
  sortClient,
  sortHours,
  sortBillableHours,
  sortBillableAmount,
} from "../Utils/utils";

export default function Table({ projects, handleOpenTimesheets }) {
  const [projectsRender, setProjectsRender] = useState(projects);
  const [currentSort, setCurrentSort] = useState("client");
  const [name, setName] = useState("");
  const [client, setClient] = useState("desc");
  const [hours, setHours] = useState("");
  const [billableHours, setBillableHours] = useState("");
  const [billableAmount, setBillableAmount] = useState("none");

  useEffect(() => {
    setProjectsRender(projects);
  }, [projects]);

  const renderProjects = () => {
    return projectsRender.map((project) => (
      <TableRow
        key={project.id}
        project={project}
        handleOpenTimesheets={handleOpenTimesheets}
      />
    ));
  };

  const sortController = (column) => {
    setCurrentSort(column);
    if (column === "name") {
      handleSortColumn(column, name, setName, sortName, projects);
    } else if (column === "client") {
      handleSortColumn(column, client, setClient, sortClient, projects);
    } else if (column === "hours") {
      handleSortColumn(column, hours, setHours, sortHours, projects);
    } else if (column === "billableHours") {
      handleSortColumn(
        column,
        billableHours,
        setBillableHours,
        sortBillableHours,
        projects
      );
    } else if (column === "billableAmount") {
      handleSortColumn(
        column,
        billableAmount,
        setBillableAmount,
        sortBillableAmount,
        projects
      );
    }
  };

  const handleSortColumn = (
    column,
    direction,
    setDirection,
    sortFunction,
    defaultList
  ) => {
    if (direction === "none" || currentSort !== column) {
      setDirection("desc");
      setProjectsRender(sortFunction(projectsRender, "desc"));
    } else if (direction === "desc") {
      setDirection("asc");
      setProjectsRender(sortFunction(projectsRender, "asc"));
    } else if (direction === "asc") {
      setDirection("none");
      setProjectsRender(defaultList);
    }
  };

  return (
    <div className="project__projectsContainer">
      <table className="project__projectsContainer__table">
        <thead className="project__projectsContainer__table__head">
          <tr>
            <th
              className="table-row__head"
              onClick={() => sortController("name")}
            >
              Name
            </th>
            <th
              className="table-row__head"
              onClick={() => sortController("client")}
            >
              Client
            </th>
            <th
              className="table-row__head right"
              onClick={() => sortController("hours")}
            >
              Hours
            </th>
            <th
              className="table-row__head right"
              onClick={() => sortController("billableHours")}
            >
              Billable Hours
            </th>
            <th
              className="table-row__head right"
              onClick={() => sortController("billableAmount")}
            >
              Billable Amount
            </th>
          </tr>
        </thead>
        <tbody className="project-tableContainer__table__body">
          {renderProjects()}
        </tbody>
      </table>
    </div>
  );
}
