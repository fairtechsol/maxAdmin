import { Accordion, Col } from "react-bootstrap";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import "./style.scss";
import { userBalance } from "../../../store/actions/user/userActions";
import { formatToINR } from "../../../helpers";

const LoggedUserDetail = () => {
  const { userBalanceList } = useSelector(
    (state: RootState) => state.user.userList
  );
  const dispatch: AppDispatch = useDispatch();

  const handleAccordionSelect = (eventKey: any) => {
    if (eventKey !== null) {
      dispatch(userBalance());
    }
  };

  return (
    <div className="bg-secondary LoggedUserDetail">
      <Accordion onSelect={handleAccordionSelect}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <FaRegArrowAltCircleUp
              style={{ fontSize: "20px", color: "#fff" }}
            />
          </Accordion.Header>
          <Accordion.Body>
            <div className="text-white d-flex column">
              <Col lg={4}>
                <div className="LoggedUserDetail-card mb-2 row justify-content-between">
                  <div className="col-md-6 title-14">
                    Upper Level Credit Reference:
                  </div>
                  <div className="col-md-6 title-14">
                    {formatToINR(userBalanceList?.userCreditReference || 0)}
                  </div>
                </div>
                <div className="LoggedUserDetail-card mb-2 row justify-content-between">
                  <div className="col-md-6 title-14">Total Master Balance</div>
                  <div className="col-md-6 title-14">
                    {formatToINR(userBalanceList?.totalMasterBalance || 0)}
                  </div>
                </div>
                <div className="LoggedUserDetail-card mb-2 row justify-content-between">
                  <div className="col-md-6 title-14">Available Balance:</div>
                  <div className="col-md-6 title-14">
                    {formatToINR(userBalanceList?.availableBalance || 0)}
                  </div>
                </div>
              </Col>
              <Col lg={4}>
                <div className="LoggedUserDetail-card mb-2 row justify-content-between">
                  <div className="col-md-6 title-14">
                    Down level Occupy Balance:
                  </div>
                  <div className="col-md-6 title-14">
                    {formatToINR(userBalanceList?.downLevelOccupyBalance || 0)}
                  </div>
                </div>
                <div className="LoggedUserDetail-card mb-2 row justify-content-between">
                  <div className="col-md-6 title-14">Upper Level:</div>
                  <div className="col-md-6 title-14">
                    {formatToINR(userBalanceList?.upperLevelBalance || 0)}
                  </div>
                </div>
                <div className="LoggedUserDetail-card mb-2 row justify-content-between">
                  <div className="col-md-6 title-14">
                    Available Balance With Profit/Loss:
                  </div>
                  <div className="col-md-6 title-14">
                    {formatToINR(
                      userBalanceList?.availableBalanceWithProfitLoss || 0
                    )}
                  </div>
                </div>
              </Col>
              <Col lg={4}>
                <div className="LoggedUserDetail-card mb-2 row justify-content-between">
                  <div className="col-md-6 title-14">
                    Down Level Credit Reference:
                  </div>
                  <div className="col-md-6 title-14">
                    {formatToINR(
                      userBalanceList?.downLevelCreditReference || 0
                    )}
                  </div>
                </div>
                <div className="LoggedUserDetail-card mb-2 row justify-content-between">
                  <div className="col-md-6 title-14">
                    Down Level Profit/Loss :
                  </div>
                  <div className="col-md-6 title-14">
                    {formatToINR(userBalanceList?.downLevelProfitLoss || 0)}
                  </div>
                </div>
                <div className="LoggedUserDetail-card mb-2 row justify-content-between">
                  <div className="col-md-6 title-14">My Profit/Loss:</div>
                  <div className="col-md-6 title-14">
                    {formatToINR(userBalanceList?.profitLoss || 0)}
                  </div>
                </div>
              </Col>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default LoggedUserDetail;
