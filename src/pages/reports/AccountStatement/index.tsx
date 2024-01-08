import React from "react";
import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import SelectSearch from "../../../components/commonComponent/SelectSearch";
import CustomButton from "../../../components/commonComponent/button";
import CustomInput from "../../../components/commonComponent/input";
import CustomModal from "../../../components/commonComponent/modal";
import CustomTable from "../../../components/commonComponent/table";
import AccountStatementModal from "../../../components/reports/modals/accountStatement";
import { TableConfig } from "../../../models/tableInterface";
import { getReportAccountList } from "../../../store/actions/match/matchAction";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { searchList } from "../../../store/actions/user/userActions";
import { debounce } from "lodash";
import moment from "moment-timezone";
// import moment from "moment-timezone";

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
const AccountStatement = () => {
  const dispatch: AppDispatch = useDispatch();

  const [dateFrom, setDateFrom] = useState<any>();
  const [dateTo, setDateTo] = useState<any>();
  const [firstTime, setFirstTime] = useState(false);
  const [AccountStatementModalShow, setAccountStatementModalShow] =
    useState(false);
  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);

  const { ReportAccountList } = useSelector(
    (state: RootState) => state.match.reportList
  );

  // const { searchListData } = useSelector(
  //   (state: RootState) => state.user.userList
  // );
  const { userDetail } = useSelector((state: RootState) => state.user.profile);
  const [selectedOption1, setSelectedOption1] = useState(null);

  const [options2, setOptions2] = useState<Option[]>([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);

  console.log(selectedUser);
  const options1: Option[] = [
    { value: "all", label: "All" },
    { value: "balanceReport", label: "Balance Report" },
    { value: "gameReport", label: "Game Report" },
  ];

  const handleSelect1Change = (selectedOption: any) => {
    setSelectedOption1(selectedOption);

    if (
      selectedOption &&
      (selectedOption as Option).value === "balanceReport"
    ) {
      setOptions2([
        { value: "upper", label: "Upper" },
        { value: "down", label: "Down" },
        // Add more options as needed
      ]);
    } else if (
      selectedOption &&
      (selectedOption as Option).value === "gameReport"
    ) {
      setOptions2([
        { value: "cricket", label: "Cricket" },
        { value: "football", label: "Football" },
        { value: "tennis", label: "Tennis" },
        // Add more options as needed
      ]);
    } else if (selectedOption && (selectedOption as Option).value === "all") {
      setOptions2([
        { value: "all", label: "All" },

        // Add more options as needed
      ]);
    } else {
      // Reset options if no option is selected
      setOptions2([]);
    }

    // ==== client Lst ====

    // Reset the selected option for the second select
    setSelectedOption2(null);
  };

  // Function to handle the change of the second select
  const handleSelect2Change = (selectedOption: any) => {
    setSelectedOption2(selectedOption);
  };

  const handleChange = (selectedOption: any) => {
    setSelectedUser(selectedOption);
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
    e.preventDefault();
    let filter = "";
    if (dateFrom && dateTo) {
      filter += `&createdAt=between${moment(new Date(dateFrom))?.format(
        "DD/MM/YYYY"
      )}|${moment(
        new Date(dateTo).setDate(new Date(dateTo).getDate() + 1)
      )?.format("DD/MM/YYYY")}`;
    }
    // if (type) {
    //   filter += `&statementType=${type?.value}`;
    // }
    dispatch(
      getReportAccountList({
        id: userDetail?.id,
        page: 1,
        limit: tableConfig?.rowPerPage,
        searchBy: "description",
        keyword: tableConfig?.keyword || "",
        filter,
      })
    );
  };

  useEffect(() => {
    if (userDetail?.id && tableConfig && firstTime) {
      dispatch(
        getReportAccountList({
          id: userDetail?.id,
          page: tableConfig?.page,
          limit: tableConfig?.rowPerPage,
          searchBy: "description",
          keyword: tableConfig?.keyword || "",
        })
      );
    }
  }, [userDetail?.id, tableConfig, firstTime]);

  let searchListData = {
    users: [{ value: "abc", name: "abc" }],
  };
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
              value={selectedOption1}
              onChange={handleSelect1Change}
              options={options1}
            />
          </Col>
          <Col md={2}>
            <SelectSearch
              defaultValue="All"
              label={"Game Name"}
              // options={options}
              placeholder={"All"}
              value={selectedOption2}
              onChange={handleSelect2Change}
              options={options2}
            />
          </Col>
          <Col md={2}>
            <SelectSearch
              defaultValue="All"
              label={"Search By Client Name"}
              options={
                searchListData &&
                searchListData?.users?.map((user: any) => ({
                  value: user.name,
                  label: user.name,
                }))
              }
              value={selectedUser}
              placeholder={"Client Name:"}
              isMultiOption={true}
              isSearchable={true  }
              onChange={handleChange}
              onInputChange={searchClientName}
            />
          </Col>
          <Col md={2}>
            <CustomInput
              title={"From"}
              placeholder={""}
              customStyle={"mb-3"}
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
              customStyle={"mb-3"}
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
        itemCount={2}
        setTableConfig={setTableConfig}
        enablePdfExcel={true}
      >
        {ReportAccountList?.transactions?.map((item: any, index: any) => {
          const {
            createdAt,
            amount,
            closingBalance,
            description,
            actionByUser,
            user,
          } = item;
          return (
            <tr key={index}>
              {/* {columns.map((column) => (
              <td key={column.id}>{item[column.id]}</td>
            ))} */}
              <td>{createdAt} </td>
              <td>{amount > 0 ? amount : ""}</td>
              <td>{amount < 0 ? amount : ""}</td>
              <td>{closingBalance}</td>
              <td>
                <CustomButton
                  className="actionBtn"
                  variant="dark"
                  onClick={() => setAccountStatementModalShow((prev) => !prev)}
                >
                  {description}
                </CustomButton>
              </td>
              <td>
                {"From: "}
                <span className="badge bg-primary">
                  {actionByUser.userName}
                </span>{" "}
                {"To: "}
                <span className="badge bg-primary">{user.userName}</span>{" "}
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
              Client Ledger (Total Win Loss : 100) (Total Count : 1) (Total Soda
              : 1)
            </span>
          </>,
        ]}
        show={AccountStatementModalShow}
        setShow={setAccountStatementModalShow}
      >
        <AccountStatementModal />
      </CustomModal>
    </div>
  );
};

export default AccountStatement;
