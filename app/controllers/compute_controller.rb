class ComputeController < ApplicationController
  def add_session
    user = Myuser.find_by(mail: params[:mail])
    session[:user_id] = user.id  # Этот код помещает в браузер пользователя временные куки с зашифрованной версией пользовательского id
                                 # user.id поле id есть у каждой модели неявно
                                 # Таким обраом мы разместили id пользователя во временном cookie, который удалится вместе с закрытием браузера
  end

  def add_user
    username = params[:name]
    usermail = params[:mail]
    userpassword = params[:password]

    @result = false
    if Myuser.find_by mail: usermail then @result = true end

    if @result == false then
      result = Myuser.create :name => username, :mail => usermail, :password => userpassword, :urls => "", :settings => ""
      result.save
    end

    respond_to do |format|
      format.html
      format.json do
        render json:
          { value: @result }
      end
    end

  end

  def check_url
      blocking_url = params[:blocking_url]
      user = Myuser.find_by id: session[:user_id]
      urls = user.urls.split(";")

      @flag = false
      0.upto(urls.length - 1) do |i|
        if urls[i] == blocking_url then @flag = true end
      end

      respond_to do |format|
        format.html
        format.json do
          render json:
            { value: @flag }
        end
      end
  end

  def check_user
    usermail = params[:mail]
    userpassword = params[:password]

    @result = false
    if Myuser.find_by mail: usermail, password: userpassword then @result = true end

    respond_to do |format|
      format.html
      format.json do
        render json:
          { value: @result }
      end
    end
  end

  def add_message
    contacts_name = params[:contacts_name]
    contacts_email = params[:contacts_email]
    contacts_message = params[:contacts_message]

    result = Message.create :contacts_name => contacts_name, :contacts_email => contacts_email, :contacts_message => contacts_message
    result.save
  end

  def delete_url
    deleting_url = params[:delete_url]
    user = Myuser.find_by id:session[:user_id]
    urls = user.urls.split(";")
    settings = user.settings.split(";")

    0.upto(urls.length - 1) do |i|
      if urls[i] == deleting_url then
        urls.delete_at(i)
        settings.delete_at(i)
        user.urls = urls.join(";")
        user.settings = settings.join(";")
        if user.urls.length > 0 then user.urls += ";" end
        if user.settings.length > 0 then user.settings += ";" end
        user.save
        break
      end
    end
  end

  def add_url
    blocking_url = params[:blocking_url]
    block_type = params[:block_type]
    block_time = params[:block_time]
    start_block = params[:start_block]
    end_block = params[:end_block]

    user = Myuser.find_by id: session[:user_id]
    user.urls += blocking_url + ";"
    user.settings += block_type + "%" + (block_time.to_i * 1000).to_s + "%" + start_block + "%" + end_block + "%0;"
    # blocktype % block_time % start_block % end_block % counter
    user.save
  end

  def get_info
    url_from = params[:url_from]

    user = Myuser.find_by id:session[:user_id]
    urls= user.urls.split(";")
    settings = user.settings.split(";")

    @memory_settings = "#"
    0.upto(urls.length - 1) do |i|
      if urls[i] == url_from then
        @memory_settings = settings[i].split("%")
      end
    end

    respond_to do |format|
      format.json do
        render json: { blocktype: @memory_settings[0], blocktime: @memory_settings[1], start_block: @memory_settings[2], end_block: @memory_settings[3], counter: @memory_settings[4] }
      end
    end
  end

  def get_info_about_urls
    user = Myuser.find_by id:session[:user_id]
    @urls = user.urls
    @settings = user.settings

    respond_to do |format|
      format.json do
        render json: { urls: @urls, settings: @settings }
      end
    end
  end

  def change_counter
    url_from = params[:url_from]

    user = Myuser.find_by id:session[:user_id]
    urls= user.urls.split(";")
    settings = user.settings.split(";")

    @memory_settings = "#"
    ind = -1
    0.upto(urls.length - 1) do |i|
      if urls[i] == url_from then
        @memory_settings = settings[i].split("%")
        ind = i
      end
    end

    k = @memory_settings[4].to_i
    k += 1
    @memory_settings[4] = k.to_s

    settings[ind] = @memory_settings.join("%")
    user.settings = settings.join(";") + ";"
    user.save
  end
end
