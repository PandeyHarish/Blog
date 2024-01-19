import BlogCard from "./BlogCard";
// import CreateBlog from "./CreateBlog";


// import CreateBlog from "./CreateBlog";
import Sidebar from "./Sidebar";
// import ViewBlog from "./ViewBlog";

const Home = () => {
  return (
    <>
      <div className="flex flex-wrap">
        <BlogCard />
        {/* <ViewBlog/> */}
        
        <Sidebar />
      </div>
     
    </>
  );
};

export default Home;
