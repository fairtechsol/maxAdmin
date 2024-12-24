// CustomTable.tsx
import React, { memo, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Column } from "../../../models/tableInterface";
import "./style.scss";
import TableHeader from "./tableHeader";
import PaginationComponent from "./tableUtils/pagination"; // Import the PaginationComponent
import SortIcon from "./tableUtils/sort";

interface SortConfig {
  key: string | null | number;
  direction: "ASC" | "DESC";
}

interface CustomTableProps extends React.HTMLAttributes<HTMLDivElement> {
  columns: Column[];
  customClass?: string;
  isPagination?: boolean;
  isSort?: boolean;
  children?: any;
  itemCount: number;
  setTableConfig: any;
  isSearch?: boolean;
  enablePdfExcel?: boolean;
  tHeadTheme?: string;
  tBodyTheme?: string;
  bordered?: boolean;
  striped?: boolean;
  CustomTableClass?: string;
  endpoint?: string;
  sortData?: any;
  handleReportExport?: any;
  tableConfig?: any;
  currentPage: any;
  setCurrentPage: any;
  showHeaderEntries?: boolean;
  value?: number;
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
  tHeadTheme,
  tBodyTheme,
  CustomTableClass,
  sortData,
  handleReportExport,
  tableConfig,
  currentPage,
  setCurrentPage,
  showHeaderEntries,
  value,
  ...props
}) => {
  // State for sorting configuration and current page
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    direction: "ASC",
    key: null,
  });

  const [rowPerPage, setRowPerPage] = useState<any>(25);

  // Handle column click to change the sorting configuration
  const handleSort = (key: string | number) => {
    if (
      key === "ust" ||
      key === "accountType" ||
      key === "actions" ||
      key === "default" ||
      key === "casino"
    ) {
      return true;
    } else if (
      key === "balance" ||
      key === "availableBalance" ||
      key === "exposureLimit"
    ) {
      sortData(key);
    } else {
      setSortConfig((prevSortConfig) => ({
        direction:
          prevSortConfig.key === key && prevSortConfig.direction === "ASC"
            ? "DESC"
            : "ASC",
        key,
      }));
    }
  };

  // Handle pagination item click to set the current page
  const onPageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  //   for api fetching when sort or page change
  useEffect(() => {
    setTableConfig((prev: any) => {
      return {
        ...prev,
        page: currentPage,
        sort: sortConfig,
        rowPerPage: rowPerPage,
      };
    });
    // alert(tHeadTheme);
  }, [currentPage, sortConfig, rowPerPage]);

  useEffect(() => {
    if (value) {
      setRowPerPage(value);
    }
  }, [value]);
  return (
    <div className={`${customClass ?? ""} customTable`}>
      <TableHeader
        enablePdfExcel={enablePdfExcel}
        isPagination={isPagination}
        showHeaderEntries={showHeaderEntries}
        isSearch={isSearch}
        setTableConfig={setTableConfig}
        rowPerPage={rowPerPage}
        setRowPerPage={setRowPerPage}
        handleReportExport={handleReportExport}
        tableConfig={tableConfig}
      />
      {/* Table for displaying data */}
      <Table {...props} className={`${CustomTableClass}`} responsive>
        <thead>
          <tr>
            {/* Table header with sorting icons */}
            {columns.map((column, index) => (
              <th
                className={`${tHeadTheme}`}
                key={index}
                colSpan={column?.colSpan}
              >
                {column.label}
                {/* Display sorting icons based on the sorting configuration */}
                {isSort && (
                  <SortIcon
                    isActive={sortConfig.key === column.id}
                    isAscending={sortConfig.direction === "ASC"}
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
              <td className={`noRecord`} colSpan={columns?.length + 1}>
                <p className="title-14 mb-0">No data available in table</p>
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

export default memo(CustomTable);
