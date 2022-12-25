import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditProduct from "../../components/Admin/EditProduct";
import {
  addProduct,
  getProductsList,
  getProductsLoadingStatus,
  loadProductsList,
} from "../../store/products";
import { getTypes, loadTypeList } from "../../store/type";
import { Circles } from "react-loader-spinner";
import "../../../node_modules/react-loader-spinner/dist/loader/Circles";
import ProductCard from "../../components/ProductCard";
import { useNavigate } from "react-router-dom";
import productService from "../../services/product.service";

const Products = () => {
  const dispatch = useDispatch();
  const productsList = useSelector(getProductsList());
  const isProductsLoading = useSelector(getProductsLoadingStatus());
  const types = useSelector(getTypes());
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   dispatch(loadProductsList());
  //   dispatch(loadTypeList());
  //   setLoading(true);
  // }, []);

  useEffect(() => {
    if (!isProductsLoading) {
      setProducts(productsList);
      setLoading(false);
    }
  }, []);

  const addNewProduct = async () => {
    setLoading(true);
    const newProduct = {
      name: "",
      price: "",
      article: "",
      type_id: "",
      description: [],
      feature: [],
      img: [],
      label: [],
    };
    productService.create(newProduct).then((data) => {
      console.log("data", data);
      dispatch(loadProductsList());
      navigate(`./${data.content._id}`);
    });
    // dispatch(addProduct(newProduct));
    // navigate("./0");
  };

  const removeProduct = (id) => {
    setProducts((prevState) => prevState.filter((item) => item._id !== id));
  };

  if (!products || loading) {
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
      <div className="my-3 text-left">
        <button
          className="ml-4 px-4 py-2 w-52 font-normal text-sm bg-amber-800 text-white  shadow-md opacity-80 hover:opacity-100"
          onClick={addNewProduct}
        >
          Добавить продукт
        </button>
      </div>
      <div className="flex flex-wrap">
        {products.map((item, index) => (
          <ProductCard
            key={index}
            quantityByRow={"4"}
            {...item}
            admin={true}
            onAction={removeProduct}
            link="./"
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
