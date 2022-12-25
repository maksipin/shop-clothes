import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import typeService from "../../services/type.service";
import SectionCard from "../SectionCard";

const EditType = ({ type, load, remove }) => {
  const [newType, setNewType] = useState([]);
  const [file, setFile] = useState(null);
  useEffect(() => {
    setNewType(type);
  }, [type]);

  const onChange = ({ target }) => {
    setNewType((prevState) => {
      return { ...prevState, [target.name]: target.value };
    });
  };

  const selectFile = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
    setNewType((prevState) => ({ ...prevState, img: e.target.files[0].name }));
  };

  const updateType = () => {
    const formData = new FormData();
    formData.append("title", newType.title);
    formData.append("description", newType.description);
    if (file) formData.append("img", file);
    typeService.update(formData, type._id).then((data) => load());
  };
  const createType = () => {
    const formData = new FormData();
    formData.append("type", newType.title.toLowerCase());
    formData.append("title", newType.title);
    formData.append("description", newType.description);
    formData.append("img", file);
    typeService.create(formData).then((data) => load());
  };

  return (
    <div className=" mb-4 border-b border-b-amber-900">
      <div key={newType._id} className="flex justify-start">
        <div className="w-1/3 ">
          <SectionCard {...newType} img={type.img} />
        </div>
        <div className="mt-10 w-full flex flex-col justify-between">
          <div className="flex justify-between">
            <div className="mx-10 flex flex-col w-1/3 ">
              <label className="block ">
                <span className="text-orange-900">Название:</span>
                <input
                  type="text"
                  name="title"
                  id={newType._id}
                  className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-orange-900"
                  placeholder="Добавьте название"
                  value={newType.title}
                  onChange={onChange}
                />
              </label>
            </div>
            <div className="mx-10 flex flex-col w-2/3">
              <label className="block ">
                <span className="text-orange-900">Описание:</span>
                <input
                  type="text"
                  name="description"
                  id={newType._id}
                  className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-orange-900"
                  placeholder="Добавьте описание"
                  value={newType.description}
                  onChange={onChange}
                />
              </label>
            </div>
          </div>
          <div className="mb-32 flex justify-center ">
            <div className="w-1/3">
              <label className="flex flex-col">
                <span className="mb-2 text-orange-900 text-center">
                  {type.img ? "Обновить фото" : "Добавьте фото"}
                </span>
                <input
                  type="file"
                  className="mt-1 block w-full"
                  onChange={selectFile}
                />
              </label>
            </div>
            <div className="w-2/3 m-auto">
              <button
                onClick={type._id ? updateType : createType}
                className={`ml-4 px-4 py-2 w-1/5 font-normal text-sm ${
                  type !== newType
                    ? "bg-amber-800 hover:opacity-100"
                    : "bg-gray-300 opacity-100 cursor-default"
                } text-white  shadow-md opacity-80 hover:opacity-100`}
              >
                Сохранить
              </button>
              <button
                className="ml-4 px-4 py-2 w-1/5 font-normal text-sm bg-amber-800 text-white  shadow-md opacity-80 hover:opacity-100"
                onClick={() => remove(type._id)}
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditType;
