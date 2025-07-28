// src/pages/DashboardPages/AddBlog.jsx
import { useState } from "react";
import { useNavigate } from "react-router";
import JoditEditor from "jodit-react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddBlog = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [content, setContent] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    setUploading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGEBB_KEY}`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setThumbnail(data.data.url);
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axiosSecure.post("/blogs", { title, thumbnail, content });
    Swal.fire("Success", "Blog created!", "success");
    navigate("/dashboard/content-management");
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Title</label>
          <input className="input input-bordered w-full" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Thumbnail Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} required />
          {uploading && <span>Uploading...</span>}
          {thumbnail && <img src={thumbnail} alt="thumbnail" className="h-24 mt-2 rounded" />}
        </div>
        <div>
          <label>Content</label>
          <JoditEditor value={content} onChange={setContent} />
        </div>
        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    </div>
  );
};

export default AddBlog;