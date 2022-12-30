import React from "react";
import { NavLink } from "react-router-dom";

const SectionMenu = ({ type }) => {
  const scrollingTop = (event) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="">
      <ul className="ml-2 sm:sticky sm:top-1/3 sm:block flex flex-wrap justify-center border-b border-amber-800 sm:border-0 mb-4">
        {type.map((item, index) => (
          <div
            key={index}
            className="sm:w-52 w-1/2 sm:p-5 p-2 sm:border-b shadow-md text-center sm:text-lg text-base tracking-wider font-light sm:border-amber-800 sm:border-r-0 hover:text-amber-800 hover:-translate-y-1 duration-500"
          >
            <NavLink key={index} to={`../${item.type}`}>
              <li onClick={scrollingTop} key={index}>
                {item.title}
              </li>
            </NavLink>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default SectionMenu;
