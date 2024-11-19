const connection = require('../config/db');

// Get all books
exports.getAllBooks = (req, res) => {
    const query = 'SELECT * FROM Inventory';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching books:', err.message);
            return res.status(500).json({ error: 'Error fetching books', message: err.message });
        }
        res.status(200).json({ success: true, data: results });
    });
};

// Add a new book
exports.addBook = (req, res) => {
    const { title, author, genre, publication_date, isbn } = req.body;
    if (!title || !author || !isbn) {
        return res.status(400).json({ error: 'Missing required fields: title, author, and isbn are mandatory.' });
    }
    const query = `
        INSERT INTO Inventory (title, author, genre, publication_date, isbn)
        VALUES (?, ?, ?, ?, ?)
    `;
    connection.query(query, [title, author, genre, publication_date, isbn], (err, result) => {
        if (err) {
            console.error('Error adding book:', err.message);
            return res.status(500).json({ error: 'Error adding book', message: err.message });
        }
        res.status(201).json({ success: true, message: 'Book added successfully!', bookId: result.insertId });
    });
};

// Update a book
exports.updateBook = (req, res) => {
    const { id } = req.params;
    const { title, author, genre, publication_date, isbn } = req.body;
    if (!title || !author || !isbn) {
        return res.status(400).json({ error: 'Missing required fields: title, author, and isbn are mandatory.' });
    }
    const query = `
        UPDATE Inventory
        SET title = ?, author = ?, genre = ?, publication_date = ?, isbn = ?
        WHERE entry_id = ?
    `;
    connection.query(query, [title, author, genre, publication_date, isbn, id], (err, result) => {
        if (err) {
            console.error('Error updating book:', err.message);
            return res.status(500).json({ error: 'Error updating book', message: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json({ success: true, message: 'Book updated successfully!' });
    });
};

// Delete a book
exports.deleteBook = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Inventory WHERE entry_id = ?';
    connection.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error deleting book:', err.message);
            return res.status(500).json({ error: 'Error deleting book', message: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json({ success: true, message: 'Book deleted successfully!' });
    });
};