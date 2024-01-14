import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const Footer = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <div className={` w-screen  ${theme === "dark" ? "bg-[#344955]" : "bg-white"} `}>
        <div className={`pl-32 my-4`}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, recusandae optio exercitationem voluptatum neque tenetur reiciendis ab
            iusto provident laudantium sint porro dolorem asperiores id explicabo esse hic ad facere? 
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
