import React from "react";

const Pagination = ({ currentPage, lastPage, onPageChange }) => {
  return (
    <div className="flex justify-center items-center space-x-2 mt-6">
      <button
        className="px-4 py-2 text-sm bg-gray-800 text-white rounded-md hover:bg-gray-600 disabled:opacity-50"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>
      {[...Array(lastPage)].map((_, index) => (
        <button
          key={index}
          className={`px-4 py-2 text-sm rounded-md ${
            currentPage === index + 1
              ? "bg-gray-800 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        className="px-4 py-2 text-sm bg-gray-800 text-white rounded-md hover:bg-gray-600 disabled:opacity-50"
        disabled={currentPage === lastPage}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;