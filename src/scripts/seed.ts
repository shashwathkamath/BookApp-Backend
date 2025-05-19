const mongoose = require('../config/database');
import Book from '../models/Book';
import User from '../models/User';

const sampleUser = {
  name: "John Doe",
  email: "john@example.com",
  location: {
    type: "Point",
    coordinates: [77.5946, 12.9716]
  }
};

const sampleBooks = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 200,
    location: {
      type: "Point",
      coordinates: [77.5946, 12.9716]
    },
    popularity: 15
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: 150,
    location: {
      type: "Point",
      coordinates: [77.5946, 12.9716]
    },
    popularity: 20
  },
  {
    title: "1984",
    author: "George Orwell",
    price: 180,
    location: {
      type: "Point",
      coordinates: [77.5946, 12.9716]
    },
    popularity: 25
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    price: 120,
    location: {
      type: "Point",
      coordinates: [77.5946, 12.9716]
    },
    popularity: 18
  }
];

const seedDatabase = async () => {
  try {
    // Clear existing data
    await Book.deleteMany({});
    await User.deleteMany({});
    
    // Create user
    const user = await User.create(sampleUser);
    
    // Add sellerId to books
    const booksWithSeller = sampleBooks.map(book => ({
      ...book,
      sellerId: user._id
    }));
    
    // Insert books
    await Book.insertMany(booksWithSeller);
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 