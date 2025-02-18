import React from "react";
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {getUrl} from "../store/users";

const Slide = () => {
    const url = useSelector(getUrl())
  return (
    <>
      <div className="m-auto flex justify-center max-h-600 sm:pt-14 ">
        <img
          className="object-cover"
          src={
              url +
            "1c343fc7-9b16-486a-85b6-a67bf13381a0.jpg"
          }
          alt=""
        />
      </div>
      <div className="relative flex justify-center">
        <div className="absolute top-1/2 sm:border-t-2 border-t border-amber-900 w-full z-0"></div>
        <p className="p-6 pt-4 text-center sm:text-4xl text-xl text-amber-900 tracking-widest sm:font-thin font-extralight align-middle bg-white z-10">
          Найди свой образ
        </p>
        <div className="absolute top-1/2 border-t-2 border-amber-900 w-full z-0"></div>
      </div>
    </>
  );
};

export default Slide;
