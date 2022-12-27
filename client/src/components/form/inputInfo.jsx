import React from "react";

const InputInfo = ({ name, title, id, value, onChange, onBlur }) => {
  return (
    <label className="block m-2  sm:mt-0 text-center">
      <span className=" text-amber-900 text-lg">{title}</span>
      <input
        type="text"
        value={value}
        name={name}
        id={id}
        className="mt-0 block w-full text-lg  text-center tracking-widest px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-amber-900"
        placeholder="Заполните поле"
        onChange={onChange}
        onBlur={onBlur}
      />
    </label>
  );
};

export default InputInfo;
