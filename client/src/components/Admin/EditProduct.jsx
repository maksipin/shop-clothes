import React, { useState } from "react";
import { Circles } from "react-loader-spinner";
import "../../../node_modules/react-loader-spinner/dist/loader/Circles";
import InputInfo from "../form/inputInfo";
import { useEffect } from "react";
import colorService from "../../services/color.service";
import sizeService from "../../services/size.service";
import FeatureForm from "../form/featureForm";
import productService from "../../services/product.service";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { getTypes, getTypesLoadingStatus } from "../../store/type";
import Select from "react-select";
import DescriptionForm from "../form/descriptionForm";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProductById,
  getProductsList,
  getProductsLoadingStatus,
  loadProductsList,
} from "../../store/products";
import {getUrl} from "../../store/users";

const EditProduct = () => {
  const url = useSelector(getUrl())
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoadingTypes = useSelector(getTypesLoadingStatus());
  const { productId } = useParams();
  const product = useSelector(getProductById(productId));
  const types = useSelector(getTypes());
  const [currentType, setCurrentType] = useState();
  const [curentProduct, setCurentProduct] = useState();
  const [colors, setColors] = useState();
  const [sizes, setSizes] = useState();
  const [feature, setFeature] = useState([]);
  const [description, setDescription] = useState([]);
  const [loadingImg, setLoadingImg] = useState(false);
  const [saveButton, setSaveButton] = useState(false);

  let typesList;
  if (!isLoadingTypes) {
    typesList = types.map((item) => ({
      label: item.title,
      value: item._id,
    }));
  }

  useEffect(() => {
    colorService.get().then((data) =>
      setColors(() =>
        data.content.map((item) => ({
          value: item._id,
          label: item.name,
          color: item.color,
        }))
      )
    );
    sizeService.get().then((data) =>
      setSizes(() =>
        data.content.map((item) => ({
          value: item._id,
          label: item.size,
        }))
      )
    );
  }, []);

  useEffect(() => {
    setCurentProduct(product);
    setFeature(product.feature);
    setDescription(product.description);
    const type = types.find((item) => item._id === product.type_id);
    console.log("type", type);
    if (type) setCurrentType(() => ({ label: type.title, value: type._id }));
  }, []);

  const onChangeFeature = (index, value) => {
    setSaveButton(true);
    setFeature((prevState) =>
      prevState.map((item, i) => {
        if (index === i) return value;
        return item;
      })
    );
  };
  const onChangeDescription = (index, value) => {
    setSaveButton(true);
    setDescription((prevState) =>
      prevState.map((item, i) => {
        if (index === i) return { ...item, ...value };
        return item;
      })
    );
  };

  const onChangeType = (value) => {
    setSaveButton(true);
    setCurentProduct((prevState) => ({ ...prevState, type_id: value.value }));
  };

  const addNewFeature = () => {
    setSaveButton(true);
    const newFeature = [...feature];
    newFeature.push({
      size: "",
      color: { name: "", code: "" },
      quantity: "",
    });
    setFeature(newFeature);
  };

  const addNewDescription = () => {
    setSaveButton(true);
    const newDescription = [...description];
    newDescription.push({
      title: "",
      text: "",
    });
    setDescription(newDescription);
  };

  const removeItemFeature = (index) => {
    setSaveButton(true);
    setFeature((prevState) => prevState.filter((item, i) => i !== index));
  };
  const removeItemDescription = (index) => {
    setSaveButton(true);
    setDescription((prevState) => prevState.filter((item, i) => i !== index));
  };

  const onChangeProductInfo = ({ target }) => {
    setSaveButton(true);
    setCurentProduct({ ...curentProduct, [target.name]: target.value });
  };

  const selectFile = (e) => {
    setSaveButton(true);
    setLoadingImg(true);
    const formData = new FormData();
    formData.append("img", e.target.files[0]);
    productService.updateImg(formData, curentProduct._id).then((data) => {
      setCurentProduct((prevState) => ({ ...prevState, img: data.content }));
      setLoadingImg(false);
    });
  };

  const removeImage = (imgName) => {
    setSaveButton(true);
    setCurentProduct((prevState) => ({
      ...prevState,
      img: prevState.img.filter((item) => item !== imgName),
    }));
  };

  const updateProduct = () => {
    const updateProduct = { ...curentProduct, feature, description };
    delete updateProduct._id;
    productService.update(updateProduct, curentProduct._id).then((data) => {
      dispatch(loadProductsList());
      navigate(-1);
    });
  };

  if (!curentProduct) {
    return (
      <div className="m-auto mt-[30vh] flex justify-center align-middle">
        <Circles
          height="50"
          width="50"
          color="rgb(146, 64, 14)"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap m-5">
        {curentProduct.img.map((item) => (
          <div className="relative">
            <img
              className="h-96  shadow-md m-1"
              src={url + item}
              alt=""
            />
            <XMarkIcon
              onClick={() => removeImage(item)}
              className="absolute right-3 top-3 text-white hover:text-amber-800 h-10 w-10 z-10 cursor-pointer rotate-90  hover:rotate-180 duration-300"
            />
          </div>
        ))}
      </div>
      <div className="mb-5 flex justify-center ">
        {loadingImg === true ? (
          <Circles
            height="50"
            width="50"
            color="rgb(146, 64, 14)"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        ) : (
          <label className="flex items-center">
            <span className=" mr-2 w-1/2 text-amber-800  text-center">
              Добавить фото
            </span>
            <input
              type="file"
              multiple
              className="mt-1 block w-full"
              onChange={selectFile}
            />
          </label>
        )}
      </div>
      <div className="m-5 ">
        <div className=" m-auto pb-5 flex justify-center border-b border-b-amber-800 ">
          <InputInfo
            title="Название"
            name="name"
            value={curentProduct.name}
            onChange={onChangeProductInfo}
          />
          <InputInfo
            title="Артикул"
            name="article"
            value={curentProduct.article}
            onChange={onChangeProductInfo}
          />
          <InputInfo
            title="Цена"
            name="price"
            value={curentProduct.price}
            onChange={onChangeProductInfo}
          />
          {typesList ? (
            <div className="w-1/4 mt-auto mb-2">
              <span className="text-amber-800 text-lg">Тип</span>
              <Select
                className=""
                defaultValue={currentType}
                id="type"
                isLoading={isLoadingTypes}
                closeMenuOnSelect={true}
                onChange={onChangeType}
                options={typesList}
              />
            </div>
          ) : null}
        </div>
        <div className="my-3 text-left">
          <button
            className="ml-4 px-4 py-2 w-1/5 font-normal text-sm bg-amber-800 text-white  shadow-md opacity-80 hover:opacity-100"
            onClick={addNewFeature}
          >
            Добавить позицию
          </button>
        </div>
        {Array.isArray(feature) &&
          feature.map((item, index) => (
            <div className="mb-5">
              <FeatureForm
                colors={colors}
                sizes={sizes}
                onChange={onChangeFeature}
                feature={item}
                index={index}
                remove={removeItemFeature}
              />
            </div>
          ))}
        <div className="my-3 text-left">
          <button
            className="ml-4 px-4 py-2 w-1/5 font-normal text-sm bg-amber-800 text-white  shadow-md opacity-80 hover:opacity-100"
            onClick={addNewDescription}
          >
            Добавить описание
          </button>
        </div>
        {Array.isArray(description) &&
          description.map((item, index) => (
            <DescriptionForm
              key={index}
              index={index}
              {...item}
              nameDescription="Название"
              nameTextArea="Описание"
              onChange={onChangeDescription}
              remove={removeItemDescription}
            />
          ))}
        <div className="m-5 text-center">
          <button
            className={`ml-4 px-4 py-2 w-1/5 font-normal text-sm ${
              saveButton
                ? "bg-amber-800 hover:opacity-100"
                : "bg-gray-300 opacity-100 cursor-default"
            } text-white  shadow-md opacity-80 hover:opacity-100`}
            onClick={updateProduct}
          >
            Сохранить
          </button>
          <button
            className="ml-4 px-4 py-2 w-1/5 font-normal text-sm bg-amber-800 text-white  shadow-md opacity-80 hover:opacity-100"
            onClick={() => navigate(-1)}
          >
            Назад
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
