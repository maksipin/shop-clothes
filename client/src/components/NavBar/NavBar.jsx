import React from "react";
import logo from "../../logo.svg";
import { HeartIcon } from "@heroicons/react/24/outline";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentAuth, getIsLoggedIn } from "../../store/users";

const NavBar = () => {
  const logedIn = useSelector(getIsLoggedIn());
  const auth = useSelector(getCurrentAuth());

  return (
    <div className=" fixed top-0 left-0 right-0 border-b border-amber-800 font-navlink text-xs font-medium bg-white bg-opacity-80 z-40 ">
      <div className=" m-auto px-2 h-16  flex flex-row justify-between items-center max-w-screen-2xl">
        <div className=" flex justify-start m-1 basis-1/3">
          <NavLink to="../../../">
            <div className="mx-2 p-1 hover:text-amber-800  hover:-translate-y-1 transition-transform cursor-pointer duration-300 ">
              Главная
            </div>
          </NavLink>
          <div className="mx-2 p-1 hover:text-amber-800  hover:-translate-y-1 transition-transform cursor-pointer duration-300 ">
            Коллекция
          </div>
          <div className="mx-2 p-1 hover:text-amber-800  hover:-translate-y-1 transition-transform cursor-pointer duration-300 ">
            Look Book
          </div>
          <div className="mx-2 p-1 hover:text-amber-800  hover:-translate-y-1 transition-transform cursor-pointer duration-300 ">
            Покупателям
          </div>
        </div>
        <div className="flex-none w-48 basis-1/3">
          <NavLink to="./">
            <img className=" m-auto h-12 " src={logo} alt="logo" />
          </NavLink>
        </div>
        <div className=" flex justify-end basis-1/3">
          {auth?.role && (
            <NavLink to="../../dashboard">
              <div className="mx-2 p-1 hover:text-amber-800  hover:-translate-y-1 transition-transform cursor-pointer duration-300 ">
                Редактирование сайта
              </div>
            </NavLink>
          )}
          <div className="mx-2 p-1 hover:text-amber-800  hover:-translate-y-1 transition-transform cursor-pointer duration-300 ">
            Контакты
          </div>
          {logedIn ? (
            <NavLink to="../auth/logout">
              <div className="mx-2 p-1 hover:text-amber-800  hover:-translate-y-1 transition-transform cursor-pointer duration-300 ">
                Выйти
              </div>
            </NavLink>
          ) : (
            <NavLink to="../auth">
              <div className="mx-2 p-1 hover:text-amber-800  hover:-translate-y-1 transition-transform cursor-pointer duration-300 ">
                Войти
              </div>
            </NavLink>
          )}
          <NavLink to="../favorite">
            <div>
              <HeartIcon className="mx-2  h-6 w-6 hover:text-amber-800  hover:-translate-y-1 transition-transform cursor-pointer duration-300" />
            </div>
          </NavLink>
          <div>
            <NavLink to="../shopping-cart">
              <ShoppingBagIcon className="mx-2  h-6 w-6 hover:text-amber-800  hover:-translate-y-1 transition-transform cursor-pointer duration-300" />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
