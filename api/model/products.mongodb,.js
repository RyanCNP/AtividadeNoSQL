use('test')
const products = [
	{
	  "id": 1,
	  "nome": "Smartphone Orion Z5",
	  "categoria": "Celular",
	  "marca": "NebulaTech",
	  "descricao": "Smartphone com tela AMOLED de 6.7 polegadas, 128GB de armazenamento e câmera tripla de 64MP.",
	  "preco": 2999.90,
	  "cod_prod": "NT-CEL-001"
	},
	{
	  "id": 2,
	  "nome": "Notebook Titan X15",
	  "categoria": "Computador",
	  "marca": "ValTech",
	  "descricao": "Notebook com processador Intel i7, 16GB de RAM, SSD de 512GB e tela Full HD de 15.6 polegadas.",
	  "preco": 5899.00,
	  "cod_prod": "VT-NBK-002"
	},
	{
	  "id": 3,
	  "nome": "Smart TV Andromeda 55\"",
	  "categoria": "Televisor",
	  "marca": "GalaxVision",
	  "descricao": "Smart TV 4K com sistema operacional próprio, suporte a HDR10+ e assistente de voz integrado.",
	  "preco": 3499.99,
	  "cod_prod": "GV-TV-003"
	},
	{
	  "id": 4,
	  "nome": "Fone de Ouvido NebulaSound Pro",
	  "categoria": "Áudio",
	  "marca": "NebulaTech",
	  "descricao": "Fones de ouvido com cancelamento ativo de ruído, Bluetooth 5.2 e autonomia de 30 horas.",
	  "preco": 899.90,
	  "cod_prod": "NT-AUD-004"
	},
	{
	  "id": 5,
	  "nome": "Console Quantum Play",
	  "categoria": "Games",
	  "marca": "QuantumCorp",
	  "descricao": "Console de última geração com gráficos em 8K, SSD ultrarrápido e catálogo exclusivo de jogos.",
	  "preco": 4799.99,
	  "cod_prod": "QC-GME-005"
	}
  ]
  
db.estoque.insertMany(products)