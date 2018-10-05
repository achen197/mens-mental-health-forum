Rails.application.routes.draw do
  get 'home/index'
  post 'search' => 'discussions#search', as: 'discussions_search'

  resources :channels
  resources :discussions do
    resources :replies
  end

  root 'discussions#index'

  devise_for :users, controllers: { registrations: 'registrations' }
end
