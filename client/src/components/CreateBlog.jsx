import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import ThemeContext from "../context/ThemeContext";
import { useContext } from "react";

export default function CreateBlog() {
  const [content, setContent] = useState({ title: "", body: "" });
  const [image, setImage] = useState(null);

  const handleEditorChange = (content, editor) => {
    setContent((prevContent) => ({ ...prevContent, body: editor.getContent() }));
  };

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
      formData.append("tag", "test");
      formData.append("category", "category");

      const response = await fetch("http://127.0.0.1:5000/api/blogs/create", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // const data = await response.json();
        console.log("data saved"); // Log the response from the server

        // Reset the content and image state after submission if needed
        setContent({ title: "", body: "" });
        setImage(null);
      } else {
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const { theme } = useContext(ThemeContext);

  return (
    <div className="m-6 sm:ml-32 mt-12">
      <div className={`w-[650px] p-6  ${theme === "dark" ? "bg-[#344955]" : "bg-white"}`}>
        <h1 className="text-3xl">New Blog Post</h1>

        <form onSubmit={handleSubmit} className="mt-5">
          <input
            type="text"
            name="title"
            id="title"
            value={content.title}
            onChange={(e) => setContent({ ...content, title: e.target.value })}
            className={`w-full p-4 border outline-none rounded-md mb-4  ${theme === "dark" ? "bg-[#344955]" : "bg-white"}`}
          />
          <br />
          <input type="file" name="image" id="image" accept="image/*" onChange={handleImageChange} className="my-2" />
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
          <button type="submit" className="bg-indigo-700 hover:bg-indigo-800 px-4 py-2 mt-3 rounded-md">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
