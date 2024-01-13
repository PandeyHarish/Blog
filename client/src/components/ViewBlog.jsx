import { useContext } from "react";
import test from "./assets/images/test.jpg";
import ThemeContext from "../context/ThemeContext";

const ViewBlog = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <div className="m-6 sm:ml-32 mt-12">
        <div className={`w-[384px] rounded-md sm:w-[650px]  ${theme === "dark" ? "bg-[#344955]" : "bg-white"} p-6`}>
          <h3 className="font-bold text-3xl hover:text-blue-600 cursor-pointer my-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, ea.
          </h3>
          <p className="my-4">
            by <span className="text-blue-600 font-bold">Author</span> | Timestamp
          </p>
          <hr className="my-5" />
          <img src={test} alt="title" className="mt-5 mb-5 rounded-md"/>
          <p className="text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam nemo fuga quis beatae ut illo accusantium esse. Aspernatur dignissimos
            eius reiciendis. Laboriosam, perferendis. Obcaecati dolorum perspiciatis alias laudantium distinctio suscipit aperiam possimus odio, earum
            aliquam fugit illum saepe cupiditate quae tempore sequi facere recusandae doloremque in! Minus fugiat error, corrupti inventore, quam
            sapiente iure, distinctio quasi tenetur vero aperiam maxime aut at impedit id delectus consequuntur repellendus vitae omnis. Laborum
            provident suscipit alias quibusdam magni mollitia ea sunt dolorem labore? Optio corrupti impedit, vel ullam nam quam dolores possimus, eos
            eaque placeat laborum. Maiores magnam molestiae sequi corporis vero cum alias tempore totam voluptas esse explicabo aut, officiis
            laboriosam, maxime saepe deserunt, quasi nobis nostrum cumque recusandae quisquam dignissimos dolor earum. Accusantium beatae excepturi
            blanditiis repellat delectus, voluptatem architecto minus nulla facere dolore hic aperiam at nihil non recusandae adipisci in aspernatur
            vel esse assumenda nemo iste. Facilis, labore. Animi!
          </p>
        </div>
      </div>
    </>
  );
};

export default ViewBlog;
