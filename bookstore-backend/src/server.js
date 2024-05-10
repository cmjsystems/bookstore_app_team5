require('dotenv').config();

const express = require('express');
const cors = require('cors');

// Initialize the database
const setup = require('./util/setup');
setup();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API and Load routes
// const bookstoreRouter = require('./routes/bookstore');
const usersRouter = require('./routes/users');
const booksRouter = require('./routes/books');
const ordersRouter = require('./routes/orders');

// Use routes
// app.use('/', bookstoreRouter);
app.use('/', usersRouter);
app.use('/', booksRouter);
app.use('/', ordersRouter);


// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});