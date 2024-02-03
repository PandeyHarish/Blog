import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ThemeContext from "../context/ThemeContext";
import { useLogin } from "../context/LoginContext";
import { useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function CreateBlog(props) {
  const [content, setContent] = useState({ title: "", tag: "", category: "" });
  const [editorValue, setEditorValue] = useState("");
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const { isLoggedIn } = useLogin();
  const { theme } = useContext(ThemeContext);
  const history = useNavigate();
  const { userId, author_name, showAlert } = props;
  const [preview, setPreview] = useState();

  // text editor toolbars and modules
  var toolbarOptions = [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ align: [] }],
    ["clean"], // remove formatting button
  ];

  const module = {
    toolbar: toolbarOptions,
  };
  // toolbar and modules end

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!image) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", content.title);
      formData.append("content", editorValue);
      formData.append("image", image);
      formData.append("author", userId);
      formData.append("author_name", author_name);
      formData.append("tag", content.tag);
      formData.append("category", content.category);

      const response = await fetch("http://127.0.0.1:5000/api/blogs/create", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Reset the content and image state after submission if needed
        setContent({ title: "", body: "", tag: "", category: "" });
        setImage(null);
        history("/me");
        showAlert("Created successfully", "success");
      } else {
        showAlert("Please check the fields", "warning");
      }
    } catch (error) {
      showAlert("Error submitting", "error");
    }
  };
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="m-6  mt-12 flex item-center justify-center ">
      <div className={`p-6 rounded-lg   ${theme === "dark" ? "bg-[#344955]" : "bg-white"}`}>
        <h1 className="text-3xl">New Blog Post</h1>

        <form onSubmit={handleSubmit} className="mt-5">
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 ">
              <input
                type="text"
                name="title"
                id="title"
                value={content.title}
                onChange={(e) => setContent({ ...content, title: e.target.value })}
                className={`w-full p-4 border outline-none rounded-md mb-4  ${theme === "dark" ? "bg-[#344955]" : "bg-white"}`}
                placeholder="Enter the title"
              />
              <input
                type="text"
                name="tag"
                id="tag"
                value={content.tag}
                onChange={(e) => setContent({ ...content, tag: e.target.value })}
                className={`w-full p-4 border outline-none rounded-md mb-4  ${theme === "dark" ? "bg-[#344955]" : "bg-white"}`}
                placeholder="Enter the tag"
              />
              <input
                type="text"
                name="category"
                id="category"
                value={content.category}
                onChange={(e) => setContent({ ...content, category: e.target.value })}
                className={`w-full p-4 border outline-none rounded-md mb-4  ${theme === "dark" ? "bg-[#344955]" : "bg-white"}`}
                placeholder="Enter the category"
              />
              <input type="file" name="image" id="image" accept="image/*" onChange={handleImageChange} className="my-2" />
              <br />
              {/* image preview */}

              {image && (
                <div>
                  <img src={preview} alt="" className="w-44 object-contain" />
                </div>
              )}
            </div>

            <div className="flex-1 ">
              <ReactQuill
                className="bg-white text-black"
                modules={module}
                value={editorValue}
                theme="snow"
                onChange={(editorValue) => setEditorValue(editorValue)}
              />

              <button type="submit" className="bg-indigo-700 text-white hover:bg-indigo-800 px-4 py-2 mt-5    rounded-md">
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

CreateBlog.propTypes = {
  userId: PropTypes.string,
  author_name: PropTypes.string,
  showAlert: PropTypes.func,
};
