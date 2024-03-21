let books = []; // Temporary data store for books

// Get all books
const getBooks = (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(books));
};

// Create a new book
const postBooks = (req, res) => {
  const { title, author, pages } = req.body;
  const newBook = { title, author, pages };
  books.push(newBook);
  res.statusCode = 201;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(newBook));
};

// Update a book
const putBooks = (req, res) => {
  const bookId = parseInt(req.url.split("/")[2]);
  const { title, author, pages } = req.body;
  const bookIndex = books.findIndex((book) => book.id === bookId);
  if (bookIndex !== -1) {
    books[bookIndex] = { id: bookId, title, author, pages };
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(books[bookIndex]));
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Book not found" }));
  }
};

// Patch (partially update) a book
const patchBooks = (req, res) => {
  const bookId = parseInt(req.url.split("/")[2]);
  const { title, author, pages } = req.body;
  const bookIndex = books.findIndex((book) => book.id === bookId);
  if (bookIndex !== -1) {
    if (title) books[bookIndex].title = title;
    if (author) books[bookIndex].author = author;
    if (pages) books[bookIndex].pages = pages;
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(books[bookIndex]));
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Book not found" }));
  }
};

// Delete a book
const deleteBooks = (req, res) => {
  const bookId = parseInt(req.url.split("/")[2]);
  const bookIndex = books.findIndex((book) => book.id === bookId);
  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    res.statusCode = 204;
    res.end();
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Book not found" }));
  }
};

module.exports = { getBooks, postBooks, putBooks, patchBooks, deleteBooks };
