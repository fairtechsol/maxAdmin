import { useEffect, useMemo, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import CustomTable from "../../../components/commonComponent/table";
import { TableConfig } from "../../../models/tableInterface";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  getCasinoReport,
  getCasinoReportGameList,
} from "../../../store/actions/match/matchAction";
import moment from "moment-timezone";
import SelectSearch from "../../../components/commonComponent/SelectSearch";
import { debounce } from "lodash";
import { searchList } from "../../../store/actions/user/userActions";

interface Column {
  id: string;
  label: string;
}

const columns: Column[] = [
  { id: "gameName", label: "Game Name" },
  { id: "type", label: "Type" },
  { id: "amount", label: "Amount" },
  { id: "total", label: "Total" },
  { id: "date", label: "Date" },
  { id: "roundId", label: "Rond Id" },
  { id: "transactionId", label: "Transaction Id" },
];

const casinoTypeOptions = [
  { value: "settledBets", label: "Settled Bets" },
  { value: "unsettledBets", label: "UnSettled Bets" },
];

const CasinoReport = () => {
  const dispatch: AppDispatch = useDispatch();
  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [casinoTypeValues, setCasinoTypeValues] = useState<any>(null);
  const [gameTypeValues, setGameTypeValues] = useState<any>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [date, setDate] = useState<any>();
  const [userOptions, setUserOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [tempUser, setTempUser] = useState<any>(false);

  const { searchListData } = useSelector(
    (state: RootState) => state.user.userList
  );

  const { casinoReportGameList, casinoReport } = useSelector(
    (state: RootState) => state.match.reportList
  );

  const { userDetail } = useSelector((state: RootState) => state.user.profile);

  const handleCasinoTypeChange = (option: any) => {
    setDate(null);
    setCasinoTypeValues(option);
  };
  const handleGameTypeChange = (option: any) => {
    setGameTypeValues(option);
  };
  useEffect(() => {}, [tableConfig]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let filter: string = "";
    if (gameTypeValues && gameTypeValues !== "select") {
      filter += `&providerName=eq${gameTypeValues}`;
    }
    if (casinoTypeValues === "settledBets") {
      if (date) {
        filter += `&createdAt=eq${moment(date)?.format("YYYY-MM-DD")}`;
      }
      filter += `&settled=eqtrue`;
    }
    if (casinoTypeValues === "unsettledBets") {
      filter += `&settled=eqfalse`;
    }
    dispatch(
      getCasinoReport({
        id: selectedUser ? selectedUser?.value : localStorage.getItem("key"),
        page: 1,
        limit: tableConfig?.rowPerPage,
        searchBy: "gameName,providerName,gameId",
        keyword: tableConfig?.keyword ?? "",
        sort: "virtualCasinoBetPlaced.createdAt:DESC",
        filter: filter,
      })
    );
  };

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
    if (searchListData) {
      const options = searchListData?.users?.map((user: any) => ({
        value: user.id,
        label: user.userName,
      }));
      setUserOptions(options);
    }
  }, [searchListData]);

  useEffect(() => {
    dispatch(getCasinoReportGameList());
  }, []);

  return (
    <div className="p-2 pt-0">
      <h5 className="title-22 fw-normal">Casino Report</h5>

      <div
        style={{
          minHeight: "1px",
          padding: "1.25rem",
          backgroundColor: "#fff",
          boxShadow: "0 0.75rem 1.5rem rgba(18, 38, 63, 0.03)",
        }}
      >
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col lg={2} className="mb-3">
              <Form.Group controlId="casinoType">
                <Form.Select
                  value={casinoTypeValues}
                  onChange={(event) =>
                    handleCasinoTypeChange(event.target.value)
                  }
                  aria-label="Casino Type Select"
                >
                  <option value="select casino type">Select Casino Type</option>
                  {casinoTypeOptions.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col lg={2} className="mb-3">
              <SelectSearch
                // label={"Search By Client Name"}
                inputValue={inputValue}
                options={userOptions}
                value={tempUser ? null : selectedUser}
                onBlur={() => setTempUser(false)}
                onFocus={() => setTempUser(true)}
                onChange={(value: any) => {
                  setTempUser(false);
                  if (value?.length > 1) {
                    let newValue = value[1];
                    setSelectedUser([newValue]);
                  } else if (value?.length === 0) {
                    setSelectedUser(null);
                  } else {
                    setSelectedUser(value);
                  }
                }}
                placeholder={"Select Option"}
                isMultiOption={false}
                isSearchable={true}
                onInputChange={(value: any) => {
                  setInputValue(value);
                  debouncedInputValue(value);
                }}
              />
            </Col>
            {casinoTypeValues === "settledBets" && (
              <Col lg={2} className="mb-3">
                <Form.Control
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Col>
            )}
            <Col lg={2} className="mb-3">
              <Form.Group controlId="gameType">
                <Form.Select
                  value={gameTypeValues}
                  onChange={(event) => handleGameTypeChange(event.target.value)}
                  aria-label="Game Type Select"
                >
                  <option value="select">Select</option>
                  {casinoReportGameList?.map((option: any, index: number) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={2} className="mb-3">
              <Button type="submit">Submit</Button>
            </Col>
          </Row>
        </Form>
        <CustomTable
          customClass="commonTable reportTable"
          striped
          columns={columns}
          isPagination={true}
          isSort={true}
          isSearch={true}
          itemCount={casinoReport?.count || 0}
          setTableConfig={setTableConfig}
          enablePdfExcel={false}
          tableConfig={tableConfig}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        >
          {(casinoReport?.count || 0) === 0 && (
            <tr>No data available in table </tr>
          )}
          {(casinoReport?.count || 0) > 0 &&
            (casinoReport?.bets || [])?.map((item: any, index: number) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={column.id}>{item[column.id]}</td>
                ))}
              </tr>
            ))}
        </CustomTable>
      </div>
    </div>
  );
};

export default CasinoReport;
