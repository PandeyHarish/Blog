import { useContext, useEffect, useState } from "react";
import defaultImage from "./assets/images/test.jpg";
import ThemeContext from "../context/ThemeContext";
import { useParams } from "react-router-dom";

const ViewBlog = () => {
  const { theme } = useContext(ThemeContext);
  const [blog, setBlog] = useState([]);

  const { id } = useParams();

  useEffect(() => {
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
        setBlog(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBlog();
  }, []);
  var imageUrl = blog.imageUrl;
  var image;
  if (imageUrl) {
    image = `http://localhost:5000/images/${imageUrl}`;
  } else {
    image = defaultImage;
  }
  const content = blog.content;

  return (
    <>
      <div className="flex align-middle justify-center  mt-12 mb-8">
        <div className={`w-full sm:w-[384px] md:w-[650px] rounded-md ${theme === "dark" ? "bg-[#344955]" : "bg-white"} p-6`}>
          <h3 className="font-bold text-3xl  my-3">{blog.title}</h3>
          <p className="my-4">
            by <span className="text-blue-600 font-bold">{blog.author_name}</span> | {new Date(blog.dateTime).toGMTString()}
          </p>
          <hr className="my-5" />
          <img src={image} alt="title" className="mt-5 mb-5 rounded-md w-full h-52 object-contain" />
          {}
          <p className="text-justify" dangerouslySetInnerHTML={{ __html: content }}></p>
        </div>
      </div>
    </>
  );
};

export default ViewBlog;
