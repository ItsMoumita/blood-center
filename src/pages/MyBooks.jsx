import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../providers/AuthProvider";

export default function MyBooks() {
  const { user } = useContext(AuthContext);
  const [myBooks, setMyBooks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get(`/my-books?page=${page}&filter=${filter}`).then((res) => {
      setMyBooks(res.data.books);
      setTotalPages(Math.ceil(res.data.totalCount / 3));
    });
  }, [user, page, filter]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600">
          📚 My Books
        </h2>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="available">Available</option>
          <option value="requested">Requested</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200">
          <thead className="bg-gray-100">
            <tr className="text-left text-sm text-gray-700">
              <th className="p-3">#</th>
              <th className="p-3">Cover</th>
              <th className="p-3">Title</th>
              <th className="p-3">Author</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {myBooks.map((book, index) => (
              <tr key={book._id} className="border-t hover:bg-gray-50">
                <td className="p-3">{index + 1 + (page - 1) * 3}</td>
                <td className="p-3">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="p-3">{book.title}</td>
                <td className="p-3">{book.author}</td>
                <td className="p-3 capitalize text-blue-600">{book.status}</td>
                <td className="p-3 flex gap-3 items-center">
                  <button
                    title="View"
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => (window.location.href = `/book/${book._id}`)}
                  ></button>
                  <button
                    title="Edit"
                    className="text-green-500 hover:text-green-700"
                    onClick={() =>
                      (window.location.href = `/dashboard/update-book/${book._id}`)
                    }
                  >
                    {/* <Pencil size={18} /> */}
                  </button>
                  <button
                    title="Delete"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(book._id)}
                  >
                    {/* <Trash2 size={18} /> */}
                  </button>
                </td>
              </tr>
            ))}
            {myBooks.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-5 text-gray-500">
                  No books added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {myBooks.length > 0 && (
        <div className="mt-4 flex justify-center items-center gap-2">
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setPage(idx + 1)}
              className={`px-3 py-1 rounded border ${
                page === idx + 1 ? "bg-blue-600 text-white" : "bg-white"
              }`}
            >
              {idx + 1}
            </button>
          ))}

          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
