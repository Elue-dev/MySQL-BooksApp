import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    try {
      const { data } = await axios.get("http://localhost:8800/books");
      setBooks(data.books);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/books/${id}`);
      getBooks();
    } catch (err) {
      console.log(err);
    }
  };

  if (!books) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>Books</h1>
      <div className="books">
        {books.map((book) => (
          <div className="book" key={book.id}>
            {book.cover && <img src={book.cover} alt={book.title} />}
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <p>${book.price}</p>
            <button className="delete" onClick={() => handleDelete(book.id)}>
              Delete
            </button>
            <button className="update">
              <Link
                to={`/update-book/${book.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Update
              </Link>
            </button>
          </div>
        ))}
      </div>
      <button className="addHome">
        <Link
          to="/add-book"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          Add new book
        </Link>
      </button>
    </div>
  );
}
