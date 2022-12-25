import React from "react";
import { Circles } from "react-loader-spinner";
const Loader = () => {
  return (
    <div className="m-auto h-[70vh] flex justify-center items-center">
      <Circles
        height="50"
        width="50"
        color="rgb(146, 64, 14)"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
