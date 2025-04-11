import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Col, Modal, Row, Stack } from "react-bootstrap";
import { IoMdExit } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import Switch from "react-switch";
import {
  getUserMultiLoginList,
  lockUserMultiLogin,
  resetMultiLoginSucess,
} from "../../../store/actions/user/userActions";
import { AppDispatch, RootState } from "../../../store/store";
import CustomButton from "../../commonComponent/button";
import CustomInput from "../../commonComponent/input";
import Loader from "../../commonComponent/loader";

const initialValues: any = {
  id: "",
  userBlock: false,
  transactionPassword: "",
};

const ChangeStatus = ({ userData, setShow }: any) => {
  const defaultLockUnlockObj = {
    allBlocked: userData?.userBlock,
  };
  const [lockUnlockObj, setLockUnlockObj] = useState(defaultLockUnlockObj);
  const dispatch: AppDispatch = useDispatch();

  const { loading, success } = useSelector(
    (state: RootState) => state.user.multiLogin
  );

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values: any) => {
      let payload = {
        id: userData?.id,
        isBlock: lockUnlockObj.allBlocked,
        transactionPassword: values.transactionPassword,
      };
      dispatch(lockUserMultiLogin(payload));
    },
  });

  const { handleSubmit, values, handleChange } = formik;

  useEffect(() => {
    if (success) {
      setShow(false);
      dispatch(getUserMultiLoginList());
      dispatch(resetMultiLoginSucess());
    }
  }, [success]);

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
                  <Col sm={4}>
                    <p className="m-0 title-14">User Lock</p>
                  </Col>
                  <Col sm={6}>
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
                </div>
              </Col>
            </Row>
          </div>
          <div className="input-container mt-5">
            <Row>
              <Col sm={4}>
                <span>Transaction Code</span>
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
          <div className="d-flex gap-2">
            <CustomButton
              className="d-flex gap-2 align-items-center"
              type="submit"
              disabled={loading}
            >
              Submit
              <IoMdExit />
            </CustomButton>
          </div>
        </Modal.Footer>
      </form>
    </>
  );
};

export default ChangeStatus;
