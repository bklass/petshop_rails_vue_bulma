Rails.application.routes.draw do
  resources :produtos
  root 'produtos#index'
end
