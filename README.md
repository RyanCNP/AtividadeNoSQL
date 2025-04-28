# 📦 API de Gerenciamento de Produtos e Estoque

## 📋 Descrição
Esta aplicação é uma **API RESTful** desenvolvida com **Node.js**, **Express** e **MongoDB**, destinada ao gerenciamento de produtos e seus estoques. O projeto inclui validações de dados, integração com banco de dados em nuvem e exemplos de requisições para teste.

## 🚀 Tecnologias Utilizadas
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Mongoose](https://mongoosejs.com/)
- [CORS](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/CORS)
- [Dotenv](https://github.com/motdotla/dotenv)
- ESModules (uso de `import`/`export`)

## 🛠️ Funcionalidades
- CRUD de Produtos
- CRUD de Estoque
- Validação de dados de entrada via Middleware
- Integração com MongoDB Atlas (nuvem)
- Testes de API via arquivos `.http`
- Deploy do frontend com integração à API

## ✅ Pré-requisitos
Antes de iniciar, tenha instalado:
- [Node.js](https://nodejs.org/) (versão 14.x ou superior)
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
- Conta no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

## 💻 Instalação e Configuração

1. Clone o repositório:
```bash
   git clone https://github.com/RyanCNP/AtividadeNoSQL.git
   cd AtividadeNoSQL
```
1. Instala as dependências:
```bash
  npm install
```

3. Crie um arquivo .env na raiz do projeto e configure sua string de conexão:
```bash
env
Copiar
Editar
MONGODB_URI=mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/<nome-do-banco>?retryWrites
```

4. Inicie o servidor:
```bash
npm run dev
```

## Links Importantes
Frontend : 
https://back-end-tech-storage.vercel.app/index.html

backend: <br>
https://cloud.mongodb.com/v2/67eb33d69ee00e74d2df5194#/clusters/detail/back-end-tech-storage


## 📦 Dependências do Projeto

• Dependência	Versão	Descrição <br>
• express	^4.17.x	Framework web para Node.js <br>
• cors	^2.x.x	Middleware para habilitar CORS <br>
• dotenv	^10.x.x	Carrega variáveis de ambiente <br>
• mongoose	^6.x.x	ODM para modelagem de dados MongoDB <br>
• nodemon	^2.x.x	Ferramenta para reiniciar o servidor automaticamente <br>

## Autores
• Ryan Carlo Negretti Pereira <br>
• Pedro Silva Martins <br>
• Raphael <br>


