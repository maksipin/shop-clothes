import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import { getUserId } from "../services/localStorage.service";
import {
  getCart,
  getCartLoadingStatus,
  loadCartList,
  removeCartById,
  updateCartItem,
} from "../store/cart";
import { getProductsList, getProductsLoadingStatus } from "../store/products";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShoppingCartPage = () => {
  const userId = getUserId();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartProductsList = useSelector(getCart());
  const isLoadingCart = useSelector(getCartLoadingStatus());
  const isLoadingproduct = useSelector(getProductsLoadingStatus());
  const products = useSelector(getProductsList());
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState({ quantity: 0, amount: 0 });

  useEffect(() => {
    if (!isLoadingCart && !isLoadingproduct) {
      const cart = cartProductsList.map((item) => {
        const product = products.find((prod) => prod._id === item.product_id);
        return {
          ...item,
          name: product.name,
          price: product.price,
          img: product.img[0],
        };
      });
      if (cart.length > 0) {
        setCartItems(cart);
        setTotal(() => calculationTotal(cart));
      } else {
        setCartItems([]);
        calculationTotal([]);
      }
    }
  }, [isLoadingCart]);

  const onChange = (index, quantity) => {
    const arr = [...cartItems];
    arr[index].feature = { ...arr[index].feature, quantity };
    setCartItems(arr);
    setTotal(() => calculationTotal(arr));
  };

  function calculationTotal(cart) {
    if (!cart.length > 0) return { quantity: 0, amount: 0 };
    return cart.reduce(
      (sum, item) => {
        return (sum = {
          quantity: sum.quantity + item.feature.quantity,
          amount: sum.amount + item.feature.quantity * item.price,
        });
      },
      { quantity: 0, amount: 0 }
    );
  }

  const onRemoveItem = (id) => {
    dispatch(removeCartById(id));
  };

  const updateItem = (index) => {
    const cartItemUpdate = { ...cartItems[index] };
    delete cartItemUpdate.name;
    delete cartItemUpdate.price;
    delete cartItemUpdate.img;
    if (cartItemUpdate.feature.quantity === 0)
      dispatch(removeCartById(cartItemUpdate._id));
    else dispatch(updateCartItem(cartItemUpdate));
  };

  const onOrderButton = () => {
    if (userId) navigate("./order");
    else toast.warn("Пожалуйста авторизуйтесь!");
  };

  return (
    <div className="mx-5 mt-32 flex">
      <div className="w-full border-b border-amber-900 ">
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => {
            return (
              <CartItem
                {...item}
                index={index}
                onChange={onChange}
                onBlur={updateItem}
                remove={onRemoveItem}
              />
            );
          })
        ) : (
          <div className="m-auto text-3xl text-center w-5/6">
            Здесь пока пусто
          </div>
        )}
      </div>
      <div className="ml-10 w-2/6">
        <div className="text-right ">
          <div className="flex justify-between mb-2">
            <span className="block text-lg">Количество:</span>
            <span className="text-xl after:content-['шт.'] after:pl-1 after:font-medium">
              {total.quantity}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="block text-lg">Сумма вашего заказа:</span>
            <span className="text-xl after:content-['\20BD'] after:pl-1 after:font-medium">
              {total.amount}
            </span>
          </div>
        </div>
        <div className="text-right mx-auto mt-5 w-52">
          <button
            onClick={onOrderButton}
            className=" px-2 py-2 w-full font-semibold text-sm bg-amber-800 text-white  shadow-md opacity-80 hover:opacity-100"
          >
            Заказать
          </button>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </div>
  );
};

export default ShoppingCartPage;
