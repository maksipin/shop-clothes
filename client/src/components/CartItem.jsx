import React from "react";
import InputInfo from "./form/inputInfo";
import {useSelector} from "react-redux";
import {getUrl} from "../store/users";

const CartItem = ({
  _id,
  img,
  name,
  price,
  feature,
  onChange,
  index,
  onBlur,
  remove,
}) => {
  const url = useSelector(getUrl())
  const bgImage = {
    backgroundImage: "url(" + url + img + ")",
  };

  const onChangeQuantity = ({ target }) => {
    onChange(index, +target.value);
  };

  return (
    <div className="">
      <div className="flex flex-col sm:flex-row sm:justify-start sm:h-72 border border-amber-900 border-b-0">
        <div className="sm:w-40">
          <div
            className="bg-cover bg-no-repeat bg-center h-52 w-full sm:h-full"
            style={bgImage}
          ></div>
        </div>
        <div className=" sm:pl-10 flex flex-wrap flex-col justify-center basis-1/5">
          <div className="sm:text-4xl text-2xl mx-auto sm:mb-4 tracking-widest">
            {name}
          </div>
          <div className=" sm:text-xl mx-auto mb-2">
            Размер: <span className="font-medium">{feature.size}</span>
          </div>
          <div className="text-4lg mx-auto">
            Цвет:
            <span className="font-medium"> {feature.color.name}</span>
            <div
              className=" mx-2 w-4 h-4 translate-y-1 rounded-full shadow-md inline-block"
              style={{ backgroundColor: feature.color.code }}
            ></div>
          </div>
        </div>
        <div className=" sm:basis-1/2 flex justify-center">
          <div className="m-auto">
            <InputInfo
              title="Количество:"
              value={feature.quantity}
              name="quantity"
              onChange={onChangeQuantity}
              onBlur={() => onBlur(index)}
            />
          </div>
        </div>
        <div className="m-auto text-2xl after:content-['\20BD'] after:pl-1 after:font-medium">
          {feature.quantity * price}
        </div>
        <button
          onClick={() => remove(_id)}
          className="sm:m-auto my-5 mx-auto sm:mx-10 px-2 py-2 w-10 h-10 font-semibold text-sm bg-amber-800 text-white  shadow-md opacity-80 hover:opacity-100"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default CartItem;
