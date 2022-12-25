import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ColorForm from "../../components/form/colorForm";
import Loader from "../../components/Loader";
import { addColor, getColors, removeColorById } from "../../store/color";

const Colors = () => {
  const dispatch = useDispatch();
  const colors = useSelector(getColors());
  const [selectColor, setSelectColor] = useState();
  const [newColor, setNewColor] = useState([]);

  useEffect(() => {
    setSelectColor(colors);
  }, []);
  const onChangeColor = (index, value) => {
    setSelectColor((prevState) =>
      prevState.map((item, i) => {
        if (index === i) return { ...item, ...value };
        return item;
      })
    );
  };
  const removeItem = (index) => {
    const arr = [...selectColor];
    arr.splice(index, 1);
    setSelectColor(arr);
  };
  const onChangeNewColor = (index, value) => {
    setNewColor((prevState) =>
      prevState.map((item, i) => {
        if (index === i) return { ...item, ...value };
        return item;
      })
    );
  };
  const removeNewItem = (index) => {
    const arr = [...newColor];
    arr.splice(index, 1);
    setNewColor(arr);
  };

  const addColorItem = () => {
    const arr = [...newColor];
    arr.push({ color: "", name: "" });
    setNewColor(arr);
  };
  const saveColor = (value) => {
    console.log("val", value);
    dispatch(addColor(value)).then((data) => setNewColor([]));
  };

  const removeColor = (id) => {
    dispatch(removeColorById(id));
  };

  if (!selectColor) return <Loader />;
  return (
    <div className="mx-auto">
      <button
        onClick={addColorItem}
        className="mx-14 px-4 py-2 mb-5 font-normal text-center align-middle text-sm bg-amber-800 text-white  shadow-md opacity-80 hover:opacity-100"
      >
        Добавить цвет
      </button>
      <div className="flex flex-wrap">
        {newColor &&
          newColor.map((item, index) => (
            <ColorForm
              {...item}
              index={index}
              saveColor={saveColor}
              remove={removeNewItem}
            />
          ))}

        {selectColor.map((item) => (
          <div className="w-60 group text-center mr-5  pb-5 border-b border-amber-800 overflow-hidden relative ">
            <div className="text-center font-light text-lg">{item.name}</div>
            <div
              className=" m-auto w-52 h-52 rounded-full shadow-md "
              style={{ backgroundColor: item.color }}
            ></div>
            <div
              className="absolute bottom-0  w-full h-full flex flex-col cursor-pointer justify-between  z-10 group-hover:backdrop-blur-xl  border-slate-300   duration-500"
              onClick={() => removeColor(item._id)}
            >
              {/* content */}
              <div className="text-white  hover:text-slate-900 text-center group-hover:opacity-100 opacity-0  duration-1000">
                {/* contentBx */}
                <h3 className="pt-24 uppercase tracking-widest font-semibold  text-3xl  leading-tight ">
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
    </div>
  );
};

export default Colors;
