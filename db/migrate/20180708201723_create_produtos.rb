class CreateProdutos < ActiveRecord::Migration[5.2]
  def change
    create_table :produtos do |t|
      t.string :nome
      t.string :descricao
      t.decimal :preco
      t.string :categoria
      t.string :marca
      t.string :tipoPet

      t.timestamps
    end
  end
end
