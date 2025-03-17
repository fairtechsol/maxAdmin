import { debounce } from "lodash";
import moment from "moment-timezone";
import { useEffect, useMemo, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import SelectSearch from "../../../components/commonComponent/SelectSearch";
import CustomButton from "../../../components/commonComponent/button";
import CustomInput from "../../../components/commonComponent/input";
import CustomModal from "../../../components/commonComponent/modal";
import CustomTable from "../../../components/commonComponent/table";
import AccountStatementModal from "../../../components/reports/modals/accountStatement";
import { TableConfig } from "../../../models/tableInterface";
import {
  getBetAccountStatementModal,
  getReportAccountList,
} from "../../../store/actions/match/matchAction";
import {
  handleExport,
  searchList,
} from "../../../store/actions/user/userActions";
import { AppDispatch, RootState } from "../../../store/store";
import {
  ApiConstants,
  card2ConstantsAccountStatement,
  gameConstantsAccountStatement,
} from "../../../utils/Constants";
import LiveCasinoModal from "./liveCasinoModal";
import {
  transactionProviderBetsReset,
  transactionProviderName,
} from "../../../store/actions/card/cardDetail";
// import isMobile from "../../../utils/screenDimension";

interface Column {
  id: string;
  label: string;
}

// Example usage
const columns: Column[] = [
  { id: "date", label: "Date" },
  { id: "credit", label: "Credit" },
  { id: "debit", label: "Debit" },
  { id: "closing", label: "Closing" },
  { id: "description", label: "Description" },
  { id: "fromto", label: "Fromto" },
];

interface Option {
  value: string;
  label: string;
}

let sortConstant: any = {
  date: "createdAt",
  credit: "amount",
  debit: "amount",
  closing: "closingBalance",
  description: "description",
};

const AccountStatement = () => {
  const dispatch: AppDispatch = useDispatch();
  const [excel, setExcel] = useState(false);
  const [dateFrom, setDateFrom] = useState<any>();
  const [dateTo, setDateTo] = useState<any>();
  const [firstTime, setFirstTime] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedUserValue] = useState<any>("null");
  const [tempUser, setTempUser] = useState<any>(false);
  const [userOptions, setUserOptions] = useState([]);
  const [keyword, setKeyword] = useState<any>("");
  const [page, setPage] = useState<any>(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState<any>(10);
  const [sort, setSort] = useState({
    direction: "ASC",
    key: null,
  });
  const [liveCasinoModal, setLiveCasinoModal] = useState(false);
  const [AccountStatementModalShow, setAccountStatementModalShow] =
    useState(false);
  const [itemForModal, setItemForModal] = useState(null);
  useState(false);
  const [tableConfig, setTableConfig] = useState<TableConfig | null>({
    page: 1,
    sort: { direction: "ASC", key: null },
    rowPerPage: 10,
    keyword: "",
  });
  const [aaccountTypeValues, setAccountTypeValues] = useState<any>(null);

  const [gameNameOptions, setGameNameOptions] = useState<Option[]>([]);
  const [gameNameValues, setGameNameValues] = useState<any>(null);
  const [inputValue, setInputValue] = useState("");
  const [updatedReport, setUpdateReports] = useState<any>([]);

  const { ReportAccountList } = useSelector(
    (state: RootState) => state.match.reportList
  );
  const { liveCasinoProviderBets, liveCasinoProvider } = useSelector(
    (state: RootState) => state.card
  );
  const { searchListData } = useSelector(
    (state: RootState) => state.user.userList
  );
  const { userDetail } = useSelector((state: RootState) => state.user.profile);

  const { betAccountStatementModal } = useSelector(
    (state: RootState) => state.match.reportList
  );

  const aaccountTypeOptions: Option[] = [
    {
      value: "0",
      label: "Deposit/Withdraw Reports",
    },
    {
      value: "1",
      label: "Sport Report",
    },
    {
      value: "2",
      label: "Casino Reports",
    },
    {
      value: "3",
      label: "Third-Party Casino Reports",
    },
  ];
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1199);
  const handleAccountTypeChange = (selectedOption: any) => {
    setAccountTypeValues(selectedOption);
    if (selectedOption && selectedOption === "0") {
      setGameNameOptions([
        // { value: "all", label: "All" },
        { value: "upper", label: "Upper" },
        { value: "down", label: "Down" },
      ]);
    } else if (selectedOption && selectedOption === "1") {
      setGameNameOptions(gameConstantsAccountStatement);
    } else if (selectedOption && selectedOption === "2") {
      setGameNameOptions(card2ConstantsAccountStatement);
    } else if (selectedOption && selectedOption === "all") {
      setGameNameOptions([]);
    } else {
      setGameNameOptions([]);
    }
    setGameNameValues(null);
  };

  const handleGameNameChange = (event: any) => {
    const selectedValue = event.target.value;
    setGameNameValues(selectedValue);
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
    if (inputValue != "") {
      debouncedInputValue(inputValue);
    }
  }, [inputValue, selectedUser]);

  const handleSubmit = (e: any) => {
    try {
      e.preventDefault();
      setExcel(true);
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

      if (gameNameValues && aaccountTypeValues === "0") {
        filter += `&gameName=${gameNameValues}`;
      }
      if (
        gameNameValues &&
        aaccountTypeValues !== "0" &&
        gameNameValues !== "all"
      ) {
        filter += `&description=like%${gameNameValues}/%`;
      }
      if (aaccountTypeValues && aaccountTypeValues !== "All") {
        filter += `&transaction.type=${aaccountTypeValues}`;
      }
      setCurrentPage(1);
      dispatch(
        getReportAccountList({
          id: selectedUser ? selectedUser?.value : localStorage.getItem("key"),
          page: 1,
          limit: tableConfig?.rowPerPage,
          searchBy: "description",
          keyword: tableConfig?.keyword ?? "",
          filter: filter,
          sort: "transaction.createdAt:DESC,transaction.uniqueId:DESC",
        })
      );
      setTableConfig((prev: any) => {
        return {
          ...prev,
          sort: { key: null, direction: "ASC" },
        };
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleReportExport = (type: string) => {
    if (firstTime) {
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

      if (gameNameValues && aaccountTypeValues === "0") {
        filter += `&gameName=${gameNameValues}`;
      }
      if (
        gameNameValues &&
        aaccountTypeValues !== "0" &&
        gameNameValues !== "all"
      ) {
        filter += `&description=like%${gameNameValues}/%`;
      }
      if (aaccountTypeValues && aaccountTypeValues !== "All") {
        filter += `&transaction.type=${aaccountTypeValues}`;
      }
      dispatch(
        handleExport({
          endpoint: `${ApiConstants.REPORT.ACCOUNTLIST}/${
            selectedUser ? selectedUser[0]?.value : localStorage.getItem("key")
          }`,
          type: type,
          id: selectedUser
            ? selectedUser[0]?.value
            : localStorage.getItem("key"),
          filter: filter,
          searchBy: "description",
          keyword: tableConfig?.keyword ?? "",
          sort: "transaction.createdAt:DESC,transaction.uniqueId:DESC",
          name: "Account Statement",
        })
      );
    }
  };

  const handleClickToOpenBetModal = (item: any, user: any) => {
    const match = item?.description.match(/Rno\. (\d+\.\d+)/);
    if (item?.betId) {
      setAccountStatementModalShow((prev) => !prev);
      setItemForModal(item);
      dispatch(
        getBetAccountStatementModal({
          id: user?.id,
          betId: item?.betId,
          status: null,
          sort: "betPlaced.createdAt:DESC",
        })
      );
    } else if (match && match[1]) {
      setAccountStatementModalShow((prev) => !prev);
      setItemForModal(item);
      dispatch(
        getBetAccountStatementModal({
          id: user?.id,
          isCard: true,
          runnerId: match[1],
          result: `inArr${JSON.stringify(["WIN", "LOSS", "TIE"])}`,
          sort: "betPlaced.createdAt:DESC",
        })
      );
    }
  };

  useEffect(() => {
    try {
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

      if (gameNameValues && aaccountTypeValues === "0") {
        filter += `&gameName=${gameNameValues}`;
      }
      if (
        gameNameValues &&
        aaccountTypeValues !== "0" &&
        gameNameValues !== "all"
      ) {
        filter += `&description=like%${gameNameValues}/%`;
      }
      if (aaccountTypeValues && aaccountTypeValues !== "All") {
        filter += `&transaction.type=${aaccountTypeValues}`;
      }
      if (firstTime) {
        dispatch(
          getReportAccountList({
            id: selectedUser
              ? selectedUser[0]?.value
                ? selectedUser[0]?.value
                : selectedUser?.value
              : localStorage.getItem("key"),
            page: tableConfig?.page,
            limit: tableConfig?.rowPerPage,
            searchBy: "description",
            keyword: tableConfig?.keyword ?? "",
            sort: tableConfig?.sort?.key
              ? sortConstant[tableConfig?.sort?.key]
                ? `transaction.${sortConstant[tableConfig?.sort?.key]}:${
                    tableConfig?.sort?.direction
                  }`
                : "transaction.createdAt:DESC,transaction.uniqueId:DESC"
              : "transaction.createdAt:DESC,transaction.uniqueId:DESC",
            filter,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  }, [page, keyword, sort, rowPerPage]);

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
    dispatch(transactionProviderName(""));
  }, []);

  useEffect(() => {
    const currentDate = new Date();
    const formattedCurrentDate = currentDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD

    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 7);
    const formattedPastDate = pastDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD

    setDateFrom(formattedPastDate);
    setDateTo(formattedCurrentDate);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1199);
    };
    // Add event listener to update isMobile on window resize
    window.addEventListener("resize", handleResize);
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLiveCasinoModalOpen = (item: any, user: any) => {
    setLiveCasinoModal(true);
    setItemForModal(item);
  };

  useEffect(() => {
    if (liveCasinoProviderBets?.bets) {
      let runningTotal = 0;
      const dataWithTotal = liveCasinoProviderBets.bets.map((item: any) => {
        runningTotal += parseFloat(item?.amount || 0);
        return { ...item, total: runningTotal };
      });
      setUpdateReports(dataWithTotal);
    }
  }, [liveCasinoProviderBets]);

  const handleCloseLiveCasinoModal = () => {
    setLiveCasinoModal(false);
    dispatch(transactionProviderBetsReset());
    setUpdateReports([]);
  };
  return (
    <div className="p-2 pt-0">
      <h5 className="title-22 fw-normal">Account Statement</h5>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={isMobile ? 12 : 2}>
            <Form.Group controlId="accountTypeSelect">
              <Form.Label>Account Type</Form.Label>
              <Form.Select
                value={aaccountTypeValues}
                onChange={(event) =>
                  handleAccountTypeChange(event.target.value)
                }
                aria-label="Account Type Select"
              >
                <option value="All">All</option>
                {aaccountTypeOptions.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            {/* <SelectSearch
              defaultValue="All"
              // options={options}
              placeholder="All"
              label={"Account Type"}
              value={aaccountTypeValues}
              onChange={handleAccountTypeChange}
              options={aaccountTypeOptions}
            /> */}
          </Col>
          {aaccountTypeValues !== "3" && (
            <Col md={isMobile ? 12 : 2}>
              <Form.Group controlId="gameNameSelect">
                <Form.Label>
                  {aaccountTypeValues === "1"
                    ? "Sports List"
                    : aaccountTypeValues === "2"
                    ? "Casino List"
                    : "Game Name"}
                </Form.Label>
                <Form.Select
                  value={gameNameValues}
                  onChange={handleGameNameChange}
                  aria-label="Game Name Select"
                >
                  <option value="all">All</option>
                  {gameNameOptions.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          )}
          <Col md={isMobile ? 12 : 2}>
            <SelectSearch
              label={"Search By Client Name"}
              inputValue={inputValue}
              options={userOptions}
              value={tempUser ? selectedUserValue : selectedUser}
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
              placeholder={"Please enter 3 or more characters"}
              isMultiOption={false}
              isSearchable={true}
              onInputChange={(value: any) => {
                setInputValue(value);
                //debouncedInputValue(value);
              }}
            />
          </Col>
          <Col md={isMobile ? 12 : 2}>
            <CustomInput
              title={"From"}
              placeholder={""}
              customstyle={"mb-3"}
              onChange={(e: any) => {
                setDateFrom(e.target.value);
              }}
              type="date"
              bgColor="lightGray"
              value={dateFrom}
            />
          </Col>
          <Col md={isMobile ? 12 : 2}>
            <CustomInput
              title={"To"}
              placeholder={""}
              onChange={(e: any) => setDateTo(e.target.value)}
              customstyle={"mb-3"}
              type="date"
              bgColor="lightGray"
              value={dateTo}
            />
          </Col>
        </Row>
        <Col md={2}>
          <Form.Label className="invisible d-block">dasd</Form.Label>
          <CustomButton
            type={"submit"}
            onClick={() => {
              setFirstTime(true);
            }}
          >
            Load
          </CustomButton>
        </Col>
      </Form>
      <CustomTable
        striped
        customClass="mt-4 commonTable reportTable"
        columns={columns}
        isPagination={true}
        isSort={true}
        isSearch={true}
        itemCount={
          ReportAccountList && ReportAccountList?.count > 0
            ? ReportAccountList?.count
            : 0
        }
        setTableConfig={setTableConfig}
        enablePdfExcel={excel}
        handleReportExport={handleReportExport}
        tableConfig={tableConfig}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      >
        {ReportAccountList?.transactions?.map((item: any) => {
          const {
            createdAt,
            amount,
            closingBalance,
            description,
            actionByUser,
            user,
            type,
          } = item;
          return (
            <tr key={item?.id}>
              {/* {columns.map((column) => (
              <td key={column.id}>{item[column.id]}</td>
            ))} */}
              <td>{moment(createdAt).format("YYYY-MM-DD")} </td>
              <td
                className={`cursor-pointer ${amount > 0 ? "color-green" : ""}`}
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  handleClickToOpenBetModal(item, user);
                }}
              >
                {amount > 0 ? amount : 0}
              </td>
              <td
                className={`${amount < 0 ? "color-red" : ""}`}
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  handleClickToOpenBetModal(item, user);
                }}
              >
                {amount < 0 ? amount : 0}
              </td>
              <td
                className={`${
                  closingBalance > 0 ? "color-green" : "color-red"
                }`}
              >
                {closingBalance}
              </td>
              <td>
                <CustomButton
                  className="actionBtn"
                  variant="dark"
                  onClick={() => {
                    type === 3
                      ? handleLiveCasinoModalOpen(item, user)
                      : aaccountTypeValues === "3"
                      ? handleLiveCasinoModalOpen(item, user)
                      : handleClickToOpenBetModal(item, user);
                  }}
                >
                  {description}
                </CustomButton>
              </td>
              <td>
                {"From: "}
                <span className="badge bg-primary">
                  {actionByUser?.userName}
                </span>{" "}
                {"To: "}
                <span className="badge bg-primary">{user?.userName}</span>{" "}
              </td>
            </tr>
          );
        })}
      </CustomTable>

      <CustomModal
        customClass="modalFull-90 "
        title={[
          <>
            <span className="f400">
              Client Ledger (Total Win Loss :{" "}
              {betAccountStatementModal?.totalCount?.amount || 0})
              {/* (Total Count
              : {betAccountStatementModal?.totalCount?.totalCount || 0})  */}{" "}
              (Total Bets : {betAccountStatementModal?.totalCount?.soda || 0})
            </span>
          </>,
        ]}
        show={AccountStatementModalShow}
        setShow={setAccountStatementModalShow}
      >
        <AccountStatementModal item={itemForModal} />
      </CustomModal>
      <LiveCasinoModal
        liveCasinoModal={liveCasinoModal}
        selected={itemForModal}
        handleCloseLiveCasinoModal={handleCloseLiveCasinoModal}
        liveCasinoProvider={liveCasinoProvider}
        updatedReport={updatedReport}
      />
    </div>
  );
};

export default AccountStatement;
