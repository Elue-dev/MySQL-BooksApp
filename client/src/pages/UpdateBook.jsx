import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const initialState = {
  title: "",
  price: "",
  desc: "",
  cover: "",
};

export default function UpdateBook() {
  const [values, setValues] = useState([]);
  const navigate = useNavigate();
  const { bookID } = useParams();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    const getSingleBook = async (e) => {
      try {
        const { data } = await axios.get(
          `http://localhost:8800/books/${bookID}`,
          values
        );
        setValues(data.book[0]);
      } catch (error) {
        console.log(error);
      }
    };

    getSingleBook();
  }, []);

  const addBook = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:8800/books/${bookID}`,
        values
      );
      if (response) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { title, price, desc, cover } = values;

  if (!values) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="form">
      <h1>Update book</h1>
      <input
        type="text"
        name="title"
        value={title}
        onChange={handleInputChange}
        placeholder="Book title"
      />
      <input
        type="number"
        name="price"
        value={price}
        onChange={handleInputChange}
        placeholder="Book price"
      />
      <input
        type="text"
        name="desc"
        value={desc}
        onChange={handleInputChange}
        placeholder="Book description"
      />
      <input
        type="cover"
        name="cover"
        value={cover}
        onChange={handleInputChange}
        placeholder="Book cover"
      />
      <button onClick={addBook}>Update</button>
    </div>
  );
}
