import React from "react";
import { useInView } from "react-intersection-observer";
import { NavLink } from "react-router-dom";
import {useSelector} from "react-redux";
import {getUrl} from "../store/users";

const SectionCard = ({ to, img, description, title }) => {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 1,
  });
  const url = useSelector(getUrl())
  return (
    <div
      ref={ref}
      className="w-1/4 pr-[1px] sm:h-[50vh] min-w-250px max-w-4xl relative  justify-center items-center  pb-[2px] sm:flex-[1_1_300px]"
    >
      {/* container */}
      <NavLink to={to}>
        <div className=" relative group   overflow-hidden shadow-lg  flex justify-center items-center h-full">
          {/* card */}
          <img
            className="h-[100%] w-full object-cover group-hover:scale-125 duration-700"
            src={`${url + img}`}
            alt=""
          />
          <div
            className={`absolute ${
              inView ? "bottom-0" : "-bottom-1/2"
            } sm:-bottom-1/2 shadow-md group-hover:bottom-0 w-full h-1/2 sm:h-1/2 flex flex-col  justify-between items-center z-10  backdrop-blur-2xl border border-slate-300 transition-slide-card  duration-500`}
          >
            {/* content */}
            <div
              className={`my-auto text-white  hover:text-slate-900 text-center mx-5  group-hover:opacity-100 sm:opacity-0  duration-300 group-hover:translate-y-0 ${
                inView ? "translate-y-0" : ""
              }  sm:-translate-y-10`}
            >
              {/* contentBx */}
              <h3 className=" uppercase tracking-widest font-semibold text-xl sm:text-3xl  leading-tight ">
                {title}
              </h3>
              <h2 className=" pt-2 text-base sm:text-xl font-normal normal-case leading-none">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default React.memo(SectionCard);
