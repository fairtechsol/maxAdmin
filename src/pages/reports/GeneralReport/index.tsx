import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import SelectSearch from "../../../components/commonComponent/SelectSearch";
import CustomTable from "../../../components/commonComponent/table";
import { TableConfig } from "../../../models/tableInterface";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { getGeneralReport } from "../../../store/actions/match/matchAction";

interface Column {
  id: string;
  label: string;
}

// interface DataItem {
//   [key: string]: string | number;
// }

// Example usage
const columns: Column[] = [
  { id: "sr", label: "Sr No" },
  { id: "name", label: "Name" },
  { id: "bl", label: "Amount" },
  { id: "srNo", label: "Sr No." },
  { id: "userName", label: "Name" },
  { id: "amount", label: "Amount" },
];

// const data: DataItem[] = [];

const options = [
  { value: "balance", label: "General Report" },
  { value: "creditReferance", label: "Credit Referance" },
];

const GeneralReport = () => {
  const dispatch: AppDispatch = useDispatch();
  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);
  const [selectType, setSelectType] = useState({ value: "ALL", label: "All" });

  useEffect(() => {}, [tableConfig]);

  const handleType = (type: any) => {
    setSelectType(type);
  };

  const { gameGeneralList } = useSelector(
    (state: RootState) => state.match.reportList
  );
  const handleLoad = (e: any) => {
    e.preventDefault();
    dispatch(
      getGeneralReport({
        type: selectType?.value,
        page: 1,
        limit: tableConfig?.rowPerPage,
        searchBy: "description",
        keyword: tableConfig?.keyword || "",
      })
    );
  };

  useEffect(() => {
    dispatch(getGeneralReport({ status: "" }));
  }, []);

  useEffect(() => {}, [tableConfig]);
  return (
    <div className="p-2 pt-0">
      <h5 className="title-22 fw-normal">General Report</h5>
      <Form onSubmit={(e) => handleLoad(e)}>
        <Row className="mb-4">
          <Col md={2}>
            <SelectSearch
              defaultValue={[selectType]}
              options={options}
              label={"Select Type"}
              placeholder={"All"}
              onChange={handleType}
            />
          </Col>
          <Col md={2}>
            <Form.Label className="invisible d-block">
              just invisible
            </Form.Label>
            <Button type="submit">Load</Button>
          </Col>
        </Row>
      </Form>
      <CustomTable
        customClass="commonTable reportTable"
        striped
        columns={columns}
        isPagination={false}
        isSort={true}
        isSearch={true}
        // itemCount={data?.length}
        itemCount={gameGeneralList?.usersData?.length}
        setTableConfig={setTableConfig}
        enablePdfExcel={false}
      >
        {gameGeneralList && gameGeneralList?.usersData?.length === 0 && (
          <tr>No data available in table </tr>
        )}
        {gameGeneralList &&
          gameGeneralList?.usersData?.map((item: any, index: any) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column.id}>
                  {column.id === "srNo" && index + 1}
                  {column.id === "amount" &&
                    item.userBal &&
                    item.userBal.currentBalance}
                  {column.id === "userName" && item[column.id]}
                </td>
              ))}
            </tr>
          ))}
      </CustomTable>
    </div>
  );
};

export default GeneralReport;
