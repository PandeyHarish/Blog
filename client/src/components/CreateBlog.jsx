import { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import ThemeContext from "../context/ThemeContext";
import { useLogin } from "../context/LoginContext";
import { useContext } from "react";

export default function CreateBlog() {
  const [content, setContent] = useState({ title: "", body: "", tag: "", category: "" });
  const [image, setImage] = useState(null);
  const { isLoggedIn } = useLogin();

  const handleEditorChange = (content, editor) => {
    setContent((prevContent) => ({ ...prevContent, body: editor.getContent() }));
  };
  const [preview, setPreview] = useState();

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

  const key = import.meta.env.VITE_tinymce_key;
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", content.title);
      formData.append("content", content.body);
      formData.append("image", image);
      formData.append("author", "659cd84248e26c9728945cd6");
      formData.append("tag", content.tag);
      formData.append("category", content.category);

      const response = await fetch("http://127.0.0.1:5000/api/blogs/create", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // const data = await response.json();
        console.log("data saved"); // Log the response from the server

        // Reset the content and image state after submission if needed
        setContent({ title: "", body: "", tag: "", category: "" });
        setImage(null);
      } else {
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const { theme } = useContext(ThemeContext);

  if (isLoggedIn) {
    return (
      <div className="m-6  mt-12 flex item-center justify-center">
        <div className={` p-6 rounded-lg   ${theme === "dark" ? "bg-[#344955]" : "bg-white"}`}>
          <h1 className="text-3xl">New Blog Post</h1>

          <form onSubmit={handleSubmit} className="mt-5">
            <div className="flex gap-4">
              <div className="flex-1">
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

              <div className="flex-1 relative">
                <button type="submit" className="bg-indigo-700 hover:bg-indigo-800 px-4 py-2 absolute -mt-14 right-4 rounded-md">
                  Create
                </button>
                <Editor
                  apiKey={key}
                  value={content.body}
                  init={{
                    direction: "ltr",
                    plugins:
                      "mentions anchor autolink charmap codesample emoticons  lists  searchreplace table visualblocks wordcount checklist  casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode tableofcontents  powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
                    toolbar:
                      "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                    menubar: false,
                  }}
                  onEditorChange={handleEditorChange}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    window.location.href = "/login";
  }
}
