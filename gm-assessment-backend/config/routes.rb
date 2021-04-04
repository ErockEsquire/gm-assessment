Rails.application.routes.draw do
  resources :clients, only: [:index]
  resources :projects, only: [:index]
  resources :timesheets, only: [:index]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
