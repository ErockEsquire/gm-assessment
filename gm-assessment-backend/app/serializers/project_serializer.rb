class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :code, :client, :timesheets, :total_hours, :total_billable_hours, :total_billable_amount

  def client
    { name: object.client.name }
  end

  def total_hours
    object.timesheets.sum(:hours)
  end

  def total_billable_hours
    timesheets = object.timesheets.where(billable: true)
    timesheets.sum(:hours)
  end

  def total_billable_amount
    total = 0
    timesheets = object.timesheets.where(billable: true)
    timesheets.each do |timesheet|
      total += timesheet.billable_rate * timesheet.hours
    end
    total
  end
end
