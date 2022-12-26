import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadProductsList, updateQuantityProduct } from "../store/products";

const CartOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      dispatch(updateQuantityProduct());
      dispatch(loadProductsList());
      navigate("../../products");
    }, 3000);
  }, []);

  return (
    <div className="m-auto mt">
      <div>Благодарим за заказ!</div>
      <div>Наш менеджер свяжется c вами в течении 30 минут</div>
    </div>
  );
};

export default CartOrder;
