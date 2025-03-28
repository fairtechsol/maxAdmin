import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Column } from "../../../models/tableInterface";
import "./style.scss";
import TableHeader from "./tableHeader";
import PaginationComponent from "./tableUtils/pagination"; // Import the PaginationComponent
import SortIcon from "./tableUtils/sort";

interface SortConfig {
  key: string | null | number;
  direction: "asc" | "desc";
}
interface CustomTableProps {
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
  paginationCount?: boolean;
  width?: any;
  placeHolder?: any;
}

const CustomTable2: React.FC<CustomTableProps> = ({
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
  paginationCount,
  width,
  placeHolder,
  ...props
}) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(10);

  const handleSort = (key: string | number) => {
    setSortConfig((prevSortConfig) => ({
      key,
      direction:
        prevSortConfig.key === key && prevSortConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
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
    setCurrentPage(1);
    setTableConfig((prev: any) => {
      return {
        ...prev,
        page: 1,
      };
    });
  }, [rowPerPage]);
  return (
    <div className={`${customClass ?? ""}`}>
      <TableHeader
        enablePdfExcel={enablePdfExcel}
        isPagination={isPagination}
        isSearch={isSearch}
        setTableConfig={setTableConfig}
        rowPerPage={rowPerPage}
        setRowPerPage={setRowPerPage}
        paginationCount={paginationCount}
        placeHolder={placeHolder}
      />
      <div className="w-100">
        <Table {...props} responsive style={width ? { width: width } : {}}>
          <thead style={{ border: "1px solid #aaa" }}>
            <tr>
              {columns.map((column, index) => (
                <th
                  className={`${tHeadTheme} text-start ${"title-16 f600"}`}
                  key={index}
                  style={{
                    borderRight: "1px solid #aaa",
                    backgroundColor: "#eee",
                  }}
                >
                  {column.label}
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
          <tbody className="text-center" style={{ border: "1px solid #aaa" }}>
            {itemCount === 0 ? (
              <tr className="text-center ">
                <td className={`${tBodyTheme ?? ""}`} colSpan={columns?.length}>
                  <p className={`${"title-14"}`}>No data available in table</p>
                </td>
              </tr>
            ) : (
              children
            )}
          </tbody>
        </Table>
      </div>
      {isPagination && (
        <PaginationComponent
          currentPage={currentPage}
          totalPages={Math.ceil(itemCount / rowPerPage)}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default CustomTable2;
