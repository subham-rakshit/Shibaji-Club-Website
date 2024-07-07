import React from "react";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

function Pagination({ currentPage, totalPages, onChangePage }) {
  //* Handle page changes -->
  const handlePageChange = (page) => {
    onChangePage(page);
  };

  //* Pagination buttons -->
  const renderPaginationButtons = () => {
    const maxButtons = 5; // Maximum number of buttons to display
    const startPageIndex = Math.max(1, currentPage - 2);
    const endPageIndex = Math.min(startPageIndex + maxButtons - 1, totalPages);

    let buttons = [];

    for (
      let pageIndex = startPageIndex;
      pageIndex <= endPageIndex;
      pageIndex++
    ) {
      buttons.push(
        <button
          type="button"
          key={pageIndex}
          onClick={() => handlePageChange(pageIndex)}
          className={`px-3 py-1 mx-1 rounded-full border font-[Inter] ${
            currentPage === pageIndex
              ? "bg-blue-500 text-white shadow-custom-light-dark"
              : "bg-white text-blue-500 border-blue-500"
          } hover:bg-blue-400 hover:text-white transition duration-300 ease-in-out`}
        >
          {pageIndex}
        </button>
      );
    }
    return buttons;
  };
  return (
    <div className="flex justify-center items-center mt-4">
      <button
        type="button"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 mx-5 rounded-full border border-blue-500 text-blue-500 hover:bg-blue-400 hover:text-white transition duration-300 ease-in-out font-[Inter] font-medium text-sm flex items-center ${
          currentPage === 1 ? "cursor-not-allowed line-through" : ""
        }`}
      >
        {currentPage !== 1 && (
          <FaLongArrowAltLeft className="w-4 h-4 inline-block mr-2" />
        )}
        <span>Previous</span>
      </button>
      {renderPaginationButtons()}
      <button
        type="button"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 mx-5 rounded-full border border-blue-500 text-blue-500 hover:bg-blue-400 hover:text-white transition duration-300 ease-in-out font-[Inter] font-medium text-sm flex items-center ${
          currentPage === totalPages ? "cursor-not-allowed line-through" : ""
        }`}
      >
        <span>Next</span>
        {currentPage !== totalPages && (
          <FaLongArrowAltRight className="w-4 h-4 inline-block ml-2" />
        )}
      </button>
    </div>
  );
}

export default Pagination;
