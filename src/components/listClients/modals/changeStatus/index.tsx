import { useFormik } from "formik";
import { useState } from "react";
import { Col, Modal, Row, Stack } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Switch from "react-switch";
import { setLockUnlockUser } from "../../../../store/actions/user/userActions";
import { AppDispatch } from "../../../../store/store";
import CustomInput from "../../../commonComponent/input";
import ModalFooter from "../footer";

const initialValues: any = {
  userId: "",
  betBlock: false,
  userBlock: false,
  transactionPassword: "",
};

const ChangeStatus = ({ setShow, userData }: any) => {
  // const [userChecked, setUserChecked] = useState(false);
  const defaultLockUnlockObj = {
    allBlocked: userData?.userBlock,
    betBlocked: userData?.betBlock,
  };
  // const [betChecked, setbetChecked] = useState(false);
  const [lockUnlockObj, setLockUnlockObj] = useState(defaultLockUnlockObj);
  const dispatch: AppDispatch = useDispatch();

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values: any) => {
      let payload = {
        userId: userData?.id,
        betBlock: lockUnlockObj.betBlocked,
        userBlock: lockUnlockObj.allBlocked,
        transactionPassword: values.transactionPassword,
      };
      dispatch(setLockUnlockUser(payload));
      setShow(false);
    },
  });

  const { handleSubmit, values, handleChange } = formik;

  return (
    <form onSubmit={handleSubmit}>
      <Stack className="listClientModals" gap={0}>
        <div className="input-container">
          <Row>
            <Col sm={12}>
              <div className="d-flex align-items-center justify-content-between">
                <h3 className="text-secondary title-20 fw-normal">
                  {userData?.userName}
                </h3>
                <h3
                  className={`${
                    !lockUnlockObj?.allBlocked ? "text-green" : "text-red"
                  } title-14`}
                >
                  {!lockUnlockObj?.allBlocked ? "Active" : "InActive"}
                </h3>
              </div>
              <div className="row">
                <Col sm={6} className="text-center">
                  <p className="m-0 mb-1 title-14">User Active</p>
                  <label>
                    <Switch
                      onChange={() => {
                        setLockUnlockObj((prev: any) => {
                          return {
                            ...prev,
                            allBlocked: !lockUnlockObj?.allBlocked,
                          };
                        });
                      }}
                      checked={!lockUnlockObj?.allBlocked}
                      uncheckedIcon={
                        <span
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                            fontSize: 12,
                            fontWeight: 600,
                          }}
                        >
                          OFF
                        </span>
                      }
                      checkedIcon={
                        <span
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                            fontSize: 12,
                            fontWeight: 600,
                            paddingRight: 2,
                          }}
                        >
                          ON
                        </span>
                      }
                      height={24}
                      width={60}
                    />
                  </label>
                </Col>

                <Col sm={6} className="text-center">
                  <p className="m-0 mb-1 title-14">Bet Active</p>
                  <label>
                    <Switch
                      onChange={() => {
                        setLockUnlockObj((prev: any) => {
                          return {
                            ...prev,
                            betBlocked: !lockUnlockObj?.betBlocked,
                          };
                        });
                      }}
                      checked={!lockUnlockObj?.betBlocked}
                      uncheckedIcon={
                        <span
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                            fontSize: 12,
                            fontWeight: 600,
                          }}
                        >
                          OFF
                        </span>
                      }
                      checkedIcon={
                        <span
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                            fontSize: 12,
                            fontWeight: 600,
                            paddingRight: 2,
                          }}
                        >
                          ON
                        </span>
                      }
                      height={24}
                      width={60}
                    />
                  </label>
                </Col>
              </div>
            </Col>
            <Col sm={8}></Col>
          </Row>
        </div>
        <div className="input-container mt-5">
          <Row>
            <Col sm={4}>
              <span>Transaction password</span>
            </Col>
            <Col sm={8}>
              <CustomInput
                type="password"
                name="transactionPassword"
                id="transactionPassword"
                customStyle="input-box"
                value={values.transactionPassword}
                onChange={handleChange}
              />
            </Col>
          </Row>
        </div>
      </Stack>
      <Modal.Footer className="border-0 mt-3">
        <ModalFooter
          clickHandler={() => {
            setShow(false);
          }}
        />
      </Modal.Footer>
    </form>
  );
};

export default ChangeStatus;
