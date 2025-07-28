// src/pages/DashboardPages/ContentManagement.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ContentManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [blogs, setBlogs] = useState([]);
  const [status, setStatus] = useState("all");

  useEffect(() => {
    axiosSecure.get(`/blogs?status=${status}`).then(res => setBlogs(res.data));
  }, [status, axiosSecure]);

  const handleStatusChange = async (id, newStatus) => {
    await axiosSecure.patch(`/blogs/${id}/status`, { status: newStatus });
    setBlogs((prev) =>
      prev.map((blog) =>
        blog._id === id ? { ...blog, status: newStatus } : blog
      )
    );
    Swal.fire("Success", `Blog status updated to ${newStatus}`, "success");
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#BB2B29",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/blogs/${id}`);
        setBlogs((prev) => prev.filter((blog) => blog._id !== id));
        Swal.fire("Deleted!", "Blog has been deleted.", "success");
      }
    });
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Content Management</h2>
        <Link to="/dashboard/content-management/add-blog">
          <button className="btn btn-primary">Add Blog</button>
        </Link>
      </div>
      <div className="mb-2">
        <label>Status: </label>
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="all">All</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map(blog => (
          <div key={blog._id} className="rounded-xl shadow-lg bg-white dark:bg-[#2d2d2d] p-4 flex flex-col">
            <img src={blog.thumbnail} alt={blog.title} className="rounded-lg h-40 object-cover mb-2" />
            <h3 className="text-lg font-bold mb-1">{blog.title}</h3>
            <div className="flex-1 mb-2 text-gray-600 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: blog.content.slice(0, 120) + "..." }} />
            <div className="flex items-center gap-2 mt-auto">
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${blog.status === "published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                {blog.status}
              </span>
              {blog.status === "draft" && (
                <button className="btn btn-xs" onClick={() => handleStatusChange(blog._id, "published")}>Publish</button>
              )}
              {blog.status === "published" && (
                <button className="btn btn-xs" onClick={() => handleStatusChange(blog._id, "draft")}>Unpublish</button>
              )}
              <button className="btn btn-xs" onClick={() => handleDelete(blog._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentManagement;