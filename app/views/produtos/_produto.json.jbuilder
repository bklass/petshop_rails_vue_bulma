json.extract! produto, :id, :nome, :descricao, :preco, :categoria, :marca, :tipoPet, :created_at, :updated_at
json.url produto_url(produto, format: :json)
