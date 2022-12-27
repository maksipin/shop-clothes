import React from "react";
import logo from "../../logo.svg";
import { HeartIcon } from "@heroicons/react/24/outline";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentAuth, getIsLoggedIn } from "../../store/users";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

const NavBar = () => {
  const logedIn = useSelector(getIsLoggedIn());
  const auth = useSelector(getCurrentAuth());

  return (
    <Disclosure as="nav" className="bg-white">
      {({ open }) => (
        <>
          <div className="relative w-screen sm:fixed top-0 left-0 right-0 border-b border-amber-800 font-navlink text-xs font-medium bg-white bg-opacity-80 z-40 ">
            <div className="m-auto px-2 h-16  max-w-screen-2xl">
              <div className="absolute inset-y-0 left-0 m-auto flex justify-between w-full items-center lg:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon
                      className="block h-8 w-8 text-amber-800"
                      aria-hidden="true"
                    />
                  ) : (
                    <Bars3Icon
                      className="block h-8 w-8 text-amber-800"
                      aria-hidden="true"
                    />
                  )}
                </Disclosure.Button>

                <div className="block h-14 px-1 lg:hidden">
                  <NavLink to="./">
                    <img
                      className=" mx-auto h-full w-3/4"
                      src={logo}
                      alt="logo"
                    />
                  </NavLink>
                </div>
                <div className="flex">
                  <NavLink to="../favorite">
                    <div>
                      <HeartIcon className="mx-2  h-6 w-6 hover:text-amber-800  hover:-translate-y-1 transition-transform cursor-pointer duration-300" />
                    </div>
                  </NavLink>
                  <NavLink to="../shopping-cart">
                    <div>
                      <ShoppingBagIcon className="mx-2  h-6 w-6 hover:text-amber-800  hover:-translate-y-1 transition-transform cursor-pointer duration-300" />
                    </div>
                  </NavLink>
                </div>
              </div>
              <div className="hidden  lg:block">
                <div className="flex flex-row justify-between items-center">
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
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="mt-20 space-y-3  text-center">
              <NavLink to="../../../" aria-hidden="true">
                <Disclosure.Button
                  as="div"
                  className="mx-2 p-1 hover:text-amber-800  hover:-translate-y-1 transition-transform cursor-pointer duration-300 "
                >
                  Главная
                </Disclosure.Button>
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
              {auth?.role && (
                <NavLink to="../../dashboard">
                  <div className="mx-2 p-1 hover:text-amber-800  hover:-translate-y-1 transition-transform cursor-pointer duration-300 ">
                    Редактирование сайта
                  </div>
                </NavLink>
              )}
              <Disclosure.Button
                as="div"
                className="mx-2 p-1 hover:text-amber-800  hover:-translate-y-1 transition-transform cursor-pointer duration-300 "
                aria-hidden="true"
              >
                Контакты
              </Disclosure.Button>
              {logedIn ? (
                <NavLink to="../auth/logout">Выйти</NavLink>
              ) : (
                <NavLink to="../auth" aria-hidden="true">
                  <Disclosure.Button
                    as="div"
                    className="mx-2 p-1 hover:text-amber-800  hover:-translate-y-1 transition-transform cursor-pointer duration-300 "
                  >
                    Войти
                  </Disclosure.Button>
                </NavLink>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default NavBar;
