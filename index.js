let books = require('./books.json');
const express = require('express');
const app = express();
const PORT = 4000

// Middleware
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Listening on port: http://localhost:${PORT}`);
});

// Gets all the books
app.get('/', (req, res) => {
    res.send(books);
});

// Gets a certain book by id
app.get('/:id', (req, res) => {
    const { id } = req.params;
    res.send(books.find(book => book.id === parseInt(id)));
});

// Adds a new book
app.post('/', (req, res) => {
    const newBook = req.body;
    const lastId = books.slice(-1)[0].id
    if (newBook.hasOwnProperty('title' && 'author')) {
        books.push({ id: lastId + 1, ...newBook })
        res.statusCode = 201;
        res.send(`${newBook.title} was added.`);
    } else {
        res.statusCode = 406;
        res.send(`Book's need to include Title and Author.`);
    }
});

// Updates a certain book by id
app.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { title, author, year} = req.body;
    const book = books.find(book => book.id === parseInt(id));
    if (title) book.title = title;
    if (author) book.author = author;
    if (year) book.year = year;
    res.send(`The book "${book.title}" has been updated.`);
});

// Deletes a certain book by id
app.delete('/:id', (req, res) => {
    const { id } = req.params;
    books = books.filter(book => book.id != parseInt(id))
    res.send(`The book with the id of ${id} has been deleted.`);
});

// module.exports = app;

// "nodemon index.js" to start app
// Postman to use app