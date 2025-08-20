import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/ExtraComponents/Loading";

const Blog = () => {
  // You can use axiosPublic if you want this page to be public
  const axios = useAxiosSecure();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios.get("/blogs").then(res => setBlogs(res.data));
    setLoading(false)
  }, []);

  if(loading) return <Loading></Loading>

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#87CEEB] via-[#F5F5F5] to-[#FFE8E8]/20 dark:from-[#0F172A] dark:via-[#0d1424] dark:to-[#000000]  transition-colors duration-300 p-4">
      <div className="max-w-7xl p-8 md:p-12 mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold text-[#BB2B29] dark:text-[#FFE8E8] mb-8 text-center">Our Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map(blog => (
            <div key={blog._id} className="bg-white dark:bg-[#273a57] rounded-2xl shadow-lg p-4 flex flex-col">
              <img src={blog.thumbnail} alt={blog.title} className="rounded-lg h-40 object-cover mb-4" />
              <h3 className="text-lg font-bold mb-2 text-[#BB2B29] dark:text-[#FFE8E8]">{blog.title}</h3>
              <div
                className="flex-1 mb-4 text-[#530404] dark:text-[#FFE8E8] text-sm"
                dangerouslySetInnerHTML={{ __html: blog.content.slice(0, 120) + "..." }}
              />
              <div className="flex items-center gap-2 mt-auto">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${blog.status === "published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                  {blog.status}
                </span>
               
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;