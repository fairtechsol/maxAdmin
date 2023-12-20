import { Accordion, Col, Row } from "react-bootstrap";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import "./style.scss";

const LoggedUserDetail = () => {
  const { userDetail } = useSelector((state: RootState) => state.user.profile);
  console.log(userDetail, "userDetail");
  return (
    <div className="bg-secondary LoggedUserDetail">
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <FaRegArrowAltCircleUp />
          </Accordion.Header>
          <Accordion.Body>
            <Row>
              <Col lg={4}>
                <div className="LoggedUserDetail-card mb-2 row justify-content-between">
                  <div className="col-md-8 title-14">
                    Upper Level Credit Referance:
                  </div>
                  <div className="col-md-4 title-14">
                    {userDetail.currentBalance}
                  </div>
                </div>
                <div className="LoggedUserDetail-card mb-2 row justify-content-between">
                  <div className="col-md-8 title-14">Total Master Balance</div>
                  <div className="col-md-4 title-14">27044</div>
                </div>
                <div className="LoggedUserDetail-card mb-2 row justify-content-between">
                  <div className="col-md-8 title-14">Available Balance:</div>
                  <div className="col-md-4 title-14">
                    {userDetail.currentBalance}
                  </div>
                </div>
              </Col>
              <Col lg={4}>
                <div className="LoggedUserDetail-card mb-2 row justify-content-between">
                  <div className="col-md-8 title-14">
                    Down level Occupy Balance:
                  </div>
                  <div className="col-md-4 title-14">
                    {userDetail.downLevelBalance}
                  </div>
                </div>
                <div className="LoggedUserDetail-card mb-2 row justify-content-between">
                  <div className="col-md-8 title-14">Upper Level:</div>
                  <div className="col-md-4 title-14">27044</div>
                </div>
                <div className="LoggedUserDetail-card mb-2 row justify-content-between">
                  <div className="col-md-8 title-14">
                    Available Balance With Profit/Loss:
                  </div>
                  <div className="col-md-4 title-14">
                    {userDetail.profitLoss}
                  </div>
                </div>
              </Col>
              <Col lg={4}>
                <div className="LoggedUserDetail-card mb-2 row justify-content-between">
                  <div className="col-md-8 title-14">
                    Down Level Credit Referance:
                  </div>
                  <div className="col-md-4 title-14">
                    {userDetail.downLevelCreditRefrence}
                  </div>
                </div>
                <div className="LoggedUserDetail-card mb-2 row justify-content-between">
                  <div className="col-md-8 title-14">
                    Down Level Profit/Loss :
                  </div>
                  <div className="col-md-4 title-14">27044</div>
                </div>
                <div className="LoggedUserDetail-card mb-2 row justify-content-between">
                  <div className="col-md-8 title-14">My Profit/Loss:</div>
                  <div className="col-md-4 title-14">
                    {userDetail.myProfitLoss}
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
