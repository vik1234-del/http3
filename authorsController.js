let authors = []; // Temporary data store for authors

// Get all authors
const getAuthors = (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(authors));
};

// Create a new author
const postAuthor = (req, res) => {
  const { name, nationality, birthYear } = req.body;
  const newAuthor = { name, nationality, birthYear };
  authors.push(newAuthor);
  res.statusCode = 201;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(newAuthor));
};

// Update an author
const putAuthors = (req, res) => {
  const authorId = parseInt(req.url.split("/")[2]);
  const { name, nationality, birthYear } = req.body;
  const authorIndex = authors.findIndex((author) => author.id === authorId);
  if (authorIndex !== -1) {
    authors[authorIndex] = { id: authorId, name, nationality, birthYear };
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(authors[authorIndex]));
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Author not found" }));
  }
};

// Patch (partially update) an author
const patchAuthors = (req, res) => {
  const authorId = parseInt(req.url.split("/")[2]);
  const { name, nationality, birthYear } = req.body;
  const authorIndex = authors.findIndex((author) => author.id === authorId);
  if (authorIndex !== -1) {
    if (name) authors[authorIndex].name = name;
    if (nationality) authors[authorIndex].nationality = nationality;
    if (birthYear) authors[authorIndex].birthYear = birthYear;
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(authors[authorIndex]));
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Author not found" }));
  }
};

// Delete an author
const deleteAuthors = (req, res) => {
  const authorId = parseInt(req.url.split("/")[2]);
  const authorIndex = authors.findIndex((author) => author.id === authorId);
  if (authorIndex !== -1) {
    authors.splice(authorIndex, 1);
    res.statusCode = 204;
    res.end();
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Author not found" }));
  }
};

module.exports = {
  getAuthors,
  postAuthor,
  putAuthors,
  patchAuthors,
  deleteAuthors,
};
