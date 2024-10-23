import React, { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
// import CustomButton from "../../button";
/*** */
import { MdOutlineKeyboardDoubleArrowLeft,MdOutlineKeyboardArrowRight, MdOutlineKeyboardDoubleArrowRight, MdOutlineKeyboardArrowLeft } from "react-icons/md";

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
  itemCount?: number;
  rowPerPage?: number;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  // itemCount,
  // rowPerPage,
}) => {
  // const isSmallScreen = window.innerWidth <= 768;

  const [pageComp, setPageComp] = useState([]);

  useEffect(() => {
    let isPageNumberOutOfRange: Boolean;
    const pageNumbers: any = [...new Array(totalPages)].map((_, index) => {
      const pageNumber = index + 1;
      const isPageNumberFirst = pageNumber === 1;
      const isPageNumberLast = pageNumber === totalPages;
      const isCurrentPageWithinTwoPageNumbers =
        Math.abs(pageNumber - currentPage) < 1;

      if (
        isPageNumberFirst ||
        isPageNumberLast ||
        isCurrentPageWithinTwoPageNumbers
      ) {
        isPageNumberOutOfRange = false;
        return (
          <Pagination.Item
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            active={pageNumber === currentPage}
          >
           <span className="text-black">{pageNumber}</span> 
          </Pagination.Item>
        );
      }

      if (!isPageNumberOutOfRange) {
        isPageNumberOutOfRange = true;
        return <Pagination.Ellipsis key={pageNumber} className="muted" />;
      }

      return null;
    });

    setPageComp(pageNumbers);
  }, [totalPages, currentPage]);

  return (
    <Pagination>
      <div className="paginationContainer title-14">
        <Pagination.First
          disabled={currentPage <= 1 ? true : false}
          onClick={() => onPageChange(1)}
        >
          <MdOutlineKeyboardDoubleArrowLeft />
        </Pagination.First>
        <Pagination.Prev
          disabled={currentPage <= 1 ? true : false}
          onClick={() => onPageChange(currentPage - 1)}
          className="paginationBtn"
        >
          <MdOutlineKeyboardArrowLeft />
          {/* </CustomButton> */}
        </Pagination.Prev>
        {pageComp?.map((item) => item)}
        <Pagination.Next
          disabled={totalPages === 0 ? true : currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          // className="paginationBtn"
        >
          <MdOutlineKeyboardArrowRight />
          {/* </CustomButton> */}
        </Pagination.Next>
        <Pagination.Last
          disabled={totalPages === 0 ? true : currentPage === totalPages}
          onClick={() => onPageChange(totalPages)}
        >
          <MdOutlineKeyboardDoubleArrowRight />
        </Pagination.Last>
      </div>
    </Pagination>
  );
};

export default PaginationComponent;
