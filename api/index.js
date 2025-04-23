import express from 'express';
import cors from 'cors';
import {connectToDatabase } from './config/database.js';
import productsRoutes from './routes/productsRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/', express.static('public'));
app.use('/api/products', productsRoutes);
app.use('/img', express.static('public/img/img-storage.png'));

connectToDatabase(app).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});