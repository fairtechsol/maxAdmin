import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import SelectSearch from "../../../components/commonComponent/SelectSearch";
import CustomInput from "../../../components/commonComponent/input";
import CustomTable from "../../../components/commonComponent/table";
import { TableConfig } from "../../../models/tableInterface";
import {
  getGameReport,
  resetGameReportList,
} from "../../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../../store/store";
import moment from "moment-timezone";
import _ from "lodash";

interface Column {
  id: string;
  label: string;
  type?: string;
}

// interface DataItem {
//   [key: string]: string | number;
// }

// Example usage
const columns: Column[] = [
  { id: "SrNo", label: "Sr No" },
  { id: "name", label: "Name" },
  { id: "Amount", label: "Amount" },
  { id: "srNo", label: "Sr No", type: "index" },
  { id: "user.userName", label: "Name" },
  { id: "amount", label: "Amount" },
];

// const data: DataItem[] = [];

const options = [
  { value: "all", label: "All" },
  { value: "match", label: "Match" },
  { value: "fancy", label: "Fancy" },
];

const secondOptions = [{ value: "all", label: "All" }];

const GameReport = () => {
  const dispatch: AppDispatch = useDispatch();
  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);
  const [dateFrom, setDateFrom] = useState<any>();
  const [dateTo, setDateTo] = useState<any>();

  useEffect(() => {}, [tableConfig]);

  const { gameReportList } = useSelector(
    (state: RootState) => state.match.reportList
  );
  const [selectType, setSelectType] = useState({ value: "ALL", label: "All" });

  const handleType = (type: any) => {
    setSelectType(type);
  };

  useEffect(() => {
    dispatch(getGameReport({}));
  }, []);

  const handleLoad = (e: any) => {
    e.preventDefault();
    let filter = "";
    if (dateFrom && dateTo) {
      filter += `&createdAt=between${moment(new Date(dateFrom))?.format(
        "YYYY-MM-DD"
      )}|${moment(
        new Date(dateTo).setDate(new Date(dateTo).getDate() + 1)
      )?.format("YYYY-MM-DD")}`;
    } else if (dateFrom) {
      filter += `&createdAt=gte${moment(dateFrom)?.format("YYYY-MM-DD")}`;
    } else if (dateTo) {
      filter += `&createdAt=lte${moment(dateTo)?.format("YYYY-MM-DD")}`;
    }
    if (selectType.value && selectType.value === "fancy") {
      dispatch(resetGameReportList());
    } else {
      dispatch(
        getGameReport({
          type: selectType?.value,
          // page: 1,
          limit: tableConfig?.rowPerPage,
          searchBy: "description",
          keyword: tableConfig?.keyword || "",
          filter,
        })
      );
    }
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
              customstyle={"mb-3"}
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
              customstyle={"mb-3"}
              onChange={(e: any) => setDateTo(e.target.value)}
              type="date"
            />
          </Col>
          <Col md={2}>
            <SelectSearch
              defaultValue={[selectType]}
              options={options}
              label={"Type"}
              onChange={handleType}
            />
          </Col>
          <Col md={2}>
            <Form.Label className="invisible d-block mt-1">dasd</Form.Label>
            <Button type="submit">Game List</Button>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col md={6}>
            <SelectSearch
              defaultValue={[{ value: "all", label: "All" }]}
              options={secondOptions}
            />
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
        isSort={false}
        isSearch={false}
        // itemCount={data?.length}
        itemCount={
          gameReportList && gameReportList?.count > 0
            ? gameReportList?.count
            : 0
        }
        setTableConfig={setTableConfig}
        enablePdfExcel={false}
      >
        {gameReportList && gameReportList?.count === 0 && (
          <tr>No data available in table </tr>
        )}
        {gameReportList?.count > 0 &&
          gameReportList?.rows?.map((item: any, index: any) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column.id}>
                  {column?.type === "index"
                    ? index + 1
                    : _.get(item, column?.id)}
                </td>
              ))}
            </tr>
          ))}
        {gameReportList?.count > 0 && (
          <tr>
            <td></td>
            <td>General Total</td>
            <td>0</td>
            <td></td>
            <td>General Total</td>
            <td>
              {gameReportList?.count > 0
                ? gameReportList?.rows?.reduce((acc: any, match: any) => {
                    return acc + +match?.amount;
                  }, 0)
                : 0}
            </td>
          </tr>
        )}
      </CustomTable>
    </div>
  );
};

export default GameReport;
