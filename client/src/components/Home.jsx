// import BlogCard from "./BlogCard";
import CreateBlog from "./CreateBlog";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
// import ViewBlog from "./ViewBlog";

const Home = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {/* <BlogCard /> */}
        {/* <ViewBlog/> */}
        <CreateBlog/>
        <Sidebar />
        <Footer/>
      </div>
    </>
  );
};

export default Home;
