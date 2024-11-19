# Book Inventory System

## Source Code

### Folder Structure
- **BookInventory/**
  - **node_modules/** (omitted in submission, generated via `npm install`)
  - **public/**
    - **index.html**: The main UI for the book inventory system.
    - **styles.css**: Basic styles for the UI.
    - **scripts.js**: Client-side JavaScript for API interactions.
  - **src/**
    - **config/**
      - **db.js**: Database connection configuration.
    - **controllers/**
      - **bookController.js**: Controller with CRUD operations.
    - **routes/**
      - **bookRoutes.js**: Routes for book management.
    - **app.js**: Main application entry.
    - **index.js**: Server start script.
  - **.env**: Environment variables for database and server configuration (not included in the repository).
  - **package.json**: Project dependencies and scripts.
  - **README.md**: Project documentation (this file).

### Database Script

To set up the MySQL database, use the following SQL script to create the `Inventory` table:

```sql
CREATE TABLE Inventory (
    entry_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    genre VARCHAR(100),
    publication_date DATE,
    isbn VARCHAR(20) NOT NULL
);
```

### Setup Instructions

1. **Install Dependencies**:
   - Make sure Node.js and MySQL are installed.
   - Run the following command to install project dependencies:
     ```bash
     npm install cors morgan
     ```
     ```bash
     npm install
     ```

2. **Environment Configuration**:
   - Create a `.env` file in the root directory with the following content:
     ```
     DB_HOST=localhost
     DB_USER=your_username
     DB_PASSWORD=your_password
     DB_NAME=BookInventoryDB
     DB_PORT=3306
     PORT=3000
     ```

3. **Run the Application**:
   - Start the server with:
     ```bash
     node src/index.js
     ```
   - Visit `http://localhost:3000` in your browser to access the book inventory system.

## Documentation

### How to Use the System

1. **View Books**: The main page shows a table of all books in the inventory. Click **Refresh Book List** to load the latest data.
2. **Add a Book**: Use the **Add a New Book** form to add new books to the inventory.
3. **Delete a Book**: Each book entry in the table has a **Delete** button to remove it from the inventory.

### Design Decisions
- **MySQL** was chosen as the database due to its robustness and ease of use for relational data.
- **Express.js** was used for building the server-side API because it is lightweight and straightforward.
- The **UI** was built with plain HTML, CSS, and JavaScript for simplicity and better understanding of front-end and back-end integration.

### Challenges Faced
- Handling date formatting across different layers (front-end and back-end) required additional care to ensure consistency in display.
- Proper validation and SQL injection prevention were implemented using prepared statements.

## Demo
- to be provided

