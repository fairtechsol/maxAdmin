import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import SelectSearch from "../../../components/commonComponent/SelectSearch";
import CustomInput from "../../../components/commonComponent/input";
import CustomTable from "../../../components/commonComponent/table";
import { TableConfig } from "../../../models/tableInterface";
import { getGameReport } from "../../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../../store/store";
import moment from "moment-timezone";

interface Column {
  id: string;
  label: string;
}

// interface DataItem {
//   [key: string]: string | number;
// }

// Example usage
const columns: Column[] = [
  { id: "srNo", label: "Sr No" },
  { id: "name", label: "Name" },
  { id: "amount", label: "Amount" },
  { id: "srNo", label: "Sr No" },
  { id: "name", label: "Name" },
  { id: "amount", label: "Amount" },
];

// const data: DataItem[] = [];

const options = [
  { value: "all", label: "All" },
  { value: "match", label: "Match" },
  { value: "fancy", label: "Fancy" },
];

const GameReport = () => {
  const dispatch: AppDispatch = useDispatch();
  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);
  const [dateFrom, setDateFrom] = useState<any>();
  const [dateTo, setDateTo] = useState<any>();

  useEffect(() => { }, [tableConfig]);

  const { gameReportList } = useSelector((state: RootState) => state.match.reportList);

  useEffect(() => {
    dispatch(getGameReport({ status: "" }));
  }, []);
  console.log("gameReportList :", gameReportList);

  const handleLoad = (e: any) => {
    e.preventDefault();
    let filter = "";
    if (dateFrom && dateTo) {
      filter += `&createdAt=between${moment(new Date(dateFrom))?.format(
        "DD/MM/YYYY"
      )}|${moment(
        new Date(dateTo).setDate(new Date(dateTo).getDate() + 1)
      )?.format("DD/MM/YYYY")}`;
    }
    console.log('filter :', filter);
    // dispatch(betReportAccountList({ status: selectType?.value }));
    dispatch(
      getGameReport({
        id: "",
        page: 1,
        limit: tableConfig?.rowPerPage,
        searchBy: "description",
        keyword: tableConfig?.keyword || "",
        filter,
      })
    );
  };

  return (
    <div className="p-2 pt-0">
      <h5 className="title-22 fw-normal">Game Report</h5>
      <Form onSubmit={(e) => handleLoad(e)} className="mb-4">
        <Row>
          <Col md={2}>
            <CustomInput
              title={"From"}
              placeholder={""}
              customStyle={"mb-3"}
              onChange={(e: any) => {
                setDateFrom(e.target.value);
              }}
              type="date"
            />
          </Col>
          <Col md={2}>
            <CustomInput
              title={"To"}
              placeholder={""}
              customStyle={"mb-3"}
              onChange={(e: any) => setDateTo(e.target.value)}
              type="date"
            />
          </Col>
          <Col md={2}>
            <SelectSearch
              defaultValue="slotGame"
              options={options}
              label={"Type"}
            />
          </Col>
          <Col md={2}>
            <Form.Label className="invisible d-block">dasd</Form.Label>
            <Button type="submit">Game List</Button>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col md={6}>
            <SelectSearch defaultValue="all" options={options} />
          </Col>
          <Col md={3}>
            <div className="d-flex">
              <Button className="me-2">Show Game Report</Button>
              <Button>Master Game Report</Button>
            </div>
          </Col>
        </Row>
      </Form>
      <CustomTable
        customClass="commonTable reportTable"
        striped
        columns={columns}
        isPagination={false}
        isSort={true}
        isSearch={false}
        // itemCount={data?.length}
        itemCount={gameReportList && gameReportList?.count > 0 ? gameReportList?.count : 0}
        setTableConfig={setTableConfig}
        enablePdfExcel={false}
      >
        {gameReportList && gameReportList?.count === 0 && <tr>No data available in table </tr>}
        {gameReportList?.count > 0 &&
          gameReportList?.list?.map((item: any, index: any) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column.id}>{item[column.id]}</td>
              ))}
            </tr>
          ))}
      </CustomTable>
    </div>
  );
};

export default GameReport;
