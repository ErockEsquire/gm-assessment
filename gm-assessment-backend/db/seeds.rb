require 'csv'

def ingestCSV
  file = File.read(Rails.root.join('lib', 'assets', 'csv', 'GM_Coding_Exercise_Sample_Data.csv'))
  fileHash = CSV.parse(file, headers: true).map(&:to_h)

  insert_clients(fileHash)
  clients = Client.all.to_a

  insert_projects(fileHash, clients)

  timesheets = Timesheet.all.to_a
  projects = Project.all.to_a

  inserts = []
  updates = []
  project_inserts = []
  # update_project_clients = []

  fileHash.each do |row|
    if row['Date']
      date = Date.strptime(row['Date'], '%m/%d/%y')
      hours = row['Hours'].to_f

      project = projects.find{|project| (project.name == row['Project']) && (project.code == row['Project Code'])}
      client = clients.find{|client| client.name == row['Client']}

      # associated_project_client = associate_project_client(project, client, update_project_clients)
      # update_project_clients.push(associated_project_client) if associated_project_client

      timesheet = timesheets.find{|t| (t.date == date) && (t.project_id == project.id) && (t.first_name == row['First Name']) && (t.last_name == row['Last Name']) && (t.hours == hours)}

      billable = configure_billable(row)

      update = { project_id: project.id, client_id: client.id, hours: row['Hours'], billable: billable, billable_rate: row['Billable Rate'], date: date, first_name: row['First Name'], last_name: row['Last Name']}

      if timesheet
        updates.push(update.merge(id: timesheet.id, created_at: timesheet.created_at, updated_at: DateTime.now))
      else
        inserts.push(update.merge(created_at: DateTime.now, updated_at: DateTime.now))
      end
    end
  end
  # byebug
  Timesheet.insert_all(inserts) if inserts.length.positive?
  Timesheet.upsert_all(updates) if updates.length.positive?
end

def insert_projects(fileHash, clients)
  projects = Project.all.to_a
  project_inserts = []

  timesheet_projects = []
  fileHash.each do |row|
    client = clients.find{|client| client.name == row['Client']}
    if row['Project'] && row['Project Code'] && row['Client']
      timesheet_projects.push({name: row['Project'], code: row['Project Code'], client_id: client.id})
    end
  end
  timesheet_projects = timesheet_projects.uniq

  timesheet_projects.each do |timesheet_project|
    project = projects.find{|p| p.code == timesheet_project[:code]}
    if !project
      project_inserts.push(timesheet_project.merge(created_at: DateTime.now, updated_at: DateTime.now))
    end
  end
  Project.upsert_all(project_inserts) if project_inserts.length.positive?
end

def insert_clients(fileHash)
  clients = Client.all.to_a
  client_inserts = []

  timesheet_clients = fileHash.map{|row| {name: row['Client']} if row['Client']}.uniq
  timesheet_clients = timesheet_clients.select{|client| client}

  timesheet_clients.each do |timesheet_client|
    client = clients.find{|c| c.name == timesheet_client[:name]}

    if !client
      client_inserts.push(timesheet_client.merge(created_at: DateTime.now, updated_at: DateTime.now))
    end
  end
  Client.upsert_all(client_inserts) if client_inserts.length.positive?
end

def associate_project_client(project, client, project_clients)
  project_client = project_clients.find{|project_client| project_client[:project_id] == project.id && project_client[:client_id] == client.id}
  if !project_client
    insert = {project_id: project.id, client_id: client.id, created_at: DateTime.now, updated_at: DateTime.now}
    return insert
  end
end

def configure_billable(row)
  if row['Billable?'] == 'No'
    billable = false
  elsif row['Billable?'] == 'Yes'
    billable = true
  end
  return billable
end

ingestCSV