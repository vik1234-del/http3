const http = require("http");
const PORT = 5050;
const booksController = require("./booksController");
const authorsController = require("./authorsController");
const { findUser } = require("./db.user");

function getBodyFromString(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      resolve(body ? JSON.parse(body) : {});
    });
    req.on("error", (err) => {
      reject(err);
    });
  });
}

function authenticate(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    res.statusCode = 401;
    res.end();
    return;
  }
  const [username, password] = Buffer.from(
    authorization.split(" ")[1],
    "base64"
  )
    .toString()
    .split(":");
  const user = findUser(username);
  if (!user || user.password !== password) {
    res.statusCode = 403;
    res.end();
    return;
  }
  next(req, res);
}

const server = http.createServer(async (req, res) => {
  try {
    const body = await getBodyFromString(req);
    req.body = body;

    // Books endpoints
    if (req.url === "/books" && req.method === "GET") {
      authenticate(req, res, booksController.getBooks);
    }
    if (req.url === "/books" && req.method === "POST") {
      booksController.postBooks(req, res);
    }
    if (req.url.startsWith("/books/") && req.method === "PUT") {
      booksController.putBooks(req, res);
    }
    if (req.url.startsWith("/books/") && req.method === "PATCH") {
      booksController.patchBooks(req, res);
    }
    if (req.url.startsWith("/books/") && req.method === "DELETE") {
      booksController.deleteBooks(req, res);
    }

    // Authors endpoints
    if (req.url === "/authors" && req.method === "GET") {
      authenticate(req, res, authorsController.getAuthors);
    }
    if (req.url === "/authors" && req.method === "POST") {
      authorsController.postAuthor(req, res);
    }
    if (req.url.startsWith("/authors/") && req.method === "PUT") {
      authorsController.putAuthors(req, res);
    }
    if (req.url.startsWith("/authors/") && req.method === "PATCH") {
      authorsController.patchAuthors(req, res);
    }
    if (req.url.startsWith("/authors/") && req.method === "DELETE") {
      authorsController.deleteAuthors(req, res);
    }
  } catch (error) {
    res.statusCode = 500;
    res.end(error.message);
  }
});

server.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});
