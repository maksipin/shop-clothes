import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../store/products";
import { onChangeFavorite } from "../utils/changeFavorite";
import { getFavoriteById } from "../store/favorite";
import { getUserId } from "../services/localStorage.service";
import { addCartItem, getIsProductInCart } from "../store/cart";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import ShowProductImages from "../components/ShowProductImages";

const ProductPage = () => {
  const { productId } = useParams();
  const userId = getUserId();
  const favorite = useSelector(getFavoriteById(productId));
  const dispatch = useDispatch();
  const product = useSelector(getProductById(productId));
  const navigate = useNavigate();
  const [selectFeature, setSelectFeature] = useState({
    size: "",
    color: { name: "", code: "" },
    quantity: 0,
  });
  const productSizes = product.feature.reduce((sizes, item) => {
    if (!sizes.includes(item.size)) sizes.push(item.size);
    return sizes;
  }, []);
  const productColors = product.feature.reduce((colors, item) => {
    if (!colors.includes(item.color.code)) colors.push(item.color.code);
    return colors;
  }, []);
  const isProductInCart = useSelector(
    getIsProductInCart(productId, selectFeature)
  );

  const isChosenProduct =
    selectFeature.size !== "" && selectFeature.color.name !== "";

  useEffect(() => {
    scrollingTop();
  }, []);

  const onSelectSize = (size) => {
    setSelectFeature((prevState) => ({
      ...prevState,
      size: prevState.size === size ? "" : size,
    }));
  };
  const onSelectColor = (color) => {
    setSelectFeature((prevState) => {
      const colorItem = product.feature.find(
        (item) => item.color.code === color
      );
      return {
        ...prevState,
        color:
          prevState.color.code === colorItem.color.code
            ? { name: "", code: "" }
            : colorItem.color,
      };
    });
  };

  const scrollingTop = (event) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const addCart = () => {
    if (!userId) return toast.warn("Пожалуйста, войдите в учетную запись");
    if (isProductInCart) toast.info("Уже в корзине");
    else {
      const cartItem = {
        user_id: userId,
        product_id: product._id,
        feature: { ...selectFeature, quantity: 1 },
      };
      dispatch(addCartItem(cartItem));
      toast.success("Добавлен в корзину");
    }
  };

  const onClickBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex sm:flex-row flex-col sm:mt-20 mx-5">
      <ShowProductImages img={product.img} />
      <div className="sm:w-1/4 px-5">
        <div className="text-right align-middle ">
          <button
            className="px-5 py-2 w-2/4 font-semibold text-sm bg-amber-800 text-white rounded-none shadow-md opacity-80 hover:opacity-100"
            onClick={onClickBack}
          >
            Назад
          </button>
        </div>
        <div className=" m-5 font-bold text-3xl text-center">
          {product.name}
        </div>
        <div className=" my-4 text-lg font-light text-left ">
          <span>Артикул: </span>
          <span className=" my-4  font-normal "> {product.article}</span>
        </div>
        <div className="flex justify-between">
          <div className=" my-4 text-2xl text-right after:content-['\20BD'] after:pl-1 after:font-medium ">
            {product.price}
          </div>
          <div>
            <div className=" my-4 text-xl font-light text-right flex ">
              {productSizes.map((item, index) => (
                <button
                  key={index}
                  className={`ml-1 w-10 h-10 shadow-md bg-amber-800 text-white ${
                    item === selectFeature.size ? "opacity-100" : "opacity-70 "
                  }`}
                  onClick={() => {
                    onSelectSize(item);
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className=" my-4 text-xl font-light text-right flex justify-around">
              {productColors.map((item, index) => (
                <button
                  key={index}
                  className={`ml-1 w-5 h-5 rounded-full text-white ${
                    item === selectFeature.color.code
                      ? "border border-amber-900 opacity-100 shadow-md"
                      : "opacity-50 "
                  }`}
                  style={{ backgroundColor: item }}
                  onClick={() => {
                    onSelectColor(item);
                  }}
                ></button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-between my-6">
          <button
            onClick={addCart}
            disabled={!isChosenProduct}
            className={`px-2 py-2 w-3/4 font-semibold text-sm ${
              isChosenProduct ? "bg-amber-800" : "bg-slate-300"
            } bg-amber-800 text-white  shadow-md opacity-80 hover:opacity-100"`}
          >
            Добавить в корзину
          </button>
          <button
            onClick={() => onChangeFavorite(productId, dispatch, favorite)}
            className="ml-2 px-2 py-2 w-1/8 font-normal text-sm bg-amber-800 text-white  shadow-md opacity-80 hover:opacity-100"
          >
            {favorite ? (
              <HeartSolidIcon className="m-auto w-7 " />
            ) : (
              <HeartIcon className="m-auto w-7 " />
            )}
          </button>
        </div>
        {product.description &&
          product.description.map((item, index) => (
            <div key={index} className="mb-10">
              <h3 className="font-bold text-base">{item.title}</h3>
              <span>{item.text}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductPage;
