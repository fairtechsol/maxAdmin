import { useEffect, useState } from "react";
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

interface Column {
  id: string;
  label: string;
}

// Example usage
const columns: Column[] = [
  { id: "gameName", label: "Game Name" },
  { id: "gameType", label: "Game Type" },
  { id: "profitLoss", label: "Profit & Loss" },
];

const ProfitLossReport = () => {
  const dispatch: AppDispatch = useDispatch();
  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);
  const [profitLossModalShow, setProfitLossModalShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>([]);
  const [fromDate, setFromDate] = useState<any>();
  const [toDate, setToDate] = useState<any>();
  const [userOptions, setUserOptions] = useState([]);

  const { userDetail } = useSelector((state: RootState) => state.user.profile);
  const { searchListData } = useSelector(
    (state: RootState) => state.user.userList
  );
  const { profitLossReport } = useSelector(
    (state: RootState) => state.match.reportList
  );

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

  useEffect(() => {}, [tableConfig]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(
      getProfitLossReport({
        userId: selectedUser[0]?.value,
        startDate: fromDate ? fromDate : "",
        endDate: toDate ? toDate : "",
      })
    );
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
              onChange={setSelectedUser}
              placeholder={"Client Name:"}
              isMultiOption={true}
              isSearchable={true}
              onInputChange={searchClientName}
            />
          </Col>
          <Col md={2}>
            <CustomInput
              title={"From"}
              placeholder={""}
              value={fromDate}
              onChange={(e: any) => setFromDate(e.target.value)}
              // customStyle={"mb-3"}
              type="date"
            />
          </Col>
          <Col md={2}>
            <CustomInput
              title={"To"}
              placeholder={""}
              value={toDate}
              // customStyle={"mb-3"}
              onChange={(e: any) => setToDate(e.target.value)}
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
        itemCount={profitLossReport ? profitLossReport?.result?.length : 1}
        setTableConfig={setTableConfig}
        enablePdfExcel={false}
      >
        {profitLossReport && profitLossReport?.result?.length === 0 && (
          <tr>No data available in table </tr>
        )}
        {profitLossReport &&
          profitLossReport?.result?.length > 0 &&
          profitLossReport?.result.map((item: any, index: number) => {
            const { eventType, marketType, aggregateAmount } = item;
            return (
              <tr key={index}>
                <td>{eventType}</td>
                <td>
                  <CustomButton
                    className="actionBtn"
                    variant="dark"
                    onClick={() => setProfitLossModalShow((prev) => !prev)}
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
