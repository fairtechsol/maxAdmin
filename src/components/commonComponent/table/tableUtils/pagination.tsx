import React from "react";
import { Pagination } from "react-bootstrap";
// import CustomButton from "../../button";
/*** */
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";

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
  return (
    <Pagination>
      <div className="paginationContainer title-14 mt-4">
        <Pagination.First
          disabled={currentPage <= 1 ? true : false}
          onClick={() => onPageChange(1)}
          linkStyle={{ border: "0px" }}
        >
          <MdOutlineKeyboardDoubleArrowLeft />
        </Pagination.First>
        <Pagination.Prev
          disabled={currentPage <= 1 ? true : false}
          onClick={() => onPageChange(currentPage - 1)}
          className="paginationBtn"
          linkStyle={{ border: "0px" }}
        >
          <MdOutlineKeyboardArrowLeft />
          {/* </CustomButton> */}
        </Pagination.Prev>
        {/* {pageComp?.map((item) => item)} */}
        <Pagination.Item
          linkStyle={{ backgroundColor: "#004a25", color: "#fff" }}
        >
          <span className="text-white">{currentPage}</span>
        </Pagination.Item>
        <Pagination.Next
          disabled={totalPages === 0 ? true : currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          linkStyle={{ border: "0px" }}
          // className="paginationBtn"
        >
          <MdOutlineKeyboardArrowRight />
          {/* </CustomButton> */}
        </Pagination.Next>
        <Pagination.Last
          disabled={totalPages === 0 ? true : currentPage === totalPages}
          onClick={() => onPageChange(totalPages)}
          linkStyle={{ border: "0px" }}
        >
          <MdOutlineKeyboardDoubleArrowRight />
        </Pagination.Last>
      </div>
    </Pagination>
  );
};

export default PaginationComponent;
