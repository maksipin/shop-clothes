import React, { useEffect, useState } from "react";
import { HeartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFavoriteById, getIsFavorite } from "../store/favorite";
import { getUserId } from "../services/localStorage.service";
import { onChangeFavorite } from "../utils/changeFavorite";

const ProductCard = ({
  quantityByRow,
  _id,
  name,
  price,
  feature,
  img,
  admin,
  onAction,
  link,
}) => {
  const dispatch = useDispatch();
  const isFavorite = useSelector(getIsFavorite(_id));
  const favorite = useSelector(getFavoriteById(_id));
  const [slide, setSlide] = useState(0);
  const [items, setItems] = useState([]);
  const size = feature.reduce((sizes, item) => {
    if (!sizes.includes(item.size)) sizes.push(item.size);
    return sizes;
  }, []);
  const color = feature.reduce((colors, item) => {
    if (!colors.includes(item.color.code)) colors.push(item.color.code);
    return colors;
  }, []);

  const bgImage = {
    backgroundImage: "url(" + process.env.REACT_APP_API_URL + img[0] + ")",
  };

  const changeSlide = (direction = 1) => {
    let slideNumber = 0;
    if (slide + direction < 0) {
      slideNumber = items.length - 1;
    } else {
      slideNumber = (slide + direction) % items.length;
    }
    setSlide(slideNumber);
  };

  useEffect(() => {
    setItems(img);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      changeSlide(1);
    }, 9000);
    return () => {
      clearInterval(interval);
    };
  }, [items.length, slide]);

  return (
    <div
      className={`mb-5 p-1 border bg-white hover:scale-105 duration-700 hover:border-none hover:z-10  ${
        quantityByRow === "2"
          ? "w-1/2 "
          : quantityByRow === "3"
          ? "w-1/3"
          : "w-1/4 "
      }`}
    >
      <div className="">
        <div className="relative">
          <div className="w-7 text-xs font-bold text-white absolute top-2 right-2 z-10  cursor-pointer hover:scale-125 hover:translate-y-1 duration-300">
            {admin ? (
              <XMarkIcon
                onClick={() => onAction(_id)}
                className="text-white hover:text-amber-800 h-7 w-7 z-10 cursor-pointer rotate-90  hover:rotate-180 duration-300"
              />
            ) : isFavorite ? (
              <HeartSolidIcon
                onClick={() =>
                  onChangeFavorite(_id, dispatch, isFavorite, favorite)
                }
                className="text-white hover:text-amber-800 h-7 w-7 z-10 cursor-pointer rotate-0  hover:rotate-12 duration-300"
              />
            ) : (
              <HeartIcon
                onClick={() =>
                  onChangeFavorite(_id, dispatch, isFavorite, favorite)
                }
                className="text-white hover:text-amber-800 h-7 w-7 z-10 cursor-pointer rotate-0  hover:rotate-12 duration-300"
              />
            )}
          </div>
          <NavLink to={`${link + _id}`}>
            <div
              className="bg-cover pt-[140%] w-full h-1/2"
              style={bgImage}
            ></div>

            <div className="my-5">
              <div className="my-2 text-center text-2xl sm:text-xl font-normal tracking-wider">
                {name}
              </div>
              <div className="mx-2 flex justify-between">
                <div className=" text-lg font-light after:content-['\20BD'] after:pl-1 after:font-medium basis-1/3 flex justify-start">
                  {price}
                </div>
                <div className="flex items-center basis-1/3 justify-center">
                  {color.map((item, index) => (
                    <div className="border-l first:border-none border-amber-800">
                      <div
                        className={`m-1 w-3 h-3  border border-gray-500 rounded-full shadow-md bg-[${item}]`}
                        style={{ backgroundColor: item }}
                        key={index}
                      ></div>
                    </div>
                  ))}
                </div>
                <div className="basis-1/3 flex justify-end">
                  {size.map((item, index) => (
                    <div
                      className="px-2 border-l first:border-none border-amber-800 text-lg font-light"
                      key={index}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
