import { Accordion, Col, Row } from "react-bootstrap";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import "./style.scss";
import { userBalance } from "../../../store/actions/user/userActions";

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
            <FaRegArrowAltCircleUp />
          </Accordion.Header>
          <Accordion.Body>
            <Row>
              <Col lg={4}>
                <div className="LoggedUserDetail-card mb-2 row justify-content-between">
                  <div className="col-md-8 title-14">
                    Upper Level Credit Reference:
                  </div>
                  <div className="col-md-4 title-14">
                    {+userBalanceList?.userCreditReference || 0}
                  </div>
                </div>
                <div className="LoggedUserDetail-card mb-2 row justify-content-between">
                  <div className="col-md-8 title-14">Total Master Balance</div>
                  <div className="col-md-4 title-14">
                    {+userBalanceList?.totalMasterBalance || 0}
                  </div>
                </div>
                <div className="LoggedUserDetail-card mb-2 row justify-content-between">
                  <div className="col-md-8 title-14">Available Balance:</div>
                  <div className="col-md-4 title-14">
                    {+userBalanceList?.availableBalance || 0}
                  </div>
                </div>
              </Col>
              <Col lg={4}>
                <div className="LoggedUserDetail-card mb-2 row justify-content-between">
                  <div className="col-md-8 title-14">
                    Down level Occupy Balance:
                  </div>
                  <div className="col-md-4 title-14">
                    {+userBalanceList?.downLevelOccupyBalance || 0}(
                    {+userBalanceList?.totalProfitLoss || 0})
                  </div>
                </div>
                <div className="LoggedUserDetail-card mb-2 row justify-content-between">
                  <div className="col-md-8 title-14">Upper Level:</div>
                  <div className="col-md-4 title-14">
                    {+userBalanceList?.upperLevelBalance}(
                    {+userBalanceList?.upperLevelProfitLossPercent || 0}%)(
                    {+userBalanceList?.totalProfitLoss || 0})
                  </div>
                </div>
                <div className="LoggedUserDetail-card mb-2 row justify-content-between">
                  <div className="col-md-8 title-14">
                    Available Balance With Profit/Loss:
                  </div>
                  <div className="col-md-4 title-14">
                    {+userBalanceList?.availableBalanceWithProfitLoss || 0}
                  </div>
                </div>
              </Col>
              <Col lg={4}>
                <div className="LoggedUserDetail-card mb-2 row justify-content-between">
                  <div className="col-md-8 title-14">
                    Down Level Credit Reference:
                  </div>
                  <div className="col-md-4 title-14">
                    {+userBalanceList?.downLevelCreditReference || 0}
                  </div>
                </div>
                <div className="LoggedUserDetail-card mb-2 row justify-content-between">
                  <div className="col-md-8 title-14">
                    Down Level Profit/Loss :
                  </div>
                  <div className="col-md-4 title-14">
                    {+userBalanceList?.downLevelProfitLoss || 0}
                  </div>
                </div>
                <div className="LoggedUserDetail-card mb-2 row justify-content-between">
                  <div className="col-md-8 title-14">My Profit/Loss:</div>
                  <div className="col-md-4 title-14">
                    {+userBalanceList?.profitLoss || 0}
                  </div>
                </div>
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default LoggedUserDetail;
