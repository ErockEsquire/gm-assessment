class CreateTimesheets < ActiveRecord::Migration[6.1]
  def change
    create_table :timesheets do |t|
      t.float :hours
      t.boolean :billable
      t.integer :billable_rate
      t.date :date
      t.string :client
      t.string :first_name
      t.string :last_name
      t.string :project_name
      t.string :project_code
      t.timestamps
    end
  end
end
