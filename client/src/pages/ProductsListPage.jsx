import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getTypes } from "../store/type";
import { getProductsList } from "../store/products";
import { getUserId } from "../services/localStorage.service";
import { loadFavoritesList } from "../store/favorite";
import Pagination from "../components/Pagination";
import { paginate } from "../utils/paginate";
import SectionMenu from "../components/SectionMenu";
import sortItemsBy from "../utils/sortItemsBy";
import SortMenu from "../components/SortMenu";

const ProductsListPage = () => {
  const dispatch = useDispatch();
  const userId = getUserId();
  const { productType } = useParams([]);
  const type = useSelector(getTypes());
  const products = useSelector(getProductsList());
  const [selectedType, setSelectedType] = useState();
  const [quantityByRow, setQuantityByRow] = useState("2");
  const [pageSize, setPageSize] = useState("4");
  const [productsList, setProductsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState({ by: "timeStamp", direction: "asc" });

  useEffect(() => {
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
    const sortedProductList = sortItemsBy(productsList, sortDirection, sortKey);
    setProductsList(sortedProductList);
    setSortBy({ by: sortKey, direction: sortDirection });
  }

  const scrollingTop = (event) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
    scrollingTop();
  };

  const productsCrop = paginate(productsList, currentPage, pageSize);

  return (
    <div className="  m-auto sm:mt-20 mt-4 w-full h-full">
      <div className="ml-10 text-center text-3xl hidden sm:block">
        <h1>{selectedType?.title}</h1>
      </div>
      <div className="flex justify-between flex-wrap w-full">
        <SectionMenu type={type} />
        <div className=" flex-auto flex flex-col px-5   w-3/4  border-l">
          <SortMenu
            onSortBy={onSortBy}
            onChangepageSize={onChangepageSize}
            onChangeQuantityByRow={onChangeQuantityByRow}
            sortBy={sortBy}
            pageSize={pageSize}
            quantityByRow={quantityByRow}
          />
          <div className="mt-5 flex flex-wrap">
            {productsCrop.map((item, index) => (
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
