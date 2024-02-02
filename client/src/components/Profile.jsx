import { Link, useNavigate } from "react-router-dom";
import ThemeContext from "../context/ThemeContext";
import { useContext, useEffect, useState } from "react";
import { useLogin } from "../context/LoginContext";
import parse from "html-react-parser";
import PropTypes from "prop-types";

const Profile = ({ showAlert }) => {
  const { theme } = useContext(ThemeContext);
  const { isLoggedIn } = useLogin();
  const [user, setUser] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("auth-token");
  const fetchInfo = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/auth/user/getuser", {
        method: "POST",
        headers: { "auth-token": token },
      });
      const parsedData = await res.json();
      setUser(parsedData);
    } catch (error) {
      console.error(error);
    }
  };
  const deleteBlog = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/blogs/deleteblog/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
      });

      const newBLogs = blogs.filter((blogs) => {
        return blogs._id !== id;
      });
      setBlogs(newBLogs);
      if (res.ok) {
        showAlert("Blog deleted successfully", "error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const viewblog = (id) => {
    history(`/view/${id}`);
  };

  const fetchBlogs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/blogs/fetchuserblogs", {
        method: "POST",
        headers: { "auth-token": token },
      });
      const parsedResponse = await res.json();
      setBlogs(parsedResponse);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchInfo();
    fetchBlogs();
    //eslint-disable-next-line
  }, []);

  if (isLoggedIn) {
    return (
      <>
        <div className={`mx-4 sm:mx-8 md:mx-16 lg:mx-32 my-8 p-6 rounded-lg ${theme === "dark" ? "bg-[#344955]" : "bg-white"}`}>
          <div className="flex flex-col sm:flex-row justify-between mb-5">
            <div className="flex flex-wrap items-center mb-4 sm:mb-0">
              <div>
                <h1 className="text-3xl font-bold">{user.username}</h1>
                <h4 className="text-xl">{user.email}</h4>
              </div>
              <div className="bg-indigo-500 my-2 sm:my-0 sm:ml-2 p-4 text-white rounded-md">
                <h1 className="font-bold text-2xl">No. Of Articles 8</h1>
              </div>
            </div>
            <div>
              <Link to={`/new`}>
                <i className="ri-add-circle-fill text-white bg-indigo-700 p-2 text-3xl rounded-md hover:bg-indigo-800"></i>
              </Link>
            </div>
          </div>
          <hr />
          {/* card div */}
          <h3 className="text-2xl font-semibold my-5">Articles</h3>
          {blogs.map((blog) => {
            return (
              <div className="my-4" key={blog._id}>
                <div className={`p-4 sm:w-[384px]  md:w-[500px] lg:w-[650px] border ${theme === "dark" ? "bg-[#344955]" : "bg-white"} rounded-md`}>
                  <div className="flex justify-between">
                    <h3 className="font-bold text-2xl hover:text-blue-600 cursor-pointer" onClick={() => viewblog(blog._id)}>
                      {blog.title}
                    </h3>
                    <div className="">
                      <i className="ri-file-edit-line text-xl cursor-pointer bg-green-600 p-2 rounded-md hover:bg-green-700"></i>
                      <i
                        className="ri-delete-bin-line text-xl cursor-pointer ml-4 bg-red-500 p-2 rounded-md hover:bg-red-700"
                        onClick={() => deleteBlog(blog._id)}
                      ></i>
                    </div>
                  </div>
                  <p className="py-3">
                    by <span className="text-[#366bea] font-medium">{blog.author_name}</span> : {new Date(blog.dateTime).toGMTString()}
                  </p>
                  <div className="sm:flex">
                    <img
                      src={`http://localhost:5000/images/${blog.imageUrl}`}
                      alt=""
                      className="w-full sm:w-[145px] h-[200px] sm:h-[100px] rounded-md"
                    />
                    <div className="px-2 mt-4 sm:mt-0">{parse(blog.content)}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  } else {
    navigate("/login");
    return null; // Add a return statement here to avoid potential errors
  }
};

export default Profile;

Profile.propTypes = {
  showAlert: PropTypes.func,
};
