import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputInfo from "../../components/form/inputInfo";
import { addSize, getSizes, removeSizesById } from "../../store/size";

const Sizes = () => {
  const dispatch = useDispatch();
  const sizes = useSelector(getSizes());
  const [newSize, setNewSize] = useState();

  const onChange = ({ target }) => {
    setNewSize(target.value);
  };

  const onSave = () => {
    dispatch(addSize({ size: newSize }));
  };
  const removeSize = (id) => {
    dispatch(removeSizesById(id));
  };

  return (
    <div className="flex flex-wrap">
      <div className="m-auto mx-4 flex flex-col border-b border-amber-800">
        <InputInfo title="Размер:" value={newSize} onChange={onChange} />
        <div className="m-auto my-5">
          <button
            onClick={onSave}
            className=" px-4 py-2  font-normal text-center align-middle text-sm bg-amber-800 text-white  shadow-md opacity-80 hover:opacity-100"
          >
            Добавить
          </button>
        </div>
      </div>
      {sizes.map((item) => (
        <div className="w-60 group text-center mr-5  pb-5 border-b border-amber-800 overflow-hidden relative ">
          <div className=" m-auto text-9xl rounded-full shadow-md ">
            {item.size}
          </div>
          <div
            className="absolute bottom-0  w-full h-full flex flex-col cursor-pointer justify-between  z-10 group-hover:backdrop-blur-xl  border-slate-300   duration-500"
            onClick={() => removeSize(item._id)}
          >
            {/* content */}
            <div className="text-white  hover:text-slate-900 text-center group-hover:opacity-100 opacity-0  duration-1000">
              {/* contentBx */}
              <h3 className="pt-8 uppercase tracking-widest font-semibold  text-3xl  leading-tight ">
                X
              </h3>
              <h2 className=" pt-2 text-xl font-normal normal-case leading-none">
                Удалить
              </h2>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sizes;
