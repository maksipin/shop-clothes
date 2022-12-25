import React from "react";
import { UsersIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";

const Footer = () => {
  return (
    <footer className="bg-amber-800 text-white font-light opacity-80">
      <hr />
      <div className="m-auto flex justify-between grow-0 max-w-screen-2xl">
        {/* О компании */}
        <div className="m-5 mx-10">
          <h1 className="text-xl mb-2">О компании</h1>
          <h3 className="text-sm cursor-pointer">О нас</h3>
          <h3 className="text-sm cursor-pointer">Контакты</h3>
        </div>
        {/* Покупателям  */}
        <div className="m-5 ">
          <h1 className="text-xl mb-2 text-center">Покупателям</h1>
          <div className=" ml-10 flex text-sm flex-wrap justify-between ">
            <div className="mx-5">
              <h3 className="cursor-pointer">Магазины</h3>
              <h3 className="cursor-pointer">Доставка</h3>
              <h3 className="cursor-pointer">Оплата</h3>
            </div>
            <div className="mx-5">
              <h3 className="cursor-pointer">Возврат и обмен</h3>
              <h3 className="cursor-pointer">Пользовательское соглашение</h3>
              <h3 className="cursor-pointer">Политика конфиденциальности</h3>
            </div>
          </div>
        </div>
        {/* Контакты  */}
        <div className="m-5 mx-10">
          <h1 className="text-xl  mb-2">Контактный телефон:</h1>
          <h2 className="text-xl mb-2 cursor-pointer">8 800 800 00 00</h2>
          <div className=" flex ">
            <UsersIcon className="w-8 mx-2 cursor-pointer" />
            <PaperAirplaneIcon className="w-8 mx-2 cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
