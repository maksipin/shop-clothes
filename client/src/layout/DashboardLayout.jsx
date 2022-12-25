import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="mt-20 ">
      <div className="flex justify-between  w-full">
        <div className="justify-start">
          <ul className="ml-2 mt-32 sticky top-1/3 w-52 ">
            <NavLink to={"./type"}>
              <li className=" p-5 border-b text-center text-lg tracking-wider font-light border-b-amber-800 hover:text-amber-800 hover:-translate-y-1 duration-500">
                Типы продуктов
              </li>
            </NavLink>
            <NavLink to={"./product"}>
              <li className="p-5 border-b text-center text-lg tracking-wider font-light border-b-amber-800 hover:text-amber-800 hover:-translate-y-1 duration-500">
                Продукты
              </li>
            </NavLink>
            <NavLink to={"./size"}>
              <li className="p-5 border-b text-center text-lg tracking-wider font-light border-b-amber-800 hover:text-amber-800 hover:-translate-y-1 duration-500">
                Размеры
              </li>
            </NavLink>
            <NavLink to={"./color"}>
              <li className="p-5 border-b text-center text-lg tracking-wider font-light border-b-amber-800 hover:text-amber-800 hover:-translate-y-1 duration-500">
                Цвета
              </li>
            </NavLink>
          </ul>
        </div>
        <div className="flex-grow w-screen border-l">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
