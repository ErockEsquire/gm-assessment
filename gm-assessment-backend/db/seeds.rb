require 'csv'

def ingestCSV
  file = File.read(Rails.root.join('lib', 'assets', 'csv', 'GM_Coding_Exercise_Sample_Data.csv'))
  fileHash = CSV.parse(file, headers: true).map(&:to_h)

  timesheets = Timesheet.all.to_a

  inserts = []
  updates = []
  fileHash.each do |row|
    if row['Date']
      date = Date.strptime(row['Date'], '%m/%d/%y')
      hours = row['Hours'].to_f

      timesheet = timesheets.find{|t| (t.date == date) && (t.project_code == row['Project Code']) && (t.first_name == row['First Name']) && (t.last_name == row['Last Name']) && (t.hours == hours)}
      # byebug
      billable = check_billable(row)

      update = { client: row['Client'], project_name: row['Project'], project_code: row['Project Code'], hours: row['Hours'], billable: billable, billable_rate: row['Billable Rate'], date: date, first_name: row['First Name'], last_name: row['Last Name']}

      if timesheet
        updates.push(update.merge(id: timesheet.id, created_at: timesheet.created_at, updated_at: DateTime.now))
      else
        inserts.push(update.merge(created_at: DateTime.now, updated_at: DateTime.now))
      end
    end
  end

  Timesheet.insert_all(inserts) if inserts.length.positive?
  Timesheet.upsert_all(updates) if updates.length.positive?
end

def check_billable(row)
  if row['Billable?'] == 'No'
    billable = false
  elsif row['Billable?'] == 'Yes'
    billable = true
  end
  return billable
end

ingestCSV