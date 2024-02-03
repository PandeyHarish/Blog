import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";

const BlogItem = () => {
  const [data, setData] = useState([]);
  const maxWords = 50; // Set desired maximum number of words to display in the card

  // Function to limit the number of words in the content
  const limitWords = (text, maxWords) => {
    const words = text.split(/\s+/);
    return words.slice(0, maxWords).join(" ");
  };

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/blogs/fetcharticles`, {
        method: "GET",
      });
      const parsedData = await response.json();
      return parsedData;
    } catch (error) {
      console.error("Error fetching blogs:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await fetchBlogs();

      // Update the content with a limited number of words for each blog
      const updatedData = fetchedData.map((blog) => ({
        ...blog,
        content: limitWords(blog.content, maxWords),
      }));

      setData(updatedData);
    };

    fetchData();
  }, [maxWords]);

  return (
    <>
      <div>
        {data.map((blog) => (
          <div key={blog._id}>
            <BlogCard
              title={blog.title}
              id={blog._id}
              content={blog.content}
              imageUrl={blog.imageUrl}
              author={blog.author_name}
              timestamp={blog.dateTime}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default BlogItem;
