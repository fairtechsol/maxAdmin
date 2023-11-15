// CustomTable.tsx
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "./style.scss";
import PaginationComponent from "./tableUtils/pagination"; // Import the PaginationComponent
import RowPerPage from "./tableUtils/rowPerPage";
import SearchBox from "./tableUtils/search";
import SortIcon from "./tableUtils/sort";

interface Column {
  id: string;
  label: string;
}

interface DataItem {
  [key: string]: string | number;
}

interface SortConfig {
  key: string | null | number;
  direction: "asc" | "desc";
}

interface CustomTableProps {
  columns: Column[];
  data: DataItem[];
  customClass?: string;
  isPagination?: boolean;
  isSort?: boolean;
  children: any;
  itemCount: number;
  setTableConfig: any;
  isSearch: boolean;
}

const CustomTable: React.FC<CustomTableProps> = ({
  columns,
  itemCount,
  customClass,
  isPagination,
  isSort,
  children,
  isSearch,
  setTableConfig,
}) => {
  // State for sorting configuration and current page
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [keyword, setKeyword] = useState("");

  // Handle column click to change the sorting configuration
  const handleSort = (key: string | number) => {
    setSortConfig((prevSortConfig) => ({
      key,
      direction:
        prevSortConfig.key === key && prevSortConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  // Handle pagination item click to set the current page
  const onPageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  //   for api fetching when sort or page change
  useEffect(() => {
    setTableConfig({
      page: currentPage,
      sort: sortConfig,
      keyword: keyword,
    });
  }, [currentPage, keyword, sortConfig]);

  return (
    <div className={`${customClass ?? ""}`}>
      <div className="d-flex justify-content-between align-items-center">
        {isPagination && (
          <RowPerPage value={rowPerPage} onChange={setRowPerPage} />
        )}
        {isSearch && <SearchBox value={keyword} onSearch={setKeyword} />}
      </div>
      {/* Table for displaying data */}
      <Table striped bordered hover>
        <thead>
          <tr>
            {/* Table header with sorting icons */}
            {columns.map((column) => (
              <th key={column.id}>
                {column.label}
                {/* Display sorting icons based on the sorting configuration */}
                {isSort && (
                  <SortIcon
                    isActive={sortConfig.key === column.id}
                    isAscending={sortConfig.direction === "asc"}
                    clickHandler={handleSort}
                    id={column.id}
                  />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Table body with sorted data */}
          {itemCount === 0 ? (
            <tr className="text-center">
              <td colSpan={columns?.length}>
                <p className="title-14">No data available in table</p>
              </td>
            </tr>
          ) : (
            children
          )}
        </tbody>
      </Table>
      {/* Pagination component for navigating through pages */}
      {isPagination && (
        <PaginationComponent
          currentPage={currentPage}
          totalPages={Math.ceil(itemCount / rowPerPage)}
          onPageChange={onPageChange}
          itemCount={itemCount}
          rowPerPage={rowPerPage}
        />
      )}
    </div>
  );
};

export default CustomTable;
