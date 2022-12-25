import React from "react";
import InputInfo from "./inputInfo";

const DescriptionForm = ({
  nameTitle,
  nameDescription,
  nameTextArea,
  title,
  text,
  onChange,
  remove,
  index,
}) => {
  const onChangeField = ({ target }) => {
    console.log(target.name);
    onChange(index, { [target.name]: target.value });
  };

  return (
    <div className="flex justify-center my-5 pb-5 border-b border-b-amber-800">
      <div className="w-1/4 mr-10">
        <InputInfo
          title={nameDescription}
          name="title"
          value={title}
          onChange={onChangeField}
        />
      </div>
      <div className="w-3/4">
        <span className="text-amber-800 text-lg">{nameTextArea}</span>
        <textarea
          className="form-textarea w-full"
          name="text"
          value={text}
          onChange={onChangeField}
        ></textarea>
      </div>
      <div className="my-auto mx-4 text-center">
        <button
          onClick={() => remove(index)}
          className="ml-4 px-4 py-2  font-normal text-center align-middle text-sm bg-amber-800 text-white  shadow-md opacity-80 hover:opacity-100"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default DescriptionForm;
