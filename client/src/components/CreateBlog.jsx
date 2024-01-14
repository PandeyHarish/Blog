import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import ThemeContext from "../context/ThemeContext";
import { useContext } from "react";

export default function CreateBlog() {
  const [content, setContent] = useState("");

  const handleEditorChange = (e) => {
    setContent({ ...content, [e.target.name]: e.target.value });
  };
  const key = import.meta.env.VITE_tinymce_key;
  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can handle the form submission.
    // You might want to send the content to your server here.
    console.log(content);
    // Reset the content after submission if needed
    setContent("");
  };
  const { theme } = useContext(ThemeContext);
  return (
    <div className="m-6 sm:ml-32 mt-12">
      <div className={`w-[650px] p-6  ${theme === "dark" ? "bg-[#344955]" : "bg-white"}`}>
        <h1 className="text-3xl">New Blog Post</h1>

        <form onSubmit={handleSubmit} className="mt-5 ">
          <input type="text" name="title" id="title" className={`w-full p-4 border outline-none rounded-md mb-4  ${theme === "dark" ? "bg-[#344955]" : "bg-white"}`} />
          <br />
          <input type="file" name="image" id="image" accept="image/*"  className="my-2"/>
          <Editor
            apiKey={key}
            initialValue={content}
            init={{
              plugins:
                "mentions anchor autolink charmap codesample emoticons  lists  searchreplace table visualblocks wordcount checklist  casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
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
