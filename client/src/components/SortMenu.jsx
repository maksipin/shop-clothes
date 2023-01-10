import {
  ArrowLongDownIcon,
  ArrowLongUpIcon,
} from "@heroicons/react/24/outline";
import React from "react";

const SortMenu = ({
  onSortBy,
  onChangepageSize,
  onChangeQuantityByRow,
  sortBy,
  quantityByRow,
  pageSize,
}) => {
  const sort = [
    { name: "Цена", key: "price" },
    { name: "Название", key: "name" },
    { name: "Новизна", key: "createdAt" },
  ];

  return (
    <div className="flex justify-between flex-wrap text-base font-normal ">
      <div className="flex align-middle mb-4 sm:mb-0">
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
      <div className="">
        <span className="mr-2">Показать на странице по</span>
        {[4, 8, 12].map((item, index) => (
          <span
            key={index}
            onClick={onChangepageSize}
            id={item}
            className={`text-base  sm:px-2 px-4 hover:underline cursor-pointer ${
              item === +pageSize
                ? " text-amber-800 opacity-100 font-medium"
                : "opacity-40"
            }`}
          >
            {item}
          </span>
        ))}
        <span className="ml-2 hidden sm:inline-block"> в ряду по</span>
        {[2, 3, 4].map((item, index) => (
          <span
            key={index}
            onClick={onChangeQuantityByRow}
            id={item}
            className={`text-base px-2 hidden sm:inline-block hover:underline cursor-pointer ${
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
  );
};

export default React.memo(SortMenu);
