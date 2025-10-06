import express from 'express';
import userRoutes from './routes/userRoutes.js';
import admin from 'firebase-admin'

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://copytube.firebaseio.com'
});

const app = express();
const db = admin.firestore();

app.use(express.json());

app.use('/users', userRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});