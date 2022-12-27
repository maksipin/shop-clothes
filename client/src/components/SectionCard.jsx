import React from "react";

import { NavLink, useLocation } from "react-router-dom";

const SectionCard = ({ to, img, description, title }) => {
  const usRef = useLocation();
  // console.log("Ref", usRef);
  const styleImg = "" + process.env.REACT_APP_API_URL + img;

  return (
    <div className="w-1/4 pr-[1px] h-[50vh] min-w-250px  relative  justify-center items-center  pb-[2px]">
      {/* container */}
      <NavLink to={to}>
        <div className=" relative group   overflow-hidden shadow-lg  flex justify-center items-center h-full">
          {/* card */}
          <img
            className="h-[100%] w-full object-cover group-hover:scale-125 duration-700"
            src={`${process.env.REACT_APP_API_URL + img}`}
            alt=""
          />

          {/* </div> */}
          <div className="absolute -bottom-1/2 shadow-md group-hover:bottom-0 w-full h-1/2 flex flex-col  justify-between items-center z-10  backdrop-blur-2xl border border-slate-300 transition-slide-card  duration-500">
            {/* content */}
            <div className="text-white  hover:text-slate-900 text-center mx-5 group-hover:translate-y-0 -translate-y-10 group-hover:opacity-100 opacity-0  duration-300">
              {/* contentBx */}
              <h3 className="pt-10 uppercase tracking-widest font-semibold  text-3xl  leading-tight ">
                {title}
              </h3>
              <h2 className=" pt-2 text-xl font-normal normal-case leading-none">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default SectionCard;
