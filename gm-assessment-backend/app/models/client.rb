class Client < ApplicationRecord
  has_many :timesheets
  has_many :projects
end
