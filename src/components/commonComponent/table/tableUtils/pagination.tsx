import React from "react";
import { Pagination } from "react-bootstrap";
// import CustomButton from "../../button";
/*** */

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
  itemCount: number;
  rowPerPage: number;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  itemCount,
  rowPerPage,
}) => {

  const isSmallScreen = window.innerWidth <= 768;
  return (
    <Pagination>
      <div className="paginationContainer title-14">
        <Pagination.First
          disabled={currentPage === 1}
          onClick={() => onPageChange(1)}
        >
          First
        </Pagination.First>
        <Pagination.Prev
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="paginationBtn"
        >
          Previous
          {/* </CustomButton> */}
        </Pagination.Prev>
        {isSmallScreen ? (
          <>
            <Pagination.Item
              key={1}
              active={currentPage === 1}
              onClick={() => onPageChange(1)}
              className="cursor-pointer"
            >
              1
            </Pagination.Item>
            <Pagination.Item
              key={2}
              active={currentPage === 2}
              onClick={() => onPageChange(2)}
              className="cursor-pointer"
            >
              2
            </Pagination.Item>
          </>
        ) : (
          <>
    {[...Array(Math.min(totalPages, 10))].map((_, index) => (
      <Pagination.Item
        key={index + 1}
        active={index + 1 === currentPage}
        onClick={() => onPageChange(index + 1)}
        className="cursor-pointer"
      >
        {index + 1}
      </Pagination.Item>
    ))}
    {totalPages > 10 && currentPage < totalPages - 5 && (
      <Pagination.Ellipsis disabled />
    )}
    {totalPages > 10 && currentPage < totalPages - 5 && (
      <Pagination.Item
        key={totalPages}
        active={currentPage === totalPages}
        onClick={() => onPageChange(totalPages)}
        className="cursor-pointer"
      >
        {totalPages}
      </Pagination.Item>
    )}
  </>
        )}
        {/* {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => onPageChange(index + 1)}
            className="cursor-pointer"
          >
            {index + 1}
          </Pagination.Item>
        ))} */}
        {/* <CustomButton
          variant="primary" */}
        <Pagination.Next
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          // className="paginationBtn"
        >
          Next
          {/* </CustomButton> */}
        </Pagination.Next>
        <Pagination.Last
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(totalPages)}
        >
          Last
        </Pagination.Last>
      </div>
    </Pagination>
  );
};

export default PaginationComponent;
