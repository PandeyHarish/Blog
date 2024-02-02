import ThemeContext from "../context/ThemeContext";
import { useContext } from "react";
import PropTypes from "prop-types";
import defaultImage from "../components/assets/images/test.jpg";
import { useNavigate } from "react-router-dom";

const BlogCard = (props) => {
  const { title, author, content, imageUrl, timestamp, id } = props;
  const { theme } = useContext(ThemeContext);
  const history = useNavigate();
  var image;
  if (imageUrl) {
    image = `http://localhost:5000/images/${imageUrl}`;
  } else {
    image = defaultImage;
  }
  const viewblog = (id) => {
    history(`/view/${id}`);
  };

  return (
    <div className="m-6 sm:ml-32 mt-12 ">
      {/* card div */}
      <div className={`p-4 w-full sm:w-[384px] mt-4 md:w-[650px] ${theme === "dark" ? "bg-[#344955]" : "bg-white"} rounded-md`}>
        <h3 className="font-bold text-2xl hover:text-blue-600 cursor-pointer" onClick={()=>viewblog(id)}>
          {title}
        </h3>
        <p className="py-3">
          by <span className="text-[#366bea] font-medium">{author}</span> : {new Date(timestamp).toGMTString()}
        </p>
        <div className="sm:flex">
          <img src={image} alt={title} className="w-full  md:w-[200px] sm:w-[150px] rounded-md mb-4 sm:mb-0" />
          <div className="px-2 sm:ml-4"  >
            <p dangerouslySetInnerHTML={{ __html: content }}></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
BlogCard.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  content: PropTypes.string,
  imageUrl: PropTypes.string,
  timestamp: PropTypes.string,
  id: PropTypes.string,
};



