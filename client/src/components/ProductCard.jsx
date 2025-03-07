import React from "react";
import { HeartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFavoriteById } from "../store/favorite";
import { onChangeFavorite } from "../utils/changeFavorite";
import {getUrl} from "../store/users";

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
  const url = useSelector(getUrl())
  const dispatch = useDispatch();
  const favorite = useSelector(getFavoriteById(_id));
  const size = feature.reduce((sizes, item) => {
    if (!sizes.includes(item.size)) sizes.push(item.size);
    return sizes;
  }, []);
  const color = feature.reduce((colors, item) => {
    if (!colors.includes(item.color.code)) colors.push(item.color.code);
    return colors;
  }, []);

  const bgImage = {
    backgroundImage: "url(" + url + img[0] + ")",
  };

  return (
    <div
      className={`mb-5 w-full p-1 border bg-white hover:scale-105 duration-700 hover:border-none hover:z-10  ${
        quantityByRow === "2"
          ? "sm:w-1/2 "
          : quantityByRow === "3"
          ? "sm:w-1/3"
          : "sm:w-1/4 "
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
            ) : favorite ? (
              <HeartSolidIcon
                onClick={() => onChangeFavorite(_id, dispatch, favorite)}
                className="text-white hover:text-amber-800 h-7 w-7 z-10 cursor-pointer rotate-0  hover:rotate-12 duration-300"
              />
            ) : (
              <HeartIcon
                onClick={() => onChangeFavorite(_id, dispatch, favorite)}
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
                    <div
                      key={index}
                      className="border-l first:border-none border-amber-800"
                    >
                      <div
                        className={`m-1 w-3 h-3  border border-gray-500 rounded-full shadow-md bg-[${item}]`}
                        style={{ backgroundColor: item }}
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

export default React.memo(ProductCard);
