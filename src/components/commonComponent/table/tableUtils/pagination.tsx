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
      //   Showing {currentPage === 1 ? 1 : (currentPage - 1) * rowPerPage + 1} to{" "}
      //   {Math.min(currentPage * rowPerPage, itemCount)} of {itemCount} entries
      // </div>
      // <div className="paginationContainer">
      //   <CustomButton
      //     variant="primary"
      disabled={currentPage === 1}
      onClick={() => onPageChange(currentPage - 1)}
      className="paginationBtn"
      >
          Previous
          {/* </CustomButton> */}
          </Pagination.Prev>

        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => onPageChange(index + 1)}
            className="cursor-pointer"
          >
            {index + 1}
          </Pagination.Item>
        ))}
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
