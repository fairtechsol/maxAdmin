import React, { memo, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Column } from "../../../models/tableInterface";
import "./style.scss";
import TableHeader from "./tableHeader";
import PaginationComponent from "./tableUtils/pagination";
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

  const [rowPerPage, setRowPerPage] = useState<any>(
    tableConfig?.rowPerPage || 25
  );

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

  const onPageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    setTableConfig((prev: any) => {
      return {
        ...prev,
        page: currentPage,
        sort: sortConfig,
        rowPerPage: rowPerPage,
      };
    });
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
      <Table {...props} className={`${CustomTableClass}`} responsive>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                className={`${tHeadTheme}`}
                key={index}
                colSpan={column?.colSpan}
              >
                {column.label}
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
