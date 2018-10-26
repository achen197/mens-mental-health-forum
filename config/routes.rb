Rails.application.routes.draw do
  # get 'home/index'
  get 'home' => 'home#index', as: 'home'
  # get '/splash' => 'discussions#splash'
  match 'search' => 'discussions#search', as: 'discussions_search', via: [:get, :post]

  resources :channels
  resources :discussions do
    resources :replies
  end

  # root 'discussions#splash'
  # root 'discussions#index'
  root 'home#index'

  devise_for :users, controllers: { registrations: 'registrations' }
end
