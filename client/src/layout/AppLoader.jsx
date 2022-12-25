import React from "react";
import { useEffect } from "react";
import { Circles } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { getUserId } from "../services/localStorage.service";
import { loadCartList } from "../store/cart";
import { getColorsLoadingStatus, loadColorsList } from "../store/color";
import { getFavoritesIsLoading, loadFavoritesList } from "../store/favorite";
import { getProductsLoadingStatus, loadProductsList } from "../store/products";
import { getSizesLoadingStatus, loadSizesList } from "../store/size";
import { getTypesLoadingStatus, loadTypeList } from "../store/type";

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const userId = getUserId();

  useEffect(() => {
    dispatch(loadProductsList());
    dispatch(loadTypeList());
    dispatch(loadColorsList());
    dispatch(loadSizesList());
    dispatch(loadFavoritesList(userId));
    dispatch(loadCartList());
  }, []);
  console.log("App loader render");
  const isLoadingProduct = useSelector(getProductsLoadingStatus());
  const isLoadingTypes = useSelector(getTypesLoadingStatus());
  const isLoadingColors = useSelector(getColorsLoadingStatus());
  const isLoadingSizes = useSelector(getSizesLoadingStatus());
  const isLoadingFavorites = useSelector(getFavoritesIsLoading());

  const isLoading =
    !isLoadingProduct && !isLoadingTypes && !isLoadingColors && !isLoadingSizes;

  return (
    <>
      {isLoading ? (
        children
      ) : (
        <div className="m-auto h-[70vh] flex justify-center items-center">
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
      )}
    </>
  );
};

export default AppLoader;
