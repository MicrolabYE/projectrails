class MainController < ApplicationController

  def current_user
    if @current_user.nil?
      @current_user = Myuser.find_by(id: session[:user_id])
    else
      @current_user
    end
  end

  def main_page
  end

  def registration
    current_user
  end

  def profile
    current_user

    if @current_user != nil
      user = Myuser.find_by id:session[:user_id]
      @name = user.name
      @mail = user.mail
      @urls= user.urls.split(";")
      @settings = user.settings.split(";")
    end
  end

  def about_us
  end

  def stop_page
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
