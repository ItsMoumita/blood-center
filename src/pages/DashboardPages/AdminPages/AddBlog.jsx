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
    <div className="min-h-screen w-full bg-gradient-to-b from-[#530404]/80 to-[#FFE8E8] dark:from-[#0F172A] dark:to-[#000000] flex items-center justify-center py-8">
      <div className="w-full max-w-2xl mx-auto bg-white dark:bg-[#273a57] rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-8 text-center text-[#BB2B29] dark:text-[#FFE8E8]">Add Blog</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            className="w-full bg-[#f5f5f5] dark:bg-[#1a2233] rounded-lg py-4 px-4 text-[#530404] dark:text-[#FFE8E8] placeholder-gray-400 focus:outline-none"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            placeholder="Title"
          />
          <div>
            <label className="block mb-2 text-[#530404] dark:text-[#FFE8E8] font-semibold">Thumbnail Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              required
              className="w-full bg-[#f5f5f5] dark:bg-[#1a2233] rounded-lg py-3 px-4 text-[#530404] dark:text-[#FFE8E8] focus:outline-none"
            />
            {uploading && <span className="text-[#BB2B29] ml-2">Uploading...</span>}
            {thumbnail && <img src={thumbnail} alt="thumbnail" className="h-24 mt-2 rounded-lg shadow" />}
          </div>
          <div>
            <label className="block mb-2 text-[#530404] dark:text-[#FFE8E8] font-semibold">Content</label>
            <div className="bg-[#f5f5f5] dark:bg-[#1a2233] rounded-lg p-2">
              <JoditEditor
                value={content}
                onChange={setContent}
                config={{
                  readonly: false,
                  height: 250,
                  theme: "default",
                  toolbarAdaptive: false,
                  toolbarSticky: false,
                  showCharsCounter: false,
                  showWordsCounter: false,
                  showStatusbar: false,
                  buttons: [
                    "bold", "italic", "underline", "ul", "ol", "outdent", "indent", "font", "fontsize", "brush", "paragraph",
                    "image", "table", "link", "align", "undo", "redo"
                  ]
                }}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-4 rounded-lg bg-[#E53935] text-white font-bold uppercase tracking-wider text-lg hover:bg-[#bb2b29] transition"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;