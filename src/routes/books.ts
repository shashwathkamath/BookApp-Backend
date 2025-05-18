import express from 'express';
import Book from '../models/Book';

const router = express.Router();

// Mock books data
const mockBooks = [
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 200, popularity: 15 },
  { title: 'To Kill a Mockingbird', author: 'Harper Lee', price: 150, popularity: 20 },
  { title: '1984', author: 'George Orwell', price: 180, popularity: 25 }
];

// POST /books - Create a new book listing
router.post('/', async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (error: any) {
    res.status(400).json({ error: error?.message || 'An error occurred' });
  }
});

// GET /books - Get all books (mock data)
router.get('/', (req, res) => {
  res.json(mockBooks);
});

export default router; 