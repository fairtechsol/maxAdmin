import { Accordion, Col } from "react-bootstrap";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { formatToINR } from "../../../helpers";
import { userBalance } from "../../../store/actions/user/userActions";
import { AppDispatch, RootState } from "../../../store/store";
import "./style.scss";

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
            <div className="text-white d-flex column justify-content-between">
              <Col lg={4}>
                <div className="LoggedUserDetail-card mb-2 row justify-content-between">
                  <div className="col-md-6 title-14">
                    Upper Level Credit Reference:
                  </div>
                  <div className="col-md-6 title-14">
                    {formatToINR(
                      parseFloat(userBalanceList?.userCreditReference).toFixed(
                        2
                      ) || 0
                    )}
                  </div>
                </div>
                <div className="LoggedUserDetail-card mb-2 row justify-content-between">
                  <div className="col-md-6 title-14">Total Master Balance</div>
                  <div className="col-md-6 title-14">
                    {formatToINR(
                      parseFloat(userBalanceList?.totalMasterBalance).toFixed(
                        2
                      ) || 0
                    )}
                  </div>
                </div>
                <div className="LoggedUserDetail-card mb-2 row justify-content-between">
                  <div className="col-md-6 title-14">Available Balance:</div>
                  <div className="col-md-6 title-14">
                    {formatToINR(
                      parseFloat(userBalanceList?.availableBalance).toFixed(
                        2
                      ) || 0
                    )}
                  </div>
                </div>
              </Col>
              <Col lg={4}>
                <div className="LoggedUserDetail-card mb-2 row justify-content-between">
                  <div className="col-md-6 title-14">
                    Down level Occupy Balance:
                  </div>
                  <div className="col-md-6 title-14">
                    {formatToINR(
                      parseFloat(
                        userBalanceList?.downLevelOccupyBalance
                      ).toFixed(2) || 0
                    )}
                  </div>
                </div>
                <div className="LoggedUserDetail-card mb-2 row justify-content-between">
                  <div className="col-md-6 title-14">Upper Level:</div>
                  <div className="col-md-6 title-14">
                    {formatToINR(
                      parseFloat(userBalanceList?.upperLevelBalance).toFixed(
                        2
                      ) || 0
                    )}
                  </div>
                </div>
                <div className="LoggedUserDetail-card mb-2 row justify-content-between">
                  <div className="col-md-6 title-14">
                    Available Balance With Profit/Loss:
                  </div>
                  <div className="col-md-6 title-14">
                    {formatToINR(
                      parseFloat(
                        userBalanceList?.availableBalanceWithProfitLoss
                      ).toFixed(2) || 0
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
                      parseFloat(
                        userBalanceList?.downLevelCreditReference
                      ).toFixed(2) || 0
                    )}
                  </div>
                </div>
                <div className="LoggedUserDetail-card mb-2 row justify-content-between">
                  <div className="col-md-6 title-14">
                    Down Level Profit/Loss :
                  </div>
                  <div className="col-md-6 title-14">
                    {formatToINR(
                      parseFloat(userBalanceList?.downLevelProfitLoss).toFixed(
                        2
                      ) || 0
                    )}
                  </div>
                </div>
                <div className="LoggedUserDetail-card mb-2 row justify-content-between">
                  <div className="col-md-6 title-14">My Profit/Loss:</div>
                  <div className="col-md-6 title-14">
                    {formatToINR(
                      parseFloat(userBalanceList?.profitLoss).toFixed(2) || 0
                    )}
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
