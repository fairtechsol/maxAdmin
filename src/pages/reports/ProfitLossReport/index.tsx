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

interface Column {
  id: string;
  label: string;
}

interface DataItem {
  [key: string]: string | number;
}

// Example usage
const columns: Column[] = [
  { id: "gameName", label: "Game Name" },
  { id: "gameType", label: "Game Type" },
  { id: "profitLoss", label: "Profit & Loss" },
];

const data: DataItem[] = [
  {
    gameName: "gameName",
    gameType: 25,
    profitLoss: 30,
  },
  {
    gameName: "gameName",
    gameType: 25,
    profitLoss: 30,
  },
  {
    gameName: "gameName",
    gameType: 25,
    profitLoss: 30,
  },
];

// const options = [
//   { value: "slotGame", label: "Slot Game" },
//   { value: "liveCasino", label: "Live Casino" },
//   { value: "liveCasino1", label: "Live Casino 1" },
//   { value: "liveCasino2", label: "Live Casino 2" },
// ];

const ProfitLossReport = () => {
  const dispatch: AppDispatch = useDispatch();
  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);
  const [profitLossModalShow, setProfitLossModalShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [userOptions, setUserOptions] = useState([]);

  const { userDetail } = useSelector((state: RootState) => state.user.profile);
  const { searchListData } = useSelector(
    (state: RootState) => state.user.userList
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
      <Form>
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
              // customStyle={"mb-3"}
              type="date"
            />
          </Col>
          <Col md={2}>
            <CustomInput
              title={"To"}
              placeholder={""}
              // customStyle={"mb-3"}
              type="date"
            />
          </Col>
          <Col md={2}>
            <Form.Label className="invisible d-block">dasd</Form.Label>
            <Button>Load</Button>
          </Col>
        </Row>
      </Form>

      <ProfitLossEventType customClass="mb-3" />
      <CustomTable
        customClass="commonTable reportTable"
        striped
        columns={columns}
        isPagination={true}
        isSort={true}
        isSearch={true}
        itemCount={data?.length}
        setTableConfig={setTableConfig}
        enablePdfExcel={false}
      >
        {data?.length === 0 && <tr>No data available in table </tr>}
        {data?.length > 0 &&
          data.map((item, index) => {
            const { gameName, gameType, profitLoss } = item;
            return (
              <tr key={index}>
                <td>{gameName}</td>
                <td>
                  <CustomButton
                    className="actionBtn"
                    variant="dark"
                    onClick={() => setProfitLossModalShow((prev) => !prev)}
                  >
                    {gameType}
                  </CustomButton>
                </td>
                <td>{profitLoss}</td>
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
