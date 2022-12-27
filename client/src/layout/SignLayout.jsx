import React from "react";
import { Outlet } from "react-router-dom";

const SignLayout = () => {
  return (
    <div className="sm:w-1/3 sm:m-auto mx-4 h-screen align-middle pt-[20vh]">
      <Outlet />
    </div>
  );
};

export default SignLayout;
