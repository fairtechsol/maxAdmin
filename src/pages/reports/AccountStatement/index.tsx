import { debounce } from "lodash";
import moment from "moment-timezone";
import { useEffect, useState } from "react";
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
import { ApiConstants } from "../../../utils/Constants";

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
  { id: "description", label: "Remarks" },
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

  const [dateFrom, setDateFrom] = useState<any>();
  const [dateTo, setDateTo] = useState<any>();
  const [firstTime, setFirstTime] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [userOptions, setUserOptions] = useState([]);
  const [keyword, setKeyword] = useState<any>("");
  const [page, setPage] = useState<any>(1);
  const [rowPerPage, setRowPerPage] = useState<any>(10);
  const [sort, setSort] = useState({
    direction: "ASC",
    key: null,
  });
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
  const [aaccountTypeValues, setSelectedOption1] = useState<any>(null);

  const [gameNameOptions, setGameNameOptions] = useState<Option[]>([]);
  const [gameNameValues, setGameNameValues] = useState<any>(null);

  const { ReportAccountList } = useSelector(
    (state: RootState) => state.match.reportList
  );

  const { searchListData } = useSelector(
    (state: RootState) => state.user.userList
  );
  const { userDetail } = useSelector((state: RootState) => state.user.profile);

  const { betAccountStatementModal } = useSelector(
    (state: RootState) => state.match.reportList
  );

  const aaccountTypeOptions: Option[] = [
    { value: "all", label: "All" },
    { value: "balanceReport", label: "Balance Report" },
    { value: "gameReport", label: "Game Report" },
  ];

  const handleAccountTypeChange = (selectedOption: any) => {
    setSelectedOption1(selectedOption);
    if (
      selectedOption &&
      (selectedOption as Option).value === "balanceReport"
    ) {
      setGameNameOptions([
        { value: "all", label: "All" },
        { value: "upper", label: "Upper" },
        { value: "down", label: "Down" },
      ]);
    } else if (
      selectedOption &&
      (selectedOption as Option).value === "gameReport"
    ) {
      setGameNameOptions([
        { value: "all", label: "All" },
        { value: "cricket", label: "Cricket" },
        { value: "football", label: "Football" },
        { value: "horseRacing", label: "Horse Racing" },
        { value: "greyHound", label: "Greyhound Racing" },
        { value: "dt20", label: "Dragon Tiger 20-20" },
        { value: "teen20", label: "Teenpatti 20-20" },
        { value: "card32", label: "32 Cards-A" },
        { value: "lucky7", label: "Lucky 7" },
        { value: "abj", label: "Andar Bahar 2" },
        { value: "lucky7eu", label: "Lucky 7 - B" },
        { value: "dt202", label: "20-20 Dragon Tiger 2" },
        { value: "dtl20", label: "Dragon Tiger Lion" },
        { value: "dt6", label: "Dragon Tiger 1 Day" },
        { value: "teen", label: "Teen Patti One Day" },
      ]);
    } else if (selectedOption && (selectedOption as Option).value === "all") {
      setGameNameOptions([{ value: "all", label: "All" }]);
    } else {
      setGameNameOptions([]);
    }
    setGameNameValues(null);
  };

  const handleGameNameChange = (selectedOption: any) => {
    setGameNameValues(selectedOption);
  };

  const searchClientName = debounce(async (value: any) => {
    try {
      dispatch(
        searchList({
          userName: value,
          createdBy: userDetail?.id,
        })
      );
    } catch (e) {
      console.log(e);
    }
  }, 500);

  const handleSubmit = (e: any) => {
    try {
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
      // if (selectedUser && selectedUser?.length > 0) {
      //   filter += `&user.userName=${selectedUser[0]?.label}`;
      // }
      if (aaccountTypeValues && aaccountTypeValues?.value === "gameReport") {
        filter += `&transType=inArr${JSON.stringify([
          "win",
          "loss",
          // "bet",
        ])}`;
      } else if (
        aaccountTypeValues &&
        aaccountTypeValues?.value === "balanceReport"
      ) {
        filter += `&transType=inArr${JSON.stringify([
          "add",
          "withDraw",
          "creditReference",
        ])}`;
      }
      if (gameNameValues && aaccountTypeValues?.value === "balanceReport") {
        filter += `&gameName=${gameNameValues?.value}`;
      }
      if (gameNameValues && aaccountTypeValues?.value === "gameReport") {
        if (gameNameValues?.value !== "all") {
          filter += `&description=like%${gameNameValues?.value}/%`;
        }
      }
      dispatch(
        getReportAccountList({
          id: selectedUser
            ? selectedUser[0]?.value
            : localStorage.getItem("key"),
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
      // if (selectedUser && selectedUser?.length > 0) {
      //   filter += `&user.userName=${selectedUser[0]?.label}`;
      // }
      if (aaccountTypeValues && aaccountTypeValues?.value === "gameReport") {
        filter += `&transType=inArr${JSON.stringify([
          "win",
          "loss",
          // "bet",
        ])}`;
      } else if (
        aaccountTypeValues &&
        aaccountTypeValues?.value === "balanceReport"
      ) {
        filter += `&transType=inArr${JSON.stringify([
          "add",
          "withDraw",
          "creditReference",
        ])}`;
      }
      if (gameNameValues && aaccountTypeValues?.value === "balanceReport") {
        filter += `&gameName=${gameNameValues?.value}`;
      }
      if (gameNameValues && aaccountTypeValues?.value === "gameReport") {
        if (gameNameValues?.value !== "all") {
          filter += `&description=like%${gameNameValues?.value}/%`;
        }
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
      // if (selectedUser && selectedUser?.length > 0) {
      //   filter += `&user.userName=${selectedUser[0]?.label}`;
      // }
      if (aaccountTypeValues && aaccountTypeValues?.value === "gameReport") {
        filter += `&transType=inArr${JSON.stringify([
          "win",
          "loss",
          // "bet",
        ])}`;
      } else if (
        aaccountTypeValues &&
        aaccountTypeValues?.value === "balanceReport"
      ) {
        filter += `&transType=inArr${JSON.stringify([
          "add",
          "withDraw",
          "creditReference",
        ])}`;
      }
      if (gameNameValues && aaccountTypeValues?.value === "balanceReport") {
        filter += `&gameName=${gameNameValues?.value}`;
      }
      if (gameNameValues && aaccountTypeValues?.value === "gameReport") {
        filter += `&description=like%${gameNameValues?.value}/%`;
      }

      if (firstTime) {
        dispatch(
          getReportAccountList({
            id: selectedUser
              ? selectedUser[0]?.value
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

  return (
    <div className="p-2 pt-0">
      <h5 className="title-22 fw-normal">Account Statement</h5>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={2}>
            <SelectSearch
              defaultValue="All"
              // options={options}
              placeholder="All"
              label={"Account Type"}
              value={aaccountTypeValues}
              onChange={handleAccountTypeChange}
              options={aaccountTypeOptions}
            />
          </Col>
          <Col md={2}>
            <SelectSearch
              defaultValue="All"
              label={"Game Name"}
              // options={options}
              placeholder={"All"}
              value={gameNameValues}
              onChange={handleGameNameChange}
              options={gameNameOptions}
            />
          </Col>
          <Col md={2}>
            <SelectSearch
              label={"Search By Client Name"}
              options={userOptions}
              value={selectedUser}
              onChange={(value: any) => {
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
              isMultiOption={true}
              isSearchable={true}
              onInputChange={searchClientName}
            />
          </Col>
          <Col md={2}>
            <CustomInput
              title={"From"}
              placeholder={""}
              customstyle={"mb-3"}
              onChange={(e: any) => {
                setDateFrom(e.target.value);
              }}
              type="date"
              bgColor="lightGray"
            />
          </Col>
          <Col md={2}>
            <CustomInput
              title={"To"}
              placeholder={""}
              onChange={(e: any) => setDateTo(e.target.value)}
              customstyle={"mb-3"}
              type="date"
              bgColor="lightGray"
            />
          </Col>
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
        </Row>
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
        enablePdfExcel={true}
        handleReportExport={handleReportExport}
      >
        {ReportAccountList?.transactions?.map((item: any) => {
          const {
            createdAt,
            amount,
            closingBalance,
            description,
            actionByUser,
            user,
          } = item;
          return (
            <tr key={item?.id}>
              {/* {columns.map((column) => (
              <td key={column.id}>{item[column.id]}</td>
            ))} */}
              <td>{moment(createdAt).format("YYYY-MM-DD")} </td>
              <td className={`${amount > 0 ? "color-green" : ""}`}>
                {amount > 0 ? amount : 0}
              </td>
              <td className={`${amount < 0 ? "color-red" : ""}`}>
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
                          result: `inArr${JSON.stringify([
                            "WIN",
                            "LOSS",
                            "TIE",
                          ])}`,
                          sort: "betPlaced.createdAt:DESC",
                        })
                      );
                    }
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
    </div>
  );
};

export default AccountStatement;
