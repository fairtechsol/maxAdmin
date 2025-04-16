import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Col, Modal, Row, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Switch from "react-switch";
import {
  accountListModalReset,
  getUsers,
  getUsersProfile,
  setLockUnlockUser,
} from "../../../../store/actions/user/userActions";
import { AppDispatch, RootState } from "../../../../store/store";
import CustomInput from "../../../commonComponent/input";
import Loader from "../../../commonComponent/loader";
import ModalFooter from "../footer";

const initialValues: any = {
  userId: "",
  betBlock: false,
  userBlock: false,
  transactionPassword: "",
};

const ChangeStatus = ({
  setShow,
  userData,
  userId,
  page,
  limit,
  userName,
  sort,
  order,
  activeTab,
}: any) => {
  // const [userChecked, setUserChecked] = useState(false);
  const defaultLockUnlockObj = {
    allBlocked: userData?.userBlock,
    betBlocked: userData?.betBlock,
  };
  // const [betChecked, setbetChecked] = useState(false);
  const [lockUnlockObj, setLockUnlockObj] = useState(defaultLockUnlockObj);
  const dispatch: AppDispatch = useDispatch();

  const { modalSuccess, loading } = useSelector(
    (state: RootState) => state.user.userList
  );
  const { userDetail } = useSelector((state: RootState) => state.user.profile);

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
      // setShow(false);
    },
  });

  const { handleSubmit, values, handleChange } = formik;

  useEffect(() => {
    if (modalSuccess) {
      setShow(false);
      dispatch(
        getUsers({
          userId: userId,
          page: page,
          limit: limit,
          userName: userName,
          sort: sort,
          order: order,
          activeTab: activeTab,
        })
      );
      dispatch(getUsersProfile());
      dispatch(accountListModalReset());
    }
  }, [modalSuccess]);

  return (
    <>
      {loading ? <Loader /> : null}
      <form onSubmit={handleSubmit}>
        <Stack className="listClientModals" gap={0}>
          <div className="input-container">
            <Row>
              <Col sm={12}>
                <div className="d-flex align-items-center justify-content-between">
                  <h3 className="text-secondary title-14 fw-normal">
                    {userData?.userName}
                  </h3>
                </div>
                <div className="row">
                  {(!userDetail?.permission ||
                    userDetail?.permission?.userLock) && (
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
                          onColor="#0088cc"
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
                  )}

                  {(!userDetail?.permission ||
                    userDetail?.permission?.betLock) && (
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
                          onColor="#0088cc"
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
                  )}
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
                  customstyle="input-box"
                  value={values.transactionPassword}
                  onChange={handleChange}
                  textAlign="left"
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
            disabled={loading}
          />
        </Modal.Footer>
      </form>
    </>
  );
};

export default ChangeStatus;
