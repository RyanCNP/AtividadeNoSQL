import express from 'express'
import cors from 'cors' // Importa o módulo cors
import { connectToDatabase } from './config/db.js'
import storageRoutes from './routes/storage_routes.js'

const app = express()
const PORT = process.env.PORT || 3000


app.use(cors()) //Habilita o CORS Cross-Origin resource sharing
app.use(express.json())//parse do JSON
//rota pública
app.use('/', express.static('public/index.html'))
//Rotas do app
app.use('/api/storage', storageRoutes)
//define o favicon
app.use('/favicon.ico', express.static('public/images/logoA.png'))
//start the server
connectToDatabase(app).then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}!`)
    })
})