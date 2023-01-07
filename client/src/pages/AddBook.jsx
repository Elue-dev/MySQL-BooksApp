import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialState = {
  title: "",
  price: null,
  desc: "",
  cover: "",
};

export default function AddBook() {
  const [values, setValues] = useState(initialState);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const addBook = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8800/books", values);
      if (response) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { title, price, desc, cover } = values;

  return (
    <div className="form">
      <h1>Add New book</h1>
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
      <button onClick={addBook}>Add</button>
    </div>
  );
}
