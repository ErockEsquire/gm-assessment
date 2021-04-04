class Project < ApplicationRecord
  has_many :timesheets
  belongs_to :client
end
