import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function AvailableBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/available-books")
      .then((res) => setBooks(res.data));
  }, []);

  return (
    <div>
      <h1>AvailableBooks</h1>
      <div className="grid gap-2 grid-cols-3 px-4">
        {books.map((book) => (
          <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 shadow-2xl">
            <img
              src={book.cover_image}
              alt={book.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-4 space-y-2">
              <h3 className="text-xl font-semibold text-gray-800">
                {book.title}
              </h3>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Author:</span> {book.author}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Genre:</span> {book.genre}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Pickup:</span> {book.location}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Available:</span> {book.quantity}{" "}
                copy{book.quantity > 1 ? "Yes" : "Not Available"}
              </p>
              <Link to={`/details/${book._id}`}>View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
