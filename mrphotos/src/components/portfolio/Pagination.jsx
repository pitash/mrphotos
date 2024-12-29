
import React from "react";

const Pagination = ({
  currentPage,
  lastPage,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
}) => {
  const maxVisiblePages = 5; // Maximum number of visible page buttons
  let pages = [];

  if (lastPage <= maxVisiblePages) {
    pages = Array.from({ length: lastPage }, (_, i) => i + 1);
  } else {
    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisiblePages / 2)
    );
    const endPage = Math.min(lastPage, startPage + maxVisiblePages - 1);

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push("start-ellipsis");
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < lastPage) {
      if (endPage < lastPage - 1) {
        pages.push("end-ellipsis");
      }
      pages.push(lastPage);
    }
  }

  return (
    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4 mt-6">
      {/* Previous and Next Buttons */}
      <div className="flex items-center space-x-2">
        <button
          className="px-3 py-2 text-sm bg-gray-800 text-white rounded-md hover:bg-gray-600 disabled:opacity-50 flex items-center"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <span className="mr-1">←</span> Previous
        </button>
        <button
          className="px-3 py-2 text-sm bg-gray-800 text-white rounded-md hover:bg-gray-600 disabled:opacity-50 flex items-center"
          disabled={currentPage === lastPage}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next <span className="ml-1">→</span>
        </button>
      </div>

      {/* Items per page */}
      <div className="flex items-center space-x-2">
        <label
          htmlFor="itemsPerPage"
          className="text-sm font-semibold text-gray-700"
        >
          Items per page:
        </label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={onItemsPerPageChange}
          className="p-2 border border-gray-300 rounded-md transition-all duration-300 ease-in-out focus:border-gray-800 animate-fade-in transform-gpu hover:scale-105"
          style={{
            transition: "all 0.3s ease-in-out",
          }}
        >
          <option value={3}>3</option>
          <option value={6}>6</option>
          <option value={9}>9</option>
          <option value={12}>12</option>
          <option value={20}>20</option>
        </select>
      </div>

      {/* Pages */}
      <div className="flex items-center space-x-2">
        <p className="text-gray-700">Pages:</p>
        {pages.map((page, index) =>
          typeof page === "string" ? (
            <span key={page + index} className="px-2 py-1 text-sm">
              ...
            </span>
          ) : (
            <button
              key={page}
              className={`px-3 py-2 text-sm rounded-md ${
                currentPage === page
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Pagination;