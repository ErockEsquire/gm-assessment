Rails.application.routes.draw do
  namespace :admin do
      resources :timesheets
      resources :projects
      resources :clients

      root to: "timesheets#index"
    end
  resources :clients, only: [:index]
  resources :projects, only: [:index]
  resources :timesheets, only: [:index, :create]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
