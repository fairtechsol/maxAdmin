// CustomTable.tsx
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "./style.scss";
import TableHeader from "./tableHeader";
import PaginationComponent from "./tableUtils/pagination"; // Import the PaginationComponent
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
  isSearch?: boolean;
  enablePdfExcel?: boolean;
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
  enablePdfExcel,
}) => {
  // State for sorting configuration and current page
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(10);

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
    });
  }, [currentPage, sortConfig]);

  return (
    <div className={`${customClass ?? ""}`}>
      <TableHeader
        enablePdfExcel={enablePdfExcel}
        isPagination={isPagination}
        isSearch={isSearch}
        setTableConfig={setTableConfig}
        rowPerPage={rowPerPage}
        setRowPerPage={setRowPerPage}
      />
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
