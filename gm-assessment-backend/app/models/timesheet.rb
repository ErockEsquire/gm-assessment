class Timesheet < ApplicationRecord
  belongs_to :project
  belongs_to :client
end
