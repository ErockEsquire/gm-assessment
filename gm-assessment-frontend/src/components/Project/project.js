import React, { useState, useEffect } from "react";
import "./stylesheet/project.scss";
import Table from "./table";
import { calculateTotals } from "../Utils/utils"

export default function Projects({ projects }) {
  const [hours, setHours] = useState("");
  const [billableHours, setBillableHours] = useState("");
  const [billableAmount, setBillableAmount] = useState("");

  useEffect(() => {
    const totals = calculateTotals(projects);
    setHours(totals.totalHours);
    setBillableHours(totals.totalBillableHours);
    setBillableAmount(totals.totalBillableAmount);
    // eslint-disable-next-line
  }, [projects]);

  return (
    <section className="project">
      <div className="project-numberBox">
        <div className="project-numberBox__div">
          <p>Total Hours</p>
          <p>{hours}</p>
        </div>
        <div className="project-numberBox__div">
          <p>Total Billable Hours</p>
          <p>{billableHours}</p>
        </div>
        <div className="project-numberBox__div">
          <p>Total Billable Amount</p>
          <p>$ {billableAmount}</p>
        </div>
      </div>
      <Table
        projects={projects}
        hours={hours}
        setHours={setHours}
      />
    </section>
  );
}
