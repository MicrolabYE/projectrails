class ComputeController < ApplicationController
  def add_message
    contacts_name = params[:contacts_name]
    contacts_email = params[:contacts_email]
    contacts_message = params[:contacts_message]

    result = Message.create :contacts_name => contacts_name, :contacts_email => contacts_email, :contacts_message => contacts_message
    result.save
  end
end
