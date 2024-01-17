import BlogCard from "./BlogCard";
// import CreateBlog from "./CreateBlog";


// import CreateBlog from "./CreateBlog";
import Sidebar from "./Sidebar";
// import ViewBlog from "./ViewBlog";

const Home = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <BlogCard />
        {/* <ViewBlog/> */}
        
        <Sidebar />
      </div>
     
    </>
  );
};

export default Home;
