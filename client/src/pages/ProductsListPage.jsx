import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

import {
  ArrowLongDownIcon,
  ArrowLongUpIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { getTypes, getTypesLoadingStatus } from "../store/type";
import { getProductsList, getProductsLoadingStatus } from "../store/products";
import { getUserId } from "../services/localStorage.service";
import { loadFavoritesList } from "../store/favorite";
import Pagination from "../components/Pagination";
import { paginate } from "../utils/paginate";

const ProductsListPage = () => {
  const dispatch = useDispatch();
  const sort = [
    { name: "Цена", key: "price" },
    { name: "Название", key: "name" },
    { name: "Новизна", key: "createdAt" },
  ];
  const userId = getUserId();
  const { productType } = useParams([]);
  const type = useSelector(getTypes());
  const products = useSelector(getProductsList());
  const isLoadingProduct = useSelector(getProductsLoadingStatus());
  const isLoadingType = useSelector(getTypesLoadingStatus());
  const [selectedType, setSelectedType] = useState();
  const [quantityByRow, setQuantityByRow] = useState("2");
  const [pageSize, setPageSize] = useState("4");
  const [productsList, setProductsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState({ by: "timeStamp", direction: "asc" });

  useEffect(() => {
    if (isLoadingType) return;
    const foundType = type.find((item) => item.type === productType);
    setSelectedType(foundType);
    setProductsList(() =>
      products.filter((item) => item.type_id === foundType._id)
    );
  }, [productType]);

  useEffect(() => {
    dispatch(loadFavoritesList(userId));
  }, []);

  function onChangeQuantityByRow({ target }) {
    setQuantityByRow(target.id);
  }
  function onChangepageSize({ target }) {
    setPageSize(target.id);
    setCurrentPage(1);
  }
  const onSortBy = ({ target }) => {
    sortedBy(target.id);
  };
  function sortedBy(sortKey) {
    if (!sortKey) return;
    const sortDirection =
      sortKey === sortBy.by
        ? sortBy.direction === "asc"
          ? "desc"
          : "asc"
        : "asc";

    setProductsList((prevState) =>
      prevState.sort((a, b) => {
        if (sortDirection === "asc")
          return typeof a[sortKey] === "string"
            ? a[sortKey].localeCompare(b[sortKey])
            : a[sortKey] - b[sortKey];
        else
          return typeof a[sortKey] === "string"
            ? b[sortKey].localeCompare(a[sortKey])
            : b[sortKey] - a[sortKey];
      })
    );
    setSortBy({ by: sortKey, direction: sortDirection });
  }

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const productsCrop = paginate(productsList, currentPage, pageSize);

  const scrollingTop = (event) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="  m-auto mt-20  w-full h-full">
      <div className="  mb-5 text-center text-3xl">
        {selectedType ? <h1>{selectedType.title}</h1> : <h1>Loading</h1>}
      </div>
      <div className="flex justify-between  w-full">
        <div className="">
          <ul className="ml-2 mt-32 sticky top-1/3 ">
            {!isLoadingType &&
              type.map((item, index) => (
                <NavLink key={index} to={`../${item.type}`}>
                  <li
                    onClick={scrollingTop}
                    key={index}
                    className="w-40 p-5 border-b text-center text-lg tracking-wider font-light border-b-amber-800 hover:text-amber-800 hover:-translate-y-1 duration-500"
                  >
                    {item.title}
                  </li>
                </NavLink>
              ))}
          </ul>
        </div>
        <div className=" flex-auto flex flex-col px-5   w-3/4  border-l">
          <div className="flex justify-between text-base font-normal ">
            <div className="flex align-middle">
              <span> Сортировка:</span>
              {sort.map((item, index) => (
                <div
                  key={index}
                  onClick={onSortBy}
                  id={item.key}
                  className={`flex flex-row text-base  px-2 hover:underline cursor-pointer ${
                    item.key === sortBy.by
                      ? " text-amber-800 opacity-100"
                      : "opacity-40"
                  }`}
                >
                  {item.name}
                  {item.key === sortBy.by ? (
                    sortBy.direction === "asc" ? (
                      <ArrowLongUpIcon className="h-5" />
                    ) : (
                      <ArrowLongDownIcon className="h-5" />
                    )
                  ) : null}
                </div>
              ))}
            </div>
            <div className=" ">
              <span className="mr-2">Показать на странице по</span>
              {[4, 8, 12].map((item, index) => (
                <span
                  key={index}
                  onClick={onChangepageSize}
                  id={item}
                  className={`text-base  px-2 hover:underline cursor-pointer ${
                    item === +pageSize
                      ? " text-amber-800 opacity-100 font-medium"
                      : "opacity-40"
                  }`}
                >
                  {item}
                </span>
              ))}
              <span className="ml-2"> в ряду по</span>
              {[2, 3, 4].map((item, index) => (
                <span
                  key={index}
                  onClick={onChangeQuantityByRow}
                  id={item}
                  className={`text-base px-2 hover:underline cursor-pointer ${
                    item === +quantityByRow
                      ? " text-amber-800 opacity-100 font-medium"
                      : "opacity-40"
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-5 flex flex-wrap">
            {!isLoadingProduct &&
              productsCrop.map((item, index) => (
                <ProductCard
                  key={item._id}
                  quantityByRow={quantityByRow}
                  {...item}
                  link={`./`}
                />
              ))}
          </div>
          <Pagination
            itemsCount={productsList.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsListPage;
