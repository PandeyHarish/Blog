import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Editor = () => {
  const [editorValue, setEditorValue] = useState("");

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
 
  return (
    <>
      <ReactQuill
        className="bg-white text-black"
        modules={module}
        value={editorValue}
        theme="snow"
        onChange={(editorValue) => setEditorValue(editorValue)}
      />
    </>
  );
};

export default Editor;
