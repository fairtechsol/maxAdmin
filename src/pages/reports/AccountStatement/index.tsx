import React from 'react';
import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import SelectSearch from "../../../components/commonComponent/SelectSearch";
import CustomButton from "../../../components/commonComponent/button";
import CustomInput from "../../../components/commonComponent/input";
import CustomModal from "../../../components/commonComponent/modal";
import CustomTable from "../../../components/commonComponent/table";
import AccountStatementModal from "../../../components/reports/modals/accountStatement";
import { TableConfig } from "../../../models/tableInterface";
import {
  getReportAccountList,
} from "../../../store/actions/match/matchAction";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { searchList } from '../../../store/actions/user/userActions';
import { debounce } from 'lodash';
// import moment from "moment-timezone";




interface Column {
  id: string;
  label: string;
}

interface DataItem {
  [key: string]: string | number;
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

const data: DataItem[] = [
  {
    date: "John",
    credit: 25,
    debit: 30,
    closing: "New York",
    description: "Cricket/3.3 over run SS W/Fancy-25",
    fromto: JSON.stringify(new Date()),
  },
  {
    date: "Jane",
    credit: 30,
    debit: 30,
    closing: "New York",
    description: "TEEN/Teen Patti Rno. 231611124752/Teen-Player B",
    fromto: JSON.stringify(new Date()),
  },
  {
    date: "Bob",
    credit: 22,
    debit: 30,
    closing: "New York",
    description: "Cricket/3.3 over run SS W/Fancy-25",
    fromto: JSON.stringify(new Date()),
  },
  {
    date: "Bob",
    credit: 22,
    debit: 30,
    closing: "New York",
    description: "Cricket/3.3 over run SS W/Fancy-25",
    fromto: JSON.stringify(new Date()),
  },
  {
    date: "Bob",
    credit: 22,
    debit: 30,
    closing: "New York",
    description: "Cricket/3.3 over run SS W/Fancy-25",
    fromto: JSON.stringify(new Date()),
  },
];

// const options = [
//   { value: "all", label: "All" },
//   { value: "balanceReport", label: "Balance Report" },
//   { value: "gameReport", label: "Game Report" },
// ];

interface Option {
  value: string;
  label: string;
}
const AccountStatement = () => {
  const { userList } = useSelector((state: RootState) => state.user.userList);
  const dispatch: AppDispatch = useDispatch();

  // const [dateFrom,setDateFrom]=useState(false);
  // const [dateTo,setDateTo]=useState(false);
  const [firstTime, setFirstTime] = useState(false);
  const [AccountStatementModalShow, setAccountStatementModalShow] =
    useState(false);
  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);

  const { ReportAccountList } = useSelector(
    (state: RootState) => state.match.reportList
  );
  const { userDetail } = useSelector(
    (state: RootState) => state.user.profile
  );

  // const accountTypeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const query = e.target.value;
  //   alert("56");
  // };



  // State for the first select
  const [selectedOption1, setSelectedOption1] = useState(null);

  // State and options for the second select
  const [options2, setOptions2] = useState<Option[]>([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);

  // Options for the first select
  const options1: Option[] = [
    { value: 'all', label: 'All' },
    { value: 'balanceReport', label: 'Balance Report' },
    { value: 'gameReport', label: 'Game Report' },
    // Add more options as needed
  ];

  // Function to handle the change of the first select
  const handleSelect1Change = (selectedOption: any) => {
    setSelectedOption1(selectedOption);

    // Update options for the second select based on the selected value of the first select
    if (selectedOption && (selectedOption as Option).value === 'balanceReport') {
      setOptions2([
        { value: 'upper', label: 'Upper' },
        { value: 'down', label: 'Down' },
        // Add more options as needed
      ]);
    } else if (selectedOption && (selectedOption as Option).value === 'gameReport') {
      setOptions2([
        { value: 'cricket', label: 'Cricket' },
        { value: 'football', label: 'Football' },
        { value: 'tennis', label: 'Tennis' },
        // Add more options as needed
      ]);
    } else if (selectedOption && (selectedOption as Option).value === 'all') {
      setOptions2([
        { value: 'all', label: 'All' },

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
    setSelectedOption(selectedOption);
  };

  const searchClientName = debounce(async (value: any) => {
    try {
      dispatch(
        searchList({
          userName: value,
          createdBy: userDetail?.id
        })
        );
    } catch (e) {
      console.log(e);
    }

  }, 500);
  console.log(userList, "getUsers6555");


  useEffect(() => {
    if (userDetail?.id && tableConfig && firstTime) {
      let filter = "";
      // if (dateFrom && dateTo) {
      //   filter += `&createdAt=between${moment(new Date(from))?.format(
      //     "DD/MM/YYYY"
      //   )}|${moment(new Date(to).setDate(to.getDate() + 1))?.format(
      //     "DD/MM/YYYY"
      //   )}`;
      // }
      // if (type) {
      //   filter += `&statementType=${type?.value}`;
      // }
      dispatch(
        getReportAccountList({
          id: userDetail?.id,
          page: tableConfig?.page,
          limit: tableConfig?.rowPerPage,
          searchBy: "description",
          keyword: tableConfig?.keyword || "",
          filter,
        })
      );
    }
  }, [userDetail?.id, tableConfig, firstTime]);
  return (
    <div className="p-2 pt-0">
      <h5 className="title-22 fw-normal">Account Statement</h5>
      <Form>
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
              // options={value}
              value={selectedOption}
              placeholder={"Client Name:"}
              isMultiOption={true}
              onChange={handleChange}
              onInputChange={searchClientName}
            />
          </Col>
          <Col md={2}>
            <CustomInput
              title={"From"}
              placeholder={""}
              customStyle={"mb-3"}
              type="date"
              bgColor="lightGray"
            />
          </Col>
          <Col md={2}>
            <CustomInput
              title={"To"}
              placeholder={""}
              customStyle={"mb-3"}
              type="date"
              bgColor="lightGray"
            />
          </Col>
          <Col md={2}>
            <Form.Label className="invisible d-block">dasd</Form.Label>
            <CustomButton onClick={() => {
              setFirstTime(true);
            }}>Load</CustomButton>
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
        itemCount={data?.length}
        setTableConfig={setTableConfig}
        enablePdfExcel={true}
      >
        {ReportAccountList?.transactions?.map((item: any, index: any) => {
          const { createdAt, amount, closingBalance, description, actionByUser, user } = item;
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
              <td>{"From: "}<span className="badge bg-primary">{actionByUser.userName}</span> {"To: "}<span className="badge bg-primary">{user.userName}</span> </td>
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
