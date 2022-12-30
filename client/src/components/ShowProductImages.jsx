import React from "react";
import SliderImages from "./SliderImages";

const ShowProductImages = ({ img }) => {
  return (
    <>
      <div className="sm:w-3/4 sm:mt-10">
        <div className=" flex flex-wrap mb-5">
          <div className="block sm:hidden">
            <SliderImages images={img} />
          </div>
          {img.map((item) => (
            <div
              key={item}
              className="sm:flex-[0_0_50%] relative sm:block hidden"
            >
              <img
                className="pl-1 pb-1 h-[85vh] w-full object-cover"
                loading="lazy"
                src={process.env.REACT_APP_API_URL + item}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShowProductImages;
