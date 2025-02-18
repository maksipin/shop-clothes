import React, { useState } from "react";
import {useSelector} from "react-redux";
import {getUrl} from "../store/users";

const SliderImages = ({ images }) => {
    const url = useSelector(getUrl())
  return (
    <>
      <div className="relative w-full flex gap-6 snap-x snap-mandatory overflow-auto pb-4">
        {images.map((img) => (
          <div className="snap-center scroll-mx-12 shrink-0 w-full">
            <img
              key={img}
              className="h-full w-[90vw] object-cover shadow-md transition-transform duration-700"
              // style={{ transform: value }}
              loading="lazy"
              src={url + img}
              alt="image"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default SliderImages;
