const express = require('express');
const router = express.Router();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(process.env.DB_PATH || '');

// Get the Books list
router.get('/books', (req, res) => {
  const query = `SELECT books.*
                  , SUM(IFNULL(order_items.quantity,0)) ordered
                  , books.quantity - SUM(IFNULL(order_items.quantity,0)) avaiable 
                FROM books
                LEFT JOIN order_items ON books.id = order_items.book_id
                GROUP BY books.id`
  // db.all('SELECT books.*, sum(order_items.quantity) inorder, books.quantity - sum(order_items.quantity) avaiable FROM books JOIN order_items ON books.id = order_items.book_id', (err, rows) => {
  db.all(query, (err, rows) => {
    if (err) {
      console.error('Error fetching books:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ books: rows });
    }
  });
});

// Get a specific Book by ID
router.get('/books/book/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM books WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error('Error fetching book:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (!row) {
      res.status(404).json({ error: 'Book not found' });
    } else {
      res.json({ book: row });
    }
  });
});

// Get specific books by Author
router.get('/books/author/:author', (req, res) => {
  const { author } = req.params;
  db.all('SELECT * FROM books WHERE author = ?', [author], (err, rows) => {
    if (err) {
      console.error('Error fetching author:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (!rows) {
      res.status(404).json({ error: 'Author not found' });
    } else {
      res.json({ books: rows });
    }
  });
});

// Get specific books by Category
router.get('/books/category/:category', (req, res) => {
  const { category } = req.params;
  db.all('SELECT * FROM books WHERE category = ?', [category], (err, rows) => {
    if (err) {
      console.error('Error fetching category:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (!rows) {
      res.status(404).json({ error: 'Category not found' });
    } else {
      res.json({ books: rows });
    }
  });
});

// Get specific books between the price range
router.get('/books/price/:price', (req, res) => {
  const { price } = req.params;
  db.all('SELECT * FROM books WHERE price = ?', [price], (err, rows) => {
    if (err) {
      console.error('Error fetching price:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (!rows) {
      res.status(404).json({ error: 'Price not found' });
    } else {
      res.json({ books: rows });
    }
  });
});

// Add a new Book
router.post('/book', (req, res) => {
  const {
    title,
    author,
    isbn,
    category,
    quantity,
    price,
  } = req.body;

  try {

    db.run(
      `INSERT INTO books (title, author, isbn, category, quantity, price) 
        VALUES (?, ?, ?, ?, ?, ?)`,
      [title, author, isbn, category, quantity, price],
      (err) => {
        if (err) {
          console.error('Error adding book:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.status(201).json({ message: 'Book added successfully' });
        }
      }
    );
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a Book by ID
router.put('/book/:id', (req, res) => {
  const { id } = req.params;
  const {
    title,
    author,
    isbn,
    category,
    quantity,
    price,
  } = req.body;

  db.run(
    `UPDATE books SET 
    title = ?, 
    author = ?,
    isbn = ?,
    category = ?,
    quantity = ?,
    price = ?
    WHERE id = ?`,
    [title, author, isbn, category, quantity, price, id],
    (err) => {
      if (err) {
        console.error('Error updating book:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ message: 'Book updated successfully' });
      }
    }
  );
});

// Delete a Book by ID
router.delete('/book/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM books WHERE id = ?', [id], (err) => {
    if (err) {
      console.error('Error deleting book:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'Book deleted successfully' });
    }
  });
});

module.exports = router;