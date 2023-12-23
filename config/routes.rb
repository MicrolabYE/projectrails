Rails.application.routes.draw do
  get 'compute/add_message'
  get 'compute/add_user'
  get 'compute/check_user'
  get 'compute/add_session'
  get 'compute/delete_url'
  get 'compute/add_url'
  get 'compute/check_url'
  get 'compute/get_info'
  get 'compute/change_counter'
  get 'compute/get_info_about_urls'
  devise_for :users
  get 'main/main_page'
  get 'main/registration'
  get 'main/profile'
  get 'main/about_us'
  get 'main/stop_page'

  get 'main/main_page'
  get 'main/registration'
  get 'main/profile'
  get 'main/about_us'
  get 'main/stop_page' => "main#stop_page"
  get 'test/test_view'

  get 'main/profile', as: 'user_root' # Перенаправляет на страницу личного кабинета после регистрации
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  root 'main#main_page'
  # Defines the root path route ("/")
  # root "posts#index"
end
