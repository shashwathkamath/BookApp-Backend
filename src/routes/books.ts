import express, { Request, Response, Router, RequestHandler } from 'express';
import Book from '../models/Book';

const router: Router = express.Router();

// Mock books data
const mockBooks = [
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 200, popularity: 15 },
  { title: 'To Kill a Mockingbird', author: 'Harper Lee', price: 150, popularity: 20 },
  { title: '1984', author: 'George Orwell', price: 180, popularity: 25 }
];

// GET /books - Get all books
router.get('/', (async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error: any) {
    res.status(500).json({ error: error?.message || 'Error fetching books' });
  }
}) as RequestHandler);

// GET /books/:id - Get a specific book by ID
router.get('/:id', (async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (error: any) {
    res.status(500).json({ error: error?.message || 'Error fetching book' });
  }
}) as RequestHandler);

// GET /books/search/author/:author - Search books by author
router.get('/search/author/:author', (async (req, res) => {
  try {
    const books = await Book.find({
      author: { $regex: req.params.author, $options: 'i' } // Case-insensitive search
    });
    res.json(books);
  } catch (error: any) {
    res.status(500).json({ error: error?.message || 'Error searching books' });
  }
}) as RequestHandler);

// GET /books/filter/price - Filter books by price range
router.get('/filter/price', (async (req, res) => {
  try {
    const { min, max } = req.query;
    const query: any = {};
    
    if (min) query.price = { $gte: Number(min) };
    if (max) query.price = { ...query.price, $lte: Number(max) };
    
    const books = await Book.find(query);
    res.json(books);
  } catch (error: any) {
    res.status(500).json({ error: error?.message || 'Error filtering books' });
  }
}) as RequestHandler);

// POST /books - Create a new book
router.post('/', (async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (error: any) {
    res.status(400).json({ error: error?.message || 'Error creating book' });
  }
}) as RequestHandler);

export default router; 