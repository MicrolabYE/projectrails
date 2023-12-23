class CreateMyusers < ActiveRecord::Migration[7.1]
  def change
    create_table :myusers do |t|
      t.string :name
      t.string :mail
      t.string :password
      t.string :urls
      t.string :settings

      t.timestamps
    end
  end
end
