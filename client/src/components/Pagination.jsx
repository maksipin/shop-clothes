import React from "react";
import _ from "lodash";

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  const pages = _.range(1, pagesCount + 1);

  if (pagesCount === 1) return null;
  return (
    <div className=" m-auto flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden"></div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            {pages.map((page) => (
              <a
                aria-current="page"
                className={`relative z-10 inline-flex items-center border hover:bg-stone-200 ${
                  page === currentPage
                    ? "bg-amber-800 opacity-80 text-white"
                    : "text-amber-900"
                } border-amber-900 px-4 py-2 text-sm font-medium  focus:z-20 cursor-pointer`}
                onClick={() => {
                  onPageChange(page);
                }}
              >
                {page}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};
export default Pagination;
