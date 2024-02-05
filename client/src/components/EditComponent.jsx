import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ThemeContext from "../context/ThemeContext";
import { useLogin } from "../context/LoginContext";
import { useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";

export default function EditBlog(props) {
  const [content, setContent] = useState({ title: "", tag: "", category: "" });
  const [editorValue, setEditorValue] = useState("");
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const { isLoggedIn } = useLogin();
  const { theme } = useContext(ThemeContext);
  const history = useNavigate();
  const { showAlert } = props;
  const [preview, setPreview] = useState();

  const { id } = useParams();

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

  // create a preview as a side effect, whenever the selected file is changed
  useEffect(() => {
    if (!image) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    // free memory whenever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // fetching the blog to update
  const fetchBlog = async () => {
    try {
      const url = `http://localhost:5000/api/blogs/view/${id}`;

      const response = await fetch(url, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Blog not found");
      }

      const data = await response.json();
      setContent(data);
      setEditorValue(data.content);
    } catch (error) {
      console.error(error);
    }
  };

  // update handler
  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", content.title);
      formData.append("content", editorValue);
      formData.append("tag", content.tag);
      formData.append("category", content.category);
      formData.append("image", image);

      const response = await fetch(`http://localhost:5000/api/blogs/edit/${id}`, {
        method: "PUT",
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
        body: formData,
      });

      if (response.ok) {
        // Reset the content and image state after submission if needed
        setContent({ title: "", tag: "", category: "" });
        setEditorValue("");
        setImage(null);
        history("/me");
        showAlert("Updated successfully", "success");
      } else {
        const responseData = await response.json();
        showAlert(responseData.error || "Please check the fields", "warning");
      }
    } catch (error) {
      showAlert("Error submitting", "error");
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
    fetchBlog();
  }, []);

  return (
    <div className="m-6 mt-12 flex item-center justify-center">
      <div className={`p-6 rounded-lg ${theme === "dark" ? "bg-[#344955]" : "bg-white"}`}>
        <h1 className="text-3xl">Edit Blog Post</h1>

        <form onSubmit={handleUpdate} className="mt-5">
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1">
              <input
                type="text"
                name="title"
                id="title"
                value={content.title}
                onChange={(e) => setContent({ ...content, title: e.target.value })}
                className={`w-full p-4 border outline-none rounded-md mb-4 ${theme === "dark" ? "bg-[#344955]" : "bg-white"}`}
                placeholder="Enter the title"
              />
              <input
                type="text"
                name="tag"
                id="tag"
                value={content.tag}
                onChange={(e) => setContent({ ...content, tag: e.target.value })}
                className={`w-full p-4 border outline-none rounded-md mb-4 ${theme === "dark" ? "bg-[#344955]" : "bg-white"}`}
                placeholder="Enter the tag"
              />
              <input
                type="text"
                name="category"
                id="category"
                value={content.category}
                onChange={(e) => setContent({ ...content, category: e.target.value })}
                className={`w-full p-4 border outline-none rounded-md mb-4 ${theme === "dark" ? "bg-[#344955]" : "bg-white"}`}
                placeholder="Enter the category"
              />
              <input type="file" name="image" id="image" accept="image/*" onChange={handleImageChange} className="my-2" />
              <br />
              {/* image preview */}

              {image && (
                <div>
                  <img src={preview} alt={content.title} className="w-44 object-contain" />
                </div>
              )}
            </div>

            <div className="flex-1">
              <ReactQuill
                className="bg-white text-black"
                modules={module}
                value={editorValue}
                theme="snow"
                onChange={(value) => setEditorValue(value)}
              />

              <button type="submit" className="bg-indigo-700 text-white hover:bg-indigo-800 px-4 py-2 mt-5 rounded-md">
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

EditBlog.propTypes = {
  showAlert: PropTypes.func,
};
