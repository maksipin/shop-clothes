import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadCartList } from "../store/cart";
import { loadProductsList, updateQuantityProduct } from "../store/products";

const CartOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(updateQuantityProduct());
  }, []);

  const onClick = () => {
    dispatch(loadProductsList());
    dispatch(loadCartList());
    navigate("../../products");
  };
  return (
    <div className="m-auto my-10 sm:mt-32 text-center text-amber-900 text-xl sm:text-4xl">
      <div>Благодарим за заказ!</div>
      <div>Наш менеджер свяжется c вами в течении 30 минут.</div>
      <button
        className="my-10 px-5 py-2 w-52 font-semibold text-sm bg-amber-800 text-white rounded-none shadow-md opacity-80 hover:opacity-100"
        onClick={onClick}
      >
        Отлично
      </button>
    </div>
  );
};

export default CartOrder;
