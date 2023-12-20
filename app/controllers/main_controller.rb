class MainController < ApplicationController

  def main_page
  end

  def registration
  end

  def profile
  end

  def about_us
  end

  def stop_page
    block_type = params[:block_type]
    url = params[:url]

    # if block_type == "limited" then
    #   start_block = Time.now
    #   end_block = Time.now
    #   while end_block - start_block < 5 do
    #     end_block = Time.now
    #     @test = end_block - start_block
    #   end
    #   redirect_to(url, allow_other_host: true)
    # end
  end

  # def add_message
  #   contacts_name = params[:contacts_name]
  #   contacts_email = params[:contacts_email]
  #   contacts_message = params[:contacts_message]

  #   result = Message.create :contacts_name => contacts_name, :contacts_email => contacts_email, :contacts_message => contacts_message
  #   result.save
  # end
end
