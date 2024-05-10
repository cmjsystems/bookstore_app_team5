const express = require('express');
const router = express.Router();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(process.env.DB_PATH || '');

// Get the Orders list
router.get('/orders', (req, res) => {
  db.all('SELECT orders.*, users.fullname FROM orders JOIN users ON orders.user_id = users.id', (err, rows) => {
    if (err) {
      console.error('Error fetching orders:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(rows);
    }
  });
});

// Get a specific Order by ID
router.get('/orders/order/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT orders.*, users.fullname FROM orders JOIN users ON orders.user_id = users.id WHERE orders.id = ?', [id], (err, row) => {
    if (err) {
      console.error('Error fetching order:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (!row) {
      res.status(404).json({ error: 'Order not found' });
    } else {
      res.json(row);
    }
  });
});

// Get the Orders list by User ID
router.get('/orders/order/user/:id', (req, res) => {
  const { id } = req.params;
  db.all('SELECT orders.*, users.fullname FROM orders JOIN users ON orders.user_id = users.id WHERE user_id = ?', [id], (err, rows) => {
    if (err) {
      console.error('Error fetching orders:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(rows);
    }
  });
});

// Get the Orders Details
router.get('/orders/details', (req, res) => {
  db.all('SELECT order_items.*, books.title FROM order_items JOIN books ON order_items.book_id = books.id', (err, rows) => {
    if (err) {
      console.error('Error fetching order details:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(rows);
    }
  });
});

// Get the Order Details by Order ID
router.get('/orders/details/:order_id', (req, res) => {
  const { order_id } = req.params;
  db.all('SELECT order_items.*, books.title FROM order_items JOIN books ON order_items.book_id = books.id WHERE order_id = ?', [order_id], (err, rows) => {
    if (err) {
      console.error('Error fetching order details:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(rows);
    }
  });
});

// Get the sum of the Orders by book ID
router.get('/orders/sum/:book_id', (req, res) => {
  const { book_id } = req.params;
  db.get('SELECT SUM(quantity) as total FROM order_items WHERE book_id = ?', [book_id], (err, row) => {
    if (err) {
      console.error('Error fetching order sum:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(row);
    }
  });
});

// Add a new Order
router.post('/order', (req, res) => {
  const { userId, items, total } = req.body;

  db.serialize(() => {
    db.run('BEGIN TRANSACTION');

    db.run(
      `INSERT INTO orders (user_id, total) VALUES (?, ?)`,
      [userId, total],
      function (err) {
        if (err) {
          console.error('Error adding order:', err);
          res.status(500).json({ error: 'Internal Server Error' });
          db.run('ROLLBACK');
        } else {
          const orderId = this.lastID;
          const orderItems = items.map((item) => [orderId, item.bookId, item.quantity, item.price]);
          orderItems.forEach((item) => {
            db.run(
              `INSERT INTO order_items (order_id, book_id, quantity, price) VALUES (?, ?, ?, ?)`,
              item,
              function (err) {
                if (err) {
                  console.error('Error adding order items:', err);
                  res.status(500).json({ error: 'Internal Server Error' });
                  db.run('ROLLBACK');
                }
              }
            );
          });

          db.run('COMMIT');
          res.status(201).json({ message: 'Order added successfully', id: orderId });
        }
      }
    );
  });
});

// Update a Order by ID
router.put('/order/:id', (req, res) => {
  const { id } = req.params;
  const {
    book_id,
    user_id,
    quantity,
    order_date,
  } = req.body;

  db.run(
    `UPDATE orders SET 
      book_id = ?, 
      user_id = ?,
      quantity = ?,
      order_date = ?,
      WHERE id = ?`,
    [book_id, user_id, quantity, order_date, id],
    (err) => {
      if (err) {
        console.error('Error updating order:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ message: 'Order updated successfully' });
      }
    }
  );
});

// Delete a Order by ID
router.delete('/order/:id', (req, res) => {
  const { id } = req.params;

  db.serialize(() => {
    db.run('BEGIN TRANSACTION');

    db.run('DELETE FROM orders WHERE id = ?', [id], (err) => {
      if (err) {
        console.error('Error deleting order:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        db.run('ROLLBACK');
      } else {
        db.run('DELETE FROM order_items WHERE order_id = ?', [id], (err) => {
          if (err) {
            console.error('Error deleting order items:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            db.run('ROLLBACK');
          } else {
            db.run('COMMIT');
            res.json({ message: 'Order and order items deleted successfully' });
          }
        });
      }
    });
  });
});

module.exports = router;