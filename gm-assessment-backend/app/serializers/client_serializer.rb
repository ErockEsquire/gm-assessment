class ClientSerializer < ActiveModel::Serializer
  attributes :name, :projects, :timesheets
end
