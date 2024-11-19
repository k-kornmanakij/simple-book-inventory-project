function fetchBooks() {
    fetch('/api/books')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const bookTableBody = document.querySelector('#books tbody');
            bookTableBody.innerHTML = '';
            if (data.success && data.data.length > 0) {
                data.data.forEach(book => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.genre || ''}</td>
                        <td>${new Date(book.publication_date).toISOString().split('T')[0] || ''}</td>
                        <td>${book.isbn}</td>
                        <td><button onclick="deleteBook(${book.entry_id})">Delete</button></td>
                    `;
                    bookTableBody.appendChild(row);
                });
            } else {
                const row = document.createElement('tr');
                row.innerHTML = '<td colspan="6">No books found</td>';
                bookTableBody.appendChild(row);
            }
        })
        .catch(err => console.error('Error fetching books:', err));
}

function deleteBook(id) {
    const confirmDelete = confirm('Are you sure you want to delete this book?');
    if (!confirmDelete) return;

    fetch(`/api/deleteBook/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Book deleted successfully!');
            fetchBooks(); // Refresh the book list
        } else {
            alert('Error deleting book: ' + data.message);
        }
    })
    .catch(err => console.error('Error deleting book:', err));
}

fetchBooks(); // Fetch books when the page loads

document.getElementById('addBookForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const genre = document.getElementById('genre').value;
    const publication_date = document.getElementById('publication_date').value;
    const isbn = document.getElementById('isbn').value;

    fetch('/api/addBook', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, author, genre, publication_date, isbn })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Book added successfully!');
            fetchBooks();
        } else {
            alert('Error adding book: ' + data.message);
        }
    })
    .catch(err => console.error('Error adding book:', err));
});

document.getElementById('clearFormButton').addEventListener('click', function () {
    document.getElementById('addBookForm').reset();
});