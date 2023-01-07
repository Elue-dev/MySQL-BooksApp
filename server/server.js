const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: ["http://127.0.0.1:5174"],
    credentials: true,
  })
);

app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.get("/books", (req, res) => {
  const query = "SELECT * FROM test.books";
  db.query(query, (error, data) => {
    if (error) {
      return res.status(500).json({
        status: "fail",
        error,
      });
    }
    return res.status(200).json({
      status: "success",
      books: data,
    });
  });
});

app.get("/books/:bookID", (req, res) => {
  const bookID = req.params.bookID;

  const query = "SELECT * FROM test.books WHERE id = ?";
  db.query(query, [bookID], (error, data) => {
    if (error) {
      return res.status(500).json({
        status: "fail",
        error,
      });
    }
    return res.status(200).json({
      status: "success",
      book: data,
    });
  });
});

app.post("/books", (req, res) => {
  const query =
    "INSERT INTO `test`.`books` (`title`, `desc`, `cover`, `price`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.desc,

    req.body.cover,
    req.body.price,
  ];

  db.query(query, [values], (error, data) => {
    if (error) {
      return res.status(500).json({
        status: "fail",
        error,
      });
    }
    return res.status(201).json({
      status: "success",
      message: "Book created successfully",
    });
  });
});

app.put("/books/:bookID", (req, res) => {
  const bookID = req.params.bookID;

  const query =
    "UPDATE `test`.`books` SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(query, [...values, bookID], (error, data) => {
    if (error) {
      return res.status(500).json({
        status: "fail",
        error,
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Book has updated successfully",
    });
  });
});

app.delete("/books/:bookID", (req, res) => {
  const bookID = req.params.bookID;

  const query = "DELETE FROM test.books WHERE id = ?";

  db.query(query, [bookID], (error, data) => {
    if (error) {
      return res.status(500).json({
        status: "fail",
        error,
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Book has been deleted",
    });
  });
});

const PORT = 8800;

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
