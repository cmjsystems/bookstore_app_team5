const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(process.env.DB_PATH || '');

// Get the users list
router.get('/users', (req, res) => {
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ users: rows });
    }
  });
});

// Get a specific User by ID
router.get('/users/id/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error('Error fetching id:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (!row) {
      res.status(404).json({ error: 'User name not found' });
    } else {
      res.json({ user: row });
    }
  });
});

// Get a specific User by User name
router.get('/users/username/:username', (req, res) => {
  const { username } = req.params;
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
    if (err) {
      console.error('Error fetching user name:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (!row) {
      res.status(404).json({ error: 'User name not found' });
    } else {
      res.json({ user: row });
    }
  });
});

// Add a new User
router.post('/register', (req, res) => {
  const { username, fullname, password, type } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
    } else {
      db.run('INSERT INTO users (username, fullname, password, type) VALUES (?, ?, ?, ?)', [username, fullname, hash, type], (err) => {
        if (err) {
          res.status(400).json({ error: 'Username already exists' });
        } else {
          res.status(201).json({
            message: 'User registered successfully',
            user: {
              username,
              fullname,
              type
            }
          });
        }
      });
    }
  });
});

// User Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
    } else if (!user) {
      res.status(401).json({ error: 'User not found' });
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign({ id: user.id, username: user.username }, 'secret', { expiresIn: '1d' });
          res.status(200).json({
            token,
            user: {
              id: user.id,
              username: user.username,
              fullname: user.fullname,
              type: user.type
            }
          });
        } else {
          res.status(401).json({ error: 'Invalid username or password' });
        }
      });
    }
  });
});

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: 'Token not provided' });
  }
  jwt.verify(token, 'secret', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}

module.exports = router;