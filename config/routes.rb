Rails.application.routes.draw do
  get 'static_pages/home'
  resources :produtos
  root 'static_pages#home'
end
