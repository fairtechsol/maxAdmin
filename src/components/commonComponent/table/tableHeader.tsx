import React from "react";
import { FaRegFileExcel, FaRegFilePdf } from "react-icons/fa";
import CustomButton from "../button";
import RowPerPage from "./tableUtils/rowPerPage";
import SearchBox from "./tableUtils/search";
/**** */

interface TableHeaderProps {
  enablePdfExcel?: boolean;
  isPagination?: boolean;
  isSearch?: boolean;
  setTableConfig: any;
  rowPerPage: number;
  setRowPerPage: any;
  handleReportExport?: any;
  tableConfig: any;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  enablePdfExcel,
  isPagination,
  isSearch,
  setTableConfig,
  rowPerPage,
  setRowPerPage,
  handleReportExport,
  tableConfig,
}) => {
  // const [keyword, setKeyword] = useState("");

  const handleSearch = (keyword: string) => {
    setTableConfig((prev: any) => {
      return { ...prev, keyword: keyword };
    });
  };
  // useEffect(() => {}, [keyword]);

  return (
    <div className="d-flex justify-content-between align-items-center">
      {enablePdfExcel && (
        <div className="d-flex gap-1 mb-2">
          <CustomButton
            onClick={() => {
              handleReportExport("pdf");
            }}
            className="pdfExcel-btns d-flex gap-1 align-items-center pdf border-0 "
          >
            <FaRegFilePdf />
            PDF
          </CustomButton>
          <CustomButton
            onClick={() => {
              handleReportExport("excel");
            }}
            className="pdfExcel-btns d-flex gap-1 align-items-center excel border-0 "
          >
            <FaRegFileExcel />
            Excel
          </CustomButton>
        </div>
      )}
      {isPagination && (
        <RowPerPage value={rowPerPage} onChange={setRowPerPage} />
      )}
      {isSearch && (
        <>
          <SearchBox value={tableConfig?.keyword} onSearch={handleSearch} />
        </>
      )}
    </div>
  );
};

export default TableHeader;
