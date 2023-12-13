// CustomTable.tsx
import { saveAs } from "file-saver";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Column } from "../../../models/tableInterface";
import service from "../../../service";
import { RootState } from "../../../store/store";
import "./style.scss";
import TableHeader from "./tableHeader";
import PaginationComponent from "./tableUtils/pagination"; // Import the PaginationComponent
import SortIcon from "./tableUtils/sort";

interface SortConfig {
  key: string | null | number;
  direction: "asc" | "desc";
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
  ...props
}) => {
  // State for sorting configuration and current page
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(1);

  const { userDetail } = useSelector((state: RootState) => state?.user);

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
    // alert(tHeadTheme);
  }, [currentPage, sortConfig]);
  console.log(columns);

  const handleExport = async (type: any) => {
    try {
      let url = `/user/list?type=${type}`;
      const response = await service.get(url, { responseType: "blob" });
      saveAs(
        response.data,
        userDetail?.userName ? userDetail?.userName : "file"
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={`${customClass ?? ""} customTable`}>
      <TableHeader
        handleExport={handleExport}
        enablePdfExcel={enablePdfExcel}
        isPagination={isPagination}
        isSearch={isSearch}
        setTableConfig={setTableConfig}
        rowPerPage={rowPerPage}
        setRowPerPage={setRowPerPage}
      />
      {/* Table for displaying data */}
      <Table {...props}>
        <thead>
          <tr>
            {/* Table header with sorting icons */}
            {columns.map((column) => (
              <th
                className={`${tHeadTheme}`}
                key={column.id}
                colSpan={column?.colSpan}
              >
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
              <td className={`noRecord`} colSpan={columns?.length}>
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

export default CustomTable;
