import BlogCard from "./BlogCard";
import Sidebar from "./Sidebar";

const Home = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <BlogCard />
        <Sidebar />
      </div>
    </>
  );
};

export default Home;
