class StaticPagesController < ApplicationController
  def home
    @produtos = Produto.all
  end
end
