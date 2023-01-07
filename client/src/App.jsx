import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddBook from "./pages/AddBook";
import Books from "./pages/Books";
import UpdateBook from "./pages/UpdateBook";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/update-book/:bookID" element={<UpdateBook />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
