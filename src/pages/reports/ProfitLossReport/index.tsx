import { useEffect, useMemo, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import SelectSearch from "../../../components/commonComponent/SelectSearch";
import CustomButton from "../../../components/commonComponent/button";
import CustomInput from "../../../components/commonComponent/input";
import CustomModal from "../../../components/commonComponent/modal";
import CustomTable from "../../../components/commonComponent/table";
import ProfitLossModal from "../../../components/reports/modals/profitLoss";
import ProfitLossEventType from "../../../components/reports/profitLossEventType";
import { TableConfig } from "../../../models/tableInterface";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { searchList } from "../../../store/actions/user/userActions";
import { debounce } from "lodash";
import { getProfitLossReport } from "../../../store/actions/match/matchAction";
import moment from "moment-timezone";
import { cardGamesTypeNames } from "../../../utils/Constants";

interface Column {
  id: string;
  label: string;
}

const columns: Column[] = [
  { id: "gameName", label: "Game Name" },
  { id: "gameType", label: "Game Type" },
  { id: "profitLoss", label: "Profit & Loss" },
];

const ProfitLossReport = () => {
  const dispatch: AppDispatch = useDispatch();
  const [tableConfig, setTableConfig] = useState<TableConfig | null>({
    page: 1,
    sort: { direction: "ASC", key: null },
    rowPerPage: 10,
    keyword: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState<any>("");
  const [page, setPage] = useState<any>(1);
  const [rowPerPage, setRowPerPage] = useState<any>(10);
  const [sort, setSort] = useState({
    direction: "ASC",
    key: null,
  });
  const [profitLossModalShow, setProfitLossModalShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>([]);
  const [userOptions, setUserOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [dateFrom, setDateFrom] = useState<any>();
  const [dateTo, setDateTo] = useState<any>();
  const { userDetail } = useSelector((state: RootState) => state.user.profile);
  const { searchListData } = useSelector(
    (state: RootState) => state.user.userList
  );
  const { profitLossReport } = useSelector(
    (state: RootState) => state.match.reportList
  );

  useEffect(() => {
  
    const currentDate = new Date();
    const formattedCurrentDate = currentDate.toISOString().split("T")[0];

    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 7);
    const formattedPastDate = pastDate.toISOString().split("T")[0];


    setDateFrom(formattedPastDate);
    setDateTo(formattedCurrentDate);
  }, []);

  const debouncedInputValue = useMemo(() => {
    return debounce((value) => {
      dispatch(
        searchList({
          userName: value,
          createdBy: userDetail?.id,
        })
      );
    }, 500);
  }, []);

  useEffect(() => {
    let payload: any = {
      startDate: dateFrom ? dateFrom : "",
      endDate: dateTo
        ? moment(
            new Date(dateTo).setDate(new Date(dateTo).getDate() + 1)
          ).format("YYYY-MM-DD")
        : "",
      page: tableConfig?.page,
      limit: tableConfig?.rowPerPage,
      keyword: tableConfig?.keyword ?? "",
    };
    if (selectedUser[0]?.value) {
      payload.userId = selectedUser[0]?.value;
    }
    dispatch(getProfitLossReport(payload));
  }, [keyword, page, rowPerPage, sort]);

  useEffect(() => {
    if (page !== tableConfig?.page) {
      setPage(tableConfig?.page);
    }
    if (keyword !== tableConfig?.keyword) {
      setKeyword(tableConfig?.keyword);
    }
    if (
      sort?.direction !== tableConfig?.sort?.direction ||
      sort?.key !== tableConfig?.sort?.key
    ) {
      setSort(tableConfig?.sort);
    }
    if (rowPerPage !== tableConfig?.rowPerPage) {
      setRowPerPage(tableConfig?.rowPerPage);
    }
  }, [tableConfig]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let payload: any = {
      startDate: dateFrom ? dateFrom : "",
      endDate: dateTo
        ? moment(
            new Date(dateTo).setDate(new Date(dateTo).getDate() + 1)
          ).format("YYYY-MM-DD")
        : "",
      page: 1,
      limit: tableConfig?.rowPerPage,
      keyword: tableConfig?.keyword ?? "",
    };

    if (selectedUser[0]?.value) {
      payload.userId = selectedUser[0].value;
    }
    setCurrentPage(1);
    dispatch(getProfitLossReport(payload));
  };

  useEffect(() => {
    if (searchListData) {
      const options = searchListData?.users?.map((user: any) => ({
        value: user.id,
        label: user.userName,
      }));

      setUserOptions(options);
    }
  }, [searchListData]);

  return (
    <div className="p-2 pt-0">
      <h5 className="title-22 fw-normal">Profit Loss</h5>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={2}>
            <SelectSearch
              label={"Search By Client Name"}
              options={userOptions}
              value={selectedUser}
              inputValue={inputValue}
              onChange={(value: any) => {
                if (value?.length > 1) {
                  let newValue = value[1];
                  setSelectedUser([newValue]);
                } else if (value?.length === 0) {
                  setSelectedUser([]);
                } else {
                  setSelectedUser(value);
                }
              }}
              placeholder={"Client Name:"}
              isMultiOption={true}
              isSearchable={true}
              onInputChange={(value: any) => {
                setInputValue(value);
                debouncedInputValue(value);
              }}
            />
          </Col>
          <Col md={2}>
            <CustomInput
              title={"From"}
              placeholder={""}
              value={dateFrom}
              onChange={(e: any) => setDateFrom(e.target.value)}
              // customstyle={"mb-3"}
              type="date"
            />
          </Col>
          <Col md={2}>
            <CustomInput
              title={"To"}
              placeholder={""}
              value={dateTo}
              // customstyle={"mb-3"}
              onChange={(e: any) => setDateTo(e.target.value)}
              type="date"
            />
          </Col>
          <Col md={2}>
            <Form.Label className="invisible d-block">a</Form.Label>
            <Button type="submit">Load</Button>
          </Col>
        </Row>
      </Form>

      <ProfitLossEventType
        customClass="mb-3"
        totalProLoss={profitLossReport?.total}
      />
      <CustomTable
        customClass="commonTable reportTable"
        striped
        columns={columns}
        isPagination={true}
        isSort={true}
        isSearch={true}
        itemCount={profitLossReport ? profitLossReport?.count : 1}
        setTableConfig={setTableConfig}
        enablePdfExcel={false}
        tableConfig={tableConfig}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      >
        {profitLossReport && profitLossReport?.result?.length === 0 && (
          <tr>No data available in table </tr>
        )}
        {profitLossReport &&
          profitLossReport?.result?.length > 0 &&
          profitLossReport?.result?.map((item: any, index: number) => {
            const { eventType, marketType, aggregateAmount } = item;
            return (
              <tr key={index}>
                <td>
                  {cardGamesTypeNames[eventType]
                    ? cardGamesTypeNames[eventType]
                    : eventType}
                </td>
                <td>
                  <CustomButton
                    className="actionBtn"
                    variant="dark"
                    // onClick={() => setProfitLossModalShow((prev) => !prev)}
                  >
                    {marketType}
                  </CustomButton>
                </td>
                <td>{aggregateAmount}</td>
              </tr>
            );
          })}
      </CustomTable>
      <CustomModal
        customClass="modalFull-90 "
        // title={[
        //   <>
        //     <span className="f400">
        //       Client Ledger (Total Win Loss : 100) (Total Count : 1) (Total Soda
        //       : 1)
        //     </span>
        //   </>,
        // ]}
        show={profitLossModalShow}
        setShow={setProfitLossModalShow}
      >
        <ProfitLossModal />
      </CustomModal>
    </div>
  );
};

export default ProfitLossReport;
