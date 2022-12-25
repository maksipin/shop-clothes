import React from "react";
import { Outlet } from "react-router-dom";

const SignLayout = () => {
  return (
    <div className="w-1/3 m-auto h-screen align-middle pt-[20vh]">
      <Outlet />
    </div>
  );
};

export default SignLayout;
