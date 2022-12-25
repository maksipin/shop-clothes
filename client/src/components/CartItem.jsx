import React from "react";
import InputInfo from "./form/inputInfo";

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
  const bgImage = {
    backgroundImage: "url(" + process.env.REACT_APP_API_URL + img + ")",
  };

  const onChangeQuantity = ({ target }) => {
    onChange(index, +target.value);
  };

  return (
    <div className="flex justify-start h-72 border border-amber-900 border-b-0">
      <div className="w-40">
        <div
          className="bg-cover bg-center  w-full h-full"
          style={bgImage}
        ></div>
      </div>
      <div className=" pl-10 flex flex-col justify-center basis-1/5">
        <div className="text-4xl mx-auto mb-4 tracking-widest">{name}</div>
        <div className=" text-xl mx-auto mb-2">
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
      <div className=" basis-1/2 flex justify-center">
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
        className="my-auto mx-10 px-2 py-2 w-10 h-10 font-semibold text-sm bg-amber-800 text-white  shadow-md opacity-80 hover:opacity-100"
      >
        X
      </button>
    </div>
  );
};

export default CartItem;
