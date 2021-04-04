class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :code, :client, :timesheets, :total_hours, :total_billable_hours, :total_billable_amount

  def client
    {name: self.object.client.name}
  end

  def total_hours
    self.object.timesheets.sum(:hours)
  end

  def total_billable_hours
    timesheets = self.object.timesheets.where(billable: true)
    timesheets.sum(:hours)
  end

  def total_billable_amount
    total = 0
    timesheets = self.object.timesheets.where(billable: true)
    timesheets.each do |timesheet|
      total += timesheet.billable_rate * timesheet.hours
    end
    return total
  end
end
