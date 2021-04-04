export const calculateTotals = (projects) => {
  let totalHours = 0;
  let totalBillableHours = 0;
  let totalBillableAmount = 0;

  projects.forEach((project) => {
    totalHours += project.total_hours;
    totalBillableHours += project.total_billable_hours;
    totalBillableAmount += project.total_billable_amount;
  });
  return {
    totalHours: prettierNumber(totalHours.toFixed(2)),
    totalBillableHours: prettierNumber(totalBillableHours.toFixed(2)),
    totalBillableAmount: prettierNumber(totalBillableAmount.toFixed(2)),
  };
};

export const calculateTimesheets = (timesheets) => {
  let projectHours = 0;
  let projectBillableHours = 0;
  let projectBillableAmount = 0;

  timesheets.forEach((timesheet) => {
    projectHours += timesheet.hours;
    if (timesheet.billable) {
      projectBillableHours += timesheet.hours;
      projectBillableAmount += timesheet.hours * timesheet.billable_rate;
    }
  });

  projectHours = Math.round(projectHours * 100) / 100;
  projectBillableHours = Math.round(projectBillableHours * 100) / 100;
  projectBillableAmount = projectBillableAmount.toFixed(2);

  return {
    totalHours: projectHours,
    totalBillableHours: projectBillableHours,
    totalBillableAmount: projectBillableAmount,
  };
};

export const calculatePercent = (total, portion) => {
  return Math.floor((portion / total) * 100);
};

export const prettierNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const sortName = (list, direction) => {
  let sortedList;
  if (direction === "desc") {
    sortedList = [...list].sort((a, b) => a.name.localeCompare(b.name));
  } else if (direction === "asc") {
    sortedList = [...list].sort((a, b) => b.name.localeCompare(a.name));
  }
  return sortedList;
};

export const sortClient = (list, direction) => {
  let sortedList;
  if (direction === "desc") {
    sortedList = [...list].sort((a, b) =>
      a.client.name.localeCompare(b.client.name)
    );
  } else if (direction === "asc") {
    sortedList = [...list].sort((a, b) =>
      b.client.name.localeCompare(a.client.name)
    );
  }
  return sortedList;
};

export const sortHours = (list, direction) => {
  let sortedList;
  if (direction === "desc") {
    sortedList = [...list].sort((a, b) => b.total_hours - a.total_hours);
  } else if (direction === "asc") {
    sortedList = [...list].sort((a, b) => a.total_hours - b.total_hours);
  }
  return sortedList;
};

export const sortBillableHours = (list, direction) => {
  let sortedList;
  if (direction === "desc") {
    sortedList = [...list].sort(
      (a, b) => b.total_billable_hours - a.total_billable_hours
    );
  } else if (direction === "asc") {
    sortedList = [...list].sort(
      (a, b) => a.total_billable_hours - b.total_billable_hours
    );
  }
  return sortedList;
};

export const sortBillableAmount = (list, direction) => {
  let sortedList;
  if (direction === "desc") {
    sortedList = [...list].sort(
      (a, b) => b.total_billable_amount - a.total_billable_amount
    );
  } else if (direction === "asc") {
    sortedList = [...list].sort(
      (a, b) => a.total_billable_amount - b.total_billable_amount
    );
  }
  return sortedList;
};
