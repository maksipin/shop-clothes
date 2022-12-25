import React from "react";
import { useState } from "react";
import InputInfo from "./inputInfo";

const ColorForm = ({ saveColor, remove }) => {
  // const [colorName, setColorName]=useState({name:"",color:""})
  let colorName;
  const onChange = ({ target }) => {
    colorName = { ...colorName, [target.name]: target.value };
    console.log(colorName);
  };

  const onSave = () => {
    // console.log(name, color);
    saveColor({ ...colorName });
  };
  return (
    <div className="flex flex-col justify-start  border-b border-amber-800 mx-5 ">
      <div className="mx-0">
        <InputInfo title="Имя:" name="name" onChange={onChange} />
      </div>
      <label className="block w-40 m-auto">
        <span className="text-amber-900 text-lg ">Выберите цвет:</span>
        <input
          type="color"
          name="color"
          className="mt-1 block w-40 h-10"
          colorpick-eyedropper-active="true"
          onChange={onChange}
        />
      </label>
      <div className="m-auto  flex justify-start ">
        <button
          onClick={remove}
          className="mr-1 px-4 py-2  font-normal text-center align-middle text-sm bg-amber-800 text-white  shadow-md opacity-80 hover:opacity-100"
        >
          X
        </button>
        <button
          onClick={onSave}
          className=" px-4 py-2  font-normal text-center align-middle text-sm bg-amber-800 text-white  shadow-md opacity-80 hover:opacity-100"
        >
          Сохранить
        </button>
      </div>
    </div>
  );
};

export default ColorForm;
