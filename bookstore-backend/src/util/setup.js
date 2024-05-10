const sqlite3 = require('sqlite3');

function setup() {
    const db = new sqlite3.Database(process.env.DB_PATH || '');

    // Create USERS table if not exists
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        fullname TEXT NOT NULL,
        password TEXT NOT NULL,
        type TEXT NOT NULL
    )`);

    // Create BOOKS table if not exists
    db.run(`CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        isbn TEXT NOT NULL UNIQUE,
        category TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        price REAL NOT NULL
    )`);

    // Create ORDERS table if not exists
    db.run(`CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        user_id INTEGER NOT NULL,
        total REAL NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )`);

    // Create ORDER_ITEMS table if not exists
    db.run(`CREATE TABLE IF NOT EXISTS order_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER NOT NULL,
        book_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        price REAL NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(id),
        FOREIGN KEY (book_id) REFERENCES books(id)
    )`);
}

module.exports = setup;