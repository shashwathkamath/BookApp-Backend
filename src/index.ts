import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
const mongoose = require('./config/database');
import booksRouter from './routes/books';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/books', booksRouter);

app.get('/', (req, res) => {
  res.send('BookApp Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 