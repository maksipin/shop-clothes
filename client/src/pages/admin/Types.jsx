import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditType from "../../components/Admin/EditType";
import SectionCard from "../../components/SectionCard";
import {
  getTypes,
  getTypesLoadingStatus,
  loadTypeList,
  removeTypeById,
} from "../../store/type";

const Types = () => {
  const dispatch = useDispatch();
  const currentTypes = useSelector(getTypes());
  const isLoading = useSelector(getTypesLoadingStatus());
  const [types, setTypes] = useState([]);

  // useEffect(() => {
  //   dispatch(loadTypeList());
  // }, []);
  useEffect(() => {
    if (!isLoading) setTypes(currentTypes);
  }, [isLoading]);

  const loadUpdateTypes = () => {
    dispatch(loadTypeList());
  };

  const removeType = (id) => {
    setTypes((prevState) => prevState.filter((item) => item._id !== id));
    if (!id) return;
    dispatch(removeTypeById(id));
  };

  const addNewType = () => {
    const newTypesList = [...types];
    console.log("old", newTypesList);
    newTypesList.push({
      type: "",
      title: "",
      description: "",
    });
    console.log("new", newTypesList);
    setTypes(newTypesList);
  };

  return (
    <div className="ml-5">
      {!isLoading &&
        types.map((item, index) => (
          <EditType
            key={index}
            type={item}
            load={loadUpdateTypes}
            remove={removeType}
          />
        ))}
      <div className="m-10 text-center">
        <button
          className="ml-4 px-4 py-2 w-1/5 font-normal text-sm bg-amber-800 text-white  shadow-md opacity-80 hover:opacity-100"
          onClick={addNewType}
        >
          Добавить
        </button>
      </div>
    </div>
  );
};

export default Types;
