import React, { useState, useEffect } from "react";
import "./stylesheet/project.scss";
import Table from "./table";
import { calculateTotals } from "../Utils/utils"

export default function Projects({ projects }) {
  const [hours, setHours] = useState("");
  const [billableHours, setBillableHours] = useState("");
  const [billableAmount, setBillableAmount] = useState("");

  //uses data from GET response to calculate totals using helper functions. This is what is rendered just below the header and above the table.
  useEffect(() => {
    const totals = calculateTotals(projects);
    setHours(totals.totalHours);
    setBillableHours(totals.totalBillableHours);
    setBillableAmount(totals.totalBillableAmount);
    // eslint-disable-next-line
  }, [projects]);

  return (
    <section className="project">
      <div className="project__numberBox">
        <div className="project__numberBox__div">
          <p><strong>Hours Tracked</strong></p>
          <p>{hours}</p>
        </div>
        <div className="project__numberBox__div">
          <p><strong>Billable Hours</strong></p>
          <p>{billableHours}</p>
        </div>
        <div className="project__numberBox__div">
          <p><strong>Billable Amount</strong></p>
          <p><span>$</span> {billableAmount}</p>
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
