import React, { useState } from "react";

const SliderImages = ({ images }) => {
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
              src={process.env.REACT_APP_API_URL + img}
              alt="image"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default SliderImages;
