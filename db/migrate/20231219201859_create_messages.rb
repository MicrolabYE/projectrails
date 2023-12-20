class CreateMessages < ActiveRecord::Migration[7.1]
  def change
    create_table :messages do |t|
      t.string :contacts_name
      t.string :contacts_email
      t.text :contacts_message

      t.timestamps
    end
  end
end
