import React from "react";
import { Outlet } from "react-router-dom";

const ShoppingCartLayout = () => {
  return (
    <div className="">
      <Outlet />
    </div>
  );
};

export default ShoppingCartLayout;
