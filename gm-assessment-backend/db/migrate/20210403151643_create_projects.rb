class CreateProjects < ActiveRecord::Migration[6.1]
  def change
    create_table :projects do |t|
      t.string :name
      t.string :code
      t.integer :client_id
      t.timestamps
    end
  end
end
