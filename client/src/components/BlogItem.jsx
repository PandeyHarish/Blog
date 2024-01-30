import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
// import parse from "html-react-parser";

const BlogItem = () => {
  const [data, setData] = useState([]);
 
  // const host = import.meta.env.VITE_localhost;
  const fetchBlogs = async () => {
    const response = await fetch(`http://localhost:5000/api/blogs/fetcharticles`, {
      method: "GET",
    });
    const parsedData = await response.json();
    setData(parsedData);
   
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    
    <>
    
      <div>
        {
          data.map((blog)=>{
           
           return (
             <div key={blog._id}>
               <BlogCard
                 title={blog.title}
                 content={blog.content}
                 imageUrl={blog.imageUrl}
                 author={blog.author_name}
                 timestamp={blog.dateTime}
               />
             </div>
           );
          })
        }
      </div>
    </>
  );
};

export default BlogItem;
