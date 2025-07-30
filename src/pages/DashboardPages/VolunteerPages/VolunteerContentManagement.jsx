import { useEffect, useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/ExtraComponents/Loading";

const ContentManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [blogs, setBlogs] = useState([]);
  const [status, setStatus] = useState("all");
    const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosSecure.get(`/blogs?status=${status}`).then(res => setBlogs(res.data));
  }, [status, axiosSecure]);


if(loading) return <Loading></Loading>
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#530404]/80 to-[#FFE8E8] dark:from-[#0F172A] dark:to-[#000000] p-4">
      <div className="max-w-7xl p-8 md:p-12 mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#FFE8E8]">Content Management</h2>
          {/* <Link to="/dashboard/content-management/add-blog">
            <button className="btn bg-[#BB2B29] text-white font-bold uppercase rounded-lg px-6 py-2 hover:bg-[#E53935] transition">
              Add Blog
            </button>
          </Link> */}
        </div>
        <div className="mb-6 md:mb-12 mt-6 flex flex-col sm:flex-row sm:items-center gap-2">
          <label className="text-[#FFE8E8] font-semibold ">Status:</label>
          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="select select-bordered w-full sm:w-48 bg-white dark:bg-[#f3f3f3] text-[#530404] dark:text-[#BB2B29] border-[#BB2B29] dark:border-[#FFE8E8]"
          >
            <option value="all">All</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map(blog => (
            <div key={blog._id} className="bg-white dark:bg-[#273a57] rounded-2xl shadow-lg p-4 flex flex-col">
              <img src={blog.thumbnail} alt={blog.title} className="rounded-lg h-40 object-cover mb-4" />
              <h3 className="text-lg font-bold mb-2 text-[#BB2B29] dark:text-[#FFE8E8]">{blog.title}</h3>
              <div
                className="flex-1 mb-4 text-[#530404] dark:text-[#FFE8E8] text-sm"
                dangerouslySetInnerHTML={{ __html: blog.content.slice(0, 120) + "..." }}
              />
              {/* <div className="flex items-center gap-2 mt-auto">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${blog.status === "published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                  {blog.status}
                </span>
                {blog.status === "draft" && (
                  <button className="btn btn-xs bg-[#E53935] text-white rounded hover:bg-[#bb2b29]" onClick={() => handleStatusChange(blog._id, "published")}>Publish</button>
                )}
                {blog.status === "published" && (
                  <button className="btn btn-xs bg-[#ECAAA0] text-[#530404] rounded hover:bg-[#FFE8E8]" onClick={() => handleStatusChange(blog._id, "draft")}>Unpublish</button>
                )}
                <button className="btn btn-xs bg-[#BB2B29] text-white rounded hover:bg-[#ECAAA0] hover:text-[#530404]" onClick={() => handleDelete(blog._id)}>Delete</button>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentManagement;