require 'csv'

def ingestCSV
  file = File.read(Rails.root.join('lib', 'assets', 'csv', 'GM_Coding_Exercise_Sample_Data.csv'))
  fileCSV = CSV.parse(file, headers: true).map(&:to_h)
  
  # fileCSV.each do |row|

  # end
end

ingestCSV